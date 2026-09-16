(() => {
  const copy = {
    vi: { previewTitle:'Từ frame đến chuyển động.',previewCopy:'Những công cụ quan trọng xuất hiện cùng nhau trong một không gian làm việc.',previewLink:'Khám phá phần mềm →',sequenceTitle:'Một nhịp làm việc xuyên suốt.',sequenceCopy:'Capture → Animate → Review → Organize → Export.',capture:'Chụp',captureCopy:'Chụp frame và giữ phản hồi production ngay trong tầm mắt.',animateCopy:'Kiểm soát timing và spacing từng frame.',reviewCopy:'Xem lại chuyển động và continuity.',organize:'Tổ chức',organizeCopy:'Giữ shot, take và file nguồn rõ ràng.',exportCopy:'Chuẩn bị material hoàn thiện cho hậu kỳ.',workflowLink:'Xem toàn bộ workflow →' },
    en: { previewTitle:'From frames to motion.',previewCopy:'The essential tools come together in one workspace.',previewLink:'Explore the software →',sequenceTitle:'One continuous production rhythm.',sequenceCopy:'Capture → Animate → Review → Organize → Export.',capture:'Capture',captureCopy:'Capture frames with production feedback close at hand.',animateCopy:'Control timing and spacing frame by frame.',reviewCopy:'Review motion and continuity.',organize:'Organize',organizeCopy:'Keep shots, takes and source files clear.',exportCopy:'Prepare finished material for post-production.',workflowLink:'See the full workflow →' }
  };

  const labels = ['CAPTURE','ANIMATE','REVIEW','ORGANIZE','EXPORT'];
  const sequenceImages = [
    'assets/images/app/product-frame-1.webp',
    'assets/images/app/product-frame-2.webp',
    'assets/images/app/product-frame-3.webp',
    'assets/images/app/product-frame-4.webp',
    'assets/images/app/hero-main.webp.webp'
  ];

  function translate() {
    const lang = localStorage.getItem('daa-lang') === 'en' ? 'en' : 'vi';
    document.querySelectorAll('[data-motion-key]').forEach(el => { el.textContent = copy[lang][el.dataset.motionKey] || el.textContent; });
  }

  function mountSequenceMedia(visual) {
    if (!visual) return [];
    let media = visual.querySelector('.sequence-media');
    if (!media) {
      media = document.createElement('div');
      media.className = 'sequence-media';
      sequenceImages.forEach((src, i) => {
        const img = document.createElement('img');
        img.className = `sequence-shot${i === 0 ? ' is-current' : ''}`;
        img.src = src;
        img.alt = '';
        img.decoding = 'async';
        img.loading = i < 2 ? 'eager' : 'lazy';
        img.dataset.sequenceImage = String(i);
        media.appendChild(img);
      });
      visual.prepend(media);
    }
    visual.classList.add('has-sequence-media');
    return Array.from(media.querySelectorAll('.sequence-shot'));
  }

  function init() {
    translate();
    document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => requestAnimationFrame(translate)));

    const sequenceVisual = document.querySelector('.sequence-visual');
    const sequenceChapter = document.querySelector('.sequence-chapter');
    const sequenceShots = mountSequenceMedia(sequenceVisual);

    const motion = window.DAAMotion;
    if (!motion || motion.reduced.matches || !motion.gsap || !motion.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = motion;
    const desktop = motion.desktop.matches;

    const panels = gsap.utils.toArray('.preview-panel');
    panels.forEach((panel, i) => {
      const image = panel.querySelector('img');
      gsap.fromTo(panel, { rotationX: desktop ? 12 : 0, rotationY: desktop ? (i % 2 ? 8 : -8) : 0, y: desktop ? 95 : 24, opacity: .64, scale: .94 },
        { rotationX: 0, rotationY: 0, y: 0, opacity: 1, scale: 1, ease: 'none', scrollTrigger: { trigger: panel, start: 'top 95%', end: 'top 35%', scrub: true } });
      if (desktop) gsap.fromTo(image, { scale: 1.08 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: panel, start: 'top 95%', end: 'bottom 15%', scrub: true } });
    });

    gsap.utils.toArray('.cinema-title').forEach(el => gsap.fromTo(el,
      { y: 45, rotationX: desktop ? 10 : 0, opacity: .45, letterSpacing: '.01em' },
      { y: 0, rotationX: 0, opacity: 1, letterSpacing: '-.055em', ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 38%', scrub: true } }));

    const steps = gsap.utils.toArray('.sequence-steps li');
    const current = document.querySelector('.sequence-current');
    const count = document.querySelector('.sequence-count');
    if (!steps.length || !current || !count) return;

    sequenceChapter?.classList.add('sequence-enhanced');
    let activeIndex = 0;
    if (sequenceShots.length) gsap.set(sequenceShots, { autoAlpha: i => i === 0 ? 1 : 0, scale: i => i === 0 ? 1 : 1.035 });

    const setStep = i => {
      if (i < 0 || i >= steps.length) return;
      current.textContent = labels[i];
      count.textContent = `${String(i + 1).padStart(2,'0')} / 05`;
      steps.forEach((step, index) => step.classList.toggle('is-current', index === i));

      if (sequenceShots.length && activeIndex !== i) {
        const previous = sequenceShots[activeIndex];
        const next = sequenceShots[i];
        if (previous) gsap.to(previous, { autoAlpha: 0, scale: 1.025, duration: .34, ease: 'power2.out', overwrite: true });
        if (next) gsap.fromTo(next,
          { autoAlpha: 0, scale: 1.045 },
          { autoAlpha: 1, scale: 1, duration: .58, ease: 'power3.out', overwrite: true });
        activeIndex = i;
      }
    };

    setStep(0);
    steps.forEach((step, i) => ScrollTrigger.create({
      trigger: step,
      start: 'top 58%',
      end: 'bottom 58%',
      onEnter: () => setStep(i),
      onEnterBack: () => setStep(i)
    }));

    if (desktop && sequenceVisual) {
      gsap.fromTo(sequenceVisual,
        { y: 18 },
        { y: -18, ease: 'none', scrollTrigger: { trigger: '.sequence-chapter', start: 'top 72%', end: 'bottom 28%', scrub: true } });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
