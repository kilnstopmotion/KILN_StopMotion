# DA&A StopMotion Website

Official GitHub Pages site for **DA&A StopMotion**, developed by **KILN** (formerly KILN Motion).

## Pages
- `index.html` — homepage, latest release and version history
- `product.html` — product / workflow overview
- `developer.html` — KILN and developer page
- `styles.css` — shared visual system
- `app.js` — VI/EN language switch, release data and hidden Buy Me a Coffee flag

## Updating releases
Edit the `RELEASES` array in `app.js`.
Each entry supports version, date (`YYYY-MM-DD`), Installer URL, Portable URL, file sizes and bilingual release notes.

## Buy me a coffee
The section is already in the source but hidden. It is controlled by:

`SITE_CONFIG.coffeeEnabled = false`

Change it to `true` only when the section is ready to be public.

## Images / logo
Current logo, app screenshots and profile imagery are intentional placeholders so they can be replaced with official assets later.
