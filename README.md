# DAAD StopMotion Website

Official GitHub Pages site for **DAAD StopMotion**, developed by **KILN** (formerly KILN Motion).

## Pages
- `index.html` — homepage
- `download.html` — dedicated DAAD StopMotion download page
- `product.html` — product / workflow overview
- `developer.html` — KILN and developer page
- `styles.css` — shared visual system
- `app.js` — VI/EN language switch, release data and hidden Buy Me a Coffee flag
- `motion.css`, `js/motion/` — optional cinematic scroll layer for the homepage, product and developer pages

## Scroll motion
`showcase.js` owns the short, automatic homepage entrance: blue gradient ribbons gather into the app icon, which settles into the left hero column before the text reveals. It uses native Web Animations and never pins or intercepts scrolling. Scrolling, navigation, keyboard focus, resize, reduced motion, and direct anchors reveal the final layout immediately. `motion-home.js` owns the software preview and five-step sequence below it; `motion-product.js` owns the workflow stage and SVG Motion Guide; `motion-dev.js` owns the lightweight developer depth. `motion-core.js` registers ScrollTrigger and loads Lenis asynchronously only for desktop fine-pointer devices. All motion is skipped under `prefers-reduced-motion: reduce`, on missing animation libraries, or when optional Lenis cannot load; native scrolling and page content remain available.

For local review, serve the repository root with an HTTP server and check all three pages at desktop and mobile sizes, the VI/EN switch, keyboard links and carousel, `download.html`, legacy `index.html#download`, back navigation and reduced motion. The site already obtains GSAP from jsDelivr; the optional Lenis runtime uses version 1.3.17 from the same CDN.

## Updating releases
Edit the `RELEASES` array in `app.js`.
Each entry supports version, date (`YYYY-MM-DD`), Installer URL, Portable URL, file sizes and bilingual release notes.

## Buy me a coffee
The section is already in the source but hidden. It is controlled by:

`SITE_CONFIG.coffeeEnabled = false`

Change it to `true` only when the section is ready to be public.

## Images / logo
Current logo, app screenshots and profile imagery are intentional placeholders so they can be replaced with official assets later.

## Deployment
GitHub Pages deploys from the `main` branch at the repository root.

### Download background video

The dedicated download.html page shows the product name, one download action and the Windows/version line. Release data comes from RELEASES in app.js; the HTML also includes a working fallback link for visitors without JavaScript. Keep that fallback link and version in sync when updating a release.

Until a clip is supplied, the background uses the existing product-frame-4.webp screenshot. To replace it, upload a compressed MP4 (H.264) or WebM under assets/videos/ and set data-video-src on .download-film in download.html to its relative URL (for example assets/videos/download-loop.mp4). Leave it empty to avoid any video requests. Adjust object-position in download.css to suit the clip.

The clip loops silently with a play/pause control, pauses in a background tab, and retains the image if media fails. Reduced-motion visitors see the still image until they choose to play. The final uploaded clip still needs visual and playback verification. All Download links lead to download.html; the old index.html#download address redirects there too.
