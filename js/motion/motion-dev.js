(() => {
  function init() {
    const motion = window.DAAMotion;
    if (!motion || motion.reduced.matches || !motion.gsap || !motion.ScrollTrigger) return;
    const { gsap } = motion;
    const desktop = motion.desktop.matches;
    const title = document.querySelector('.developer-hero .editorial-title');
    if (title) gsap.fromTo(title, { rotationX: desktop ? 8 : 0, letterSpacing: '.025em' },
      { rotationX: 0, letterSpacing: '-.055em', ease: 'none', scrollTrigger: { trigger: '.developer-hero', start: 'top 30%', end: 'bottom 22%', scrub: true } });
    const kiln = document.querySelector('.developer-hero + .section h2');
    if (kiln) gsap.fromTo(kiln, { letterSpacing: '.36em', opacity: .55 },
      { letterSpacing: '-.045em', opacity: 1, ease: 'none', scrollTrigger: { trigger: kiln, start: 'top 92%', end: 'top 42%', scrub: true } });
    const card = document.querySelector('.developer-card');
    if (card && desktop) gsap.fromTo(card, { rotationY: -4, z: -30 },
      { rotationY: 0, z: 0, ease: 'none', scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 35%', scrub: true } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
