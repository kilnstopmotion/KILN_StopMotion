/* Shared scroll lifecycle; all page-specific animations opt in after the base site loads. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 981px) and (hover: hover) and (pointer: fine)');
  const context = { gsap: window.gsap, ScrollTrigger: window.ScrollTrigger, reduced, desktop, lenis: null, cleanup: [] };
  window.DAAMotion = context;
  if (!context.gsap || !context.ScrollTrigger || reduced.matches) return;
  context.gsap.registerPlugin(context.ScrollTrigger);

  /* The existing site uses native window scroll. Lenis only enhances desktop wheels. */
  let disposed = false;
  const initSmooth = () => {
    if (disposed || !desktop.matches || reduced.matches || !window.Lenis || context.lenis) return;
    try {
      context.lenis = new Lenis({ duration: 0.9, smoothWheel: true, syncTouch: false });
      const tick = time => context.lenis?.raf(time * 1000);
      context.gsap.ticker.add(tick);
      context.gsap.ticker.lagSmoothing(0);
      const update = () => context.ScrollTrigger.update();
      context.lenis.on('scroll', update);
      context.cleanup.push(() => { context.gsap.ticker.remove(tick); context.lenis?.off('scroll', update); context.lenis?.destroy(); context.lenis = null; });
    } catch (_) { context.lenis = null; }
  };
  if (desktop.matches) {
    if (window.Lenis) initSmooth();
    else {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js';
      script.onload = initSmooth;
      document.head.appendChild(script);
    }
  }
  const refresh = () => context.ScrollTrigger.refresh();
  window.addEventListener('load', refresh, { once: true });
  const onMediaChange = () => {
    if (reduced.matches || !desktop.matches) {
      context.cleanup.splice(0).forEach(fn => fn());
      if (reduced.matches) location.reload();
    }
  };
  reduced.addEventListener('change', onMediaChange);
  desktop.addEventListener('change', onMediaChange);
  window.addEventListener('pagehide', () => { disposed = true; context.cleanup.splice(0).forEach(fn => fn()); }, { once: true });
})();
