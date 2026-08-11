const ACCENT = '#a8475a';

export function initCursor() {
  if (window.__mhCursorInit) return;
  if (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.__mhCursorInit = true;

  const style = document.createElement('style');
  style.textContent = '*{cursor:none!important}';
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.innerHTML =
    '<div id="mh-cursor-ring" style="position:fixed;top:0;left:0;width:36px;height:36px;border-radius:50%;border:1.5px solid ' + ACCENT + ';pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .25s cubic-bezier(.16,1,.3,1),height .25s cubic-bezier(.16,1,.3,1),opacity .25s ease,background .25s ease;opacity:0;display:flex;align-items:center;justify-content:center;background:transparent;">' +
      '<span id="mh-cursor-text" style="font-family:Manrope,sans-serif;font-size:11px;font-weight:600;color:' + ACCENT + ';white-space:nowrap;opacity:0;transition:opacity .18s ease;letter-spacing:.02em;"></span>' +
    '</div>' +
    '<div id="mh-cursor-dot" style="position:fixed;top:0;left:0;width:6px;height:6px;border-radius:50%;background:' + ACCENT + ';pointer-events:none;z-index:99999;transform:translate(-50%,-50%);opacity:0;transition:opacity .25s ease;"></div>';
  document.body.appendChild(wrap);

  const ring = wrap.querySelector('#mh-cursor-ring');
  const dot = wrap.querySelector('#mh-cursor-dot');
  const textEl = wrap.querySelector('#mh-cursor-text');

  let mx = -100, my = -100, rx = -100, ry = -100, shown = false;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    if (!shown) { shown = true; ring.style.opacity = '1'; dot.style.opacity = '1'; }
  }, { passive: true });
  document.addEventListener('mouseleave', () => { ring.style.opacity = '0'; dot.style.opacity = '0'; });
  document.addEventListener('mousedown', () => { ring.style.transform = 'translate(-50%,-50%) scale(0.85)'; });
  document.addEventListener('mouseup', () => { ring.style.transform = 'translate(-50%,-50%) scale(1)'; });

  (function raf() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(raf);
  })();

  function setHover(on, label) {
    ring.style.width = on ? '60px' : '36px';
    ring.style.height = on ? '60px' : '36px';
    ring.style.background = on ? ACCENT + '14' : 'transparent';
    textEl.style.opacity = on && label ? '1' : '0';
    textEl.textContent = label || '';
    dot.style.opacity = on && label ? '0' : (shown ? '1' : '0');
  }

  document.addEventListener('mouseover', (e) => {
    const labeled = e.target.closest && e.target.closest('[data-cursor]');
    const interactive = e.target.closest && e.target.closest('a, button, .mh-btn, [role="button"], input, textarea');
    if (labeled) setHover(true, labeled.getAttribute('data-cursor'));
    else if (interactive) setHover(true, '');
  });
  document.addEventListener('mouseout', (e) => {
    const stillOver = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-cursor], a, button, .mh-btn, [role="button"], input, textarea');
    if (!stillOver) setHover(false, '');
  });

  let magnetEl = null;
  document.addEventListener('mouseover', (e) => {
    magnetEl = e.target.closest && e.target.closest('button.mh-btn');
    if (magnetEl) magnetEl.style.transition = (magnetEl.style.transition ? magnetEl.style.transition + ',' : '') + 'transform .2s cubic-bezier(.16,1,.3,1)';
  });
  document.addEventListener('mousemove', (e) => {
    if (!magnetEl) return;
    const r = magnetEl.getBoundingClientRect();
    magnetEl.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * 0.15 + 'px,' + (e.clientY - r.top - r.height / 2) * 0.3 + 'px)';
  });
  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest && e.target.closest('button.mh-btn');
    if (el) { el.style.transform = ''; if (el === magnetEl) magnetEl = null; }
  });
}
