(() => {
  const names = ['CAPTURE','ANIMATE','REVIEW','ORGANIZE','EXPORT'];

  function init() {
    const motion = window.DAAMotion;
    if (!motion || motion.reduced.matches || !motion.gsap || !motion.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = motion;
    const desktop = motion.desktop.matches;
    const steps = gsap.utils.toArray('.product-motion-flow .product-step');
    const visual = document.querySelector('.product-visual-screen');
    const center = visual?.querySelector('.product-visual-center');
    const tag = visual?.querySelector('.product-frame-tag');

    if (visual && center && tag) {
      const setStep = i => {
        center.innerHTML = `DA&amp;A<br><em>${names[i]}</em>`;
        tag.textContent = `${String(i + 1).padStart(2,'0')} / 05 · FRAME BY FRAME`;
        steps.forEach((step, index) => step.classList.toggle('is-current', index === i));
      };

      steps.forEach((step, i) => ScrollTrigger.create({
        trigger: step,
        start: 'top 58%',
        end: 'bottom 58%',
        onEnter: () => setStep(i),
        onEnterBack: () => setStep(i)
      }));

      if (desktop) {
        gsap.fromTo(center,
          { rotationX: 12, z: -80 },
          { rotationX: 0, z: 45, ease: 'none', scrollTrigger: { trigger: '.product-motion-flow', start: 'top 60%', end: 'bottom 30%', scrub: true } }
        );
      }
    }

    // Animate chapter visuals, never the cards that the existing stagger/hover owns.
    gsap.utils.toArray('.product-info-section .section-head h2').forEach(title => gsap.fromTo(title,
      { y: 40, opacity: .6, rotationX: desktop ? 9 : 0 },
      { y: 0, opacity: 1, rotationX: 0, ease: 'none', scrollTrigger: { trigger: title, start: 'top 94%', end: 'top 50%', scrub: true } }
    ));

    const guide = document.querySelector('.guide-scene');
    if (guide && desktop) {
      const path = guide.querySelector('.guide-path path');
      const circles = guide.querySelectorAll('.guide-path circle');
      const length = path.getTotalLength();

      gsap.fromTo(path,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: guide, start: 'top 84%', end: 'bottom 28%', scrub: true } }
      );
      gsap.fromTo(circles,
        { scale: .4, opacity: .25, transformOrigin: 'center center' },
        { scale: 1, opacity: 1, stagger: .12, ease: 'none', scrollTrigger: { trigger: guide, start: 'top 82%', end: 'bottom 32%', scrub: true } }
      );
      gsap.fromTo(guide.querySelector('.guide-path'),
        { rotationX: 9, z: -75 },
        { rotationX: 0, z: 0, ease: 'none', scrollTrigger: { trigger: guide, start: 'top 85%', end: 'bottom 25%', scrub: true } }
      );
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();