# Original tile images

The full-resolution originals of every tile that `scripts/optimise-images.py`
re-encoded, kept verbatim so the optimisation is reversible and so there is a
high-resolution source to work from if a tile is ever redesigned.

Nothing here is served by the site — only `public/images/` ships. These files
cost repository size, not page weight.

To restore one, copy it back into `public/images/` and point the project's
`image` field in `src/data/projects.json` at the original filename.

To re-run the optimisation from these originals after changing the quality or
width settings, copy them back first — the script reads from `public/images/`.

See `scripts/optimise-images.py` for what it does and why each image ended up
as JPEG or as a quantised PNG.
