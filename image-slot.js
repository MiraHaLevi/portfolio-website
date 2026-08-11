// Standalone replacement for the editor's <image-slot> element.
// On the published site there is no upload host — each slot simply renders the
// image that was exported to assets/img/, keyed by the slot's id.
(function () {
  var MAP = window.__SITE_IMAGES || {};

  function ratio(shape, el) {
    if (shape === 'circle') return '50%';
    if (shape === 'pill') return '999px';
    var r = el.getAttribute('radius');
    return r ? (isNaN(r) ? r : r + 'px') : '0';
  }

  var ImageSlot = function () {};
  ImageSlot = class extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      this.render();
    }
    static get observedAttributes() { return ['id', 'fit', 'shape', 'placeholder']; }
    attributeChangedCallback() { if (this._built) this.render(); }
    render() {
      var src = MAP[this.id];
      var fit = this.getAttribute('fit') || 'cover';
      var radius = ratio(this.getAttribute('shape'), this);
      if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
      if (!src) {
        this.shadowRoot.innerHTML =
          '<style>:host{display:block}div{width:100%;height:100%}</style><div></div>';
        return;
      }
      this.shadowRoot.innerHTML =
        '<style>' +
        ':host{display:block;overflow:hidden}' +
        'img{display:block;width:100%;height:100%;border-radius:' + radius + ';' +
        'object-fit:' + (fit === 'contain' ? 'contain' : 'cover') + '}' +
        '</style>' +
        '<img alt="' + (this.getAttribute('placeholder') || '').replace(/"/g, '&quot;') + '" src="' + src + '">';
      this.setAttribute('data-filled', '');
    }
  };

  if (!customElements.get('image-slot')) customElements.define('image-slot', ImageSlot);
})();
