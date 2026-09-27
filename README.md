# DA&D StopMotion Website

Official GitHub Pages site for **DA&D StopMotion**, developed by **KILN** (formerly KILN Motion).

## Pages
- `index.html` — homepage, latest release and version history
- `product.html` — product / workflow overview
- `developer.html` — KILN and developer page
- `styles.css` — shared visual system
- `app.js` — VI/EN language switch, release data and hidden Buy Me a Coffee flag
- `motion.css`, `js/motion/` — optional cinematic scroll layer for the homepage, product and developer pages

## Scroll motion
`showcase.js` owns the short, automatic homepage entrance: blue gradient ribbons gather into the app icon, which settles into the left hero column before the text reveals. It uses native Web Animations and never pins or intercepts scrolling. Scrolling, navigation, keyboard focus, resize, reduced motion, and direct anchors reveal the final layout immediately. `motion-home.js` owns the software preview and five-step sequence below it; `motion-product.js` owns the workflow stage and SVG Motion Guide; `motion-dev.js` owns the lightweight developer depth. `motion-core.js` registers ScrollTrigger and loads Lenis asynchronously only for desktop fine-pointer devices. All motion is skipped under `prefers-reduced-motion: reduce`, on missing animation libraries, or when optional Lenis cannot load; native scrolling and page content remain available.

For local review, serve the repository root with an HTTP server and check all three pages at desktop and mobile sizes, the VI/EN switch, keyboard links and carousel, `#download`, back navigation and reduced motion. The site already obtains GSAP from jsDelivr; the optional Lenis runtime uses version 1.3.17 from the same CDN.

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

### Download preview video

The homepage download panel keeps release information, the download action, and a media frame together. The archive expands below. Until a clip is supplied, the frame displays an existing app screenshot labeled as a preview image.

To add a clip, upload a compressed MP4 (H.264) or WebM under assets/videos/ and set data-video-src on .download-video in index.html to its relative URL, for example assets/videos/download-loop.mp4. Leave it empty to keep the poster without requesting a video. Aim for a short, muted loop under 3 MB. Desktop uses a 4:3 crop and mobile a 2.2:1 crop; keep the subject near the center or adjust object-position in download-experience.css.

The video loads on entering view, loops silently, pauses offscreen or in a background tab, and offers a play/pause button. Reduced-motion visitors see the poster until they choose play. Media failure retains the poster and download link. Check the final clip after it is supplied.
