# Mira Halevi — Portfolio

Static site. No build step, no dependencies to install.

## Publish on GitHub Pages

1. Create a repository.
2. Upload the **contents of this folder** — `index.html`, the `.dc.html` pages, `assets/`, `ds/`, `images.js`, `image-slot.js`, `support.js`, `cursor.js`. Not the folder itself: `index.html` must sit at the repository root.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)` → Save.
4. Live at `https://<username>.github.io/<repo>/` after a minute or two.

If you prefer to keep the site in a subfolder, upload this whole folder as `docs/` and set the Pages folder to `/docs` in step 3.

## Troubleshooting

**Blank page showing only a heading** — GitHub is rendering `README.md` because it could not find `index.html` at the level Pages is pointed at. Either move `index.html` to the repository root, or switch the Pages folder to `/docs`.

**Text appears but unstyled** — the `ds/` folder did not upload. Re-upload it; it holds the stylesheets.

**Images missing** — check that `assets/img/` uploaded with all its files.

## Files

- `index.html` — home page (entry point)
- `*.dc.html` — Work, About, Contact, and one page per project
- `assets/img/` — project photography
- `assets/logo/` — the mira logomark
- `images.js` + `image-slot.js` — map image slots to the exported files
- `ds/` — design system tokens and stylesheets
- `support.js`, `cursor.js` — page runtime

## Replacing an image

Overwrite the file in `assets/img/` keeping the same filename, or point `images.js` at a different path.

## Note

The site loads React from unpkg.com, so visitors need an internet connection. Uploading and editing images are editor-only features and are not part of this export.
