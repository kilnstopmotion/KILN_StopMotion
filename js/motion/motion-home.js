(() => {
  const copy = {
    vi: { previewTitle:'Từ frame đến chuyển động.',previewCopy:'Những công cụ quan trọng xuất hiện cùng nhau trong một không gian làm việc.',previewLink:'Khám phá phần mềm →',sequenceTitle:'Một nhịp làm việc xuyên suốt.',sequenceCopy:'Capture → Animate → Review → Organize → Export.',capture:'Chụp',captureCopy:'Chụp frame và giữ phản hồi production ngay trong tầm mắt.',animateCopy:'Kiểm soát timing và spacing từng frame.',reviewCopy:'Xem lại chuyển động và continuity.',organize:'Tổ chức',organizeCopy:'Giữ shot, take và file nguồn rõ ràng.',exportCopy:'Chuẩn bị material hoàn thiện cho hậu kỳ.',workflowLink:'Xem toàn bộ workflow →' },
    en: { previewTitle:'From frames to motion.',previewCopy:'The essential tools come together in one workspace.',previewLink:'Explore the software →',sequenceTitle:'One continuous production rhythm.',sequenceCopy:'Capture → Animate → Review → Organize → Export.',capture:'Capture',captureCopy:'Capture frames with production feedback close at hand.',animateCopy:'Control timing and spacing frame by frame.',reviewCopy:'Review motion and continuity.',organize:'Organize',organizeCopy:'Keep shots, takes and source files clear.',exportCopy:'Prepare finished material for post-production.',workflowLink:'See the full workflow →' }
  };

  const sequenceFrames = [
    { label:'CAPTURE', src:'assets/images/app/product-frame-4.webp', position:'center' },
    { label:'ANIMATE', src:'assets/images/app/hero-main.webp.webp', position:'center' },
    { label:'REVIEW', src:'assets/images/app/product-frame-1.webp', position:'center' },
    { label:'ORGANIZE', src:'assets/images/app/product-frame-3.webp', position:'center' },
    { label:'EXPORT', src:'assets/images/app/hero-main.webp.webp', position:'center top' }
  ];
  const labels = sequenceFrames.map(frame => frame.label);

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
      (visual.querySelector('.sequence-frame-window') || visual).prepend(media);
    }
    if (!media.children.length) {
      sequenceFrames.forEach((frame, i) => {
        const img = document.createElement('img');
        img.className = `sequence-shot${i === 0 ? ' is-current' : ''}`;
        img.src = frame.src;
        img.alt = '';
        img.decoding = 'async';
        img.loading = i < 2 ? 'eager' : 'lazy';
        img.style.objectPosition = frame.position;
        img.dataset.sequenceImage = String(i);
        media.appendChild(img);
      });
    }
    visual.classList.add('has-sequence-media');
    return Array.from(media.querySelectorAll('.sequence-shot'));
  }

  function mountFilmStrips(visual) {
    if (!visual) return [];
    const runs = Array.from(visual.querySelectorAll('.sequence-film-run'));
    runs.forEach(run => {
      if (run.children.length) return;
      [...sequenceFrames, ...sequenceFrames].forEach((frame, i) => {
        const cell = document.createElement('span');
        const frameIndex = i % sequenceFrames.length;
        cell.className = `sequence-film-cell${frameIndex === 0 ? ' is-current' : ''}`;
        cell.dataset.sequenceFilmIndex = String(frameIndex);
        cell.dataset.frame = `${String(frameIndex + 1).padStart(2,'0')} / ${frame.label}`;
        const img = document.createElement('img');
        img.src = frame.src;
        img.alt = '';
        img.decoding = 'async';
        img.loading = 'lazy';
        img.style.objectPosition = frame.position;
        cell.appendChild(img);
        run.appendChild(cell);
      });
    });
    return runs;
  }

  function init() {
    translate();
    document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => requestAnimationFrame(translate)));

    const sequenceVisual = document.querySelector('.sequence-visual');
    const sequenceChapter = document.querySelector('.sequence-chapter');
    const sequenceShots = mountSequenceMedia(sequenceVisual);
    const filmRuns = mountFilmStrips(sequenceVisual);

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
    const frameFlash = document.querySelector('.sequence-frame-flash');
    if (!steps.length || !current || !count) return;

    sequenceChapter?.classList.add('sequence-enhanced');
    let activeIndex = 0;
    if (sequenceShots.length) gsap.set(sequenceShots, { autoAlpha: i => i === 0 ? 1 : 0, scale: i => i === 0 ? 1 : 1.035 });

    const setStep = i => {
      if (i < 0 || i >= steps.length) return;
      current.textContent = labels[i];
      count.textContent = `${String(i + 1).padStart(2,'0')} / 05`;
      steps.forEach((step, index) => step.classList.toggle('is-current', index === i));
      document.querySelectorAll('.sequence-film-cell').forEach(cell => cell.classList.toggle('is-current', Number(cell.dataset.sequenceFilmIndex) === i));

      if (sequenceShots.length && activeIndex !== i) {
        const previous = sequenceShots[activeIndex];
        const next = sequenceShots[i];
        const fromRight = i > activeIndex;
        if (previous) {
          previous.classList.remove('is-current');
          gsap.to(previous, { autoAlpha: 0, scale: 1.03, duration: .34, ease: 'power2.out', overwrite: true });
        }
        if (next) gsap.fromTo(next,
          { autoAlpha: 0, scale: 1.05, clipPath: fromRight ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
          { autoAlpha: 1, scale: 1, clipPath: 'inset(0 0% 0 0%)', duration: .68, ease: 'power3.out', overwrite: true, onStart: () => next.classList.add('is-current') });
        if (frameFlash) gsap.fromTo(frameFlash,
          { xPercent: fromRight ? -105 : 105, opacity: .42 },
          { xPercent: fromRight ? 105 : -105, opacity: 0, duration: .62, ease: 'power2.out', overwrite: true });
        gsap.fromTo(Array.from(steps[i].children),
          { y: 34, opacity: .08, rotationX: desktop ? -12 : 0 },
          { y: 0, opacity: 1, rotationX: 0, duration: .58, stagger: .07, ease: 'power3.out', overwrite: true });
        activeIndex = i;
      }
    };

    if (desktop && sequenceChapter && filmRuns.length) {
      filmRuns.forEach((run, i) => {
        const halfWidth = () => run.scrollWidth / 2;
        gsap.fromTo(run,
          { x: i === 0 ? 0 : () => -halfWidth() },
          { x: i === 0 ? () => -halfWidth() : 0, ease: 'none', scrollTrigger: { trigger: sequenceChapter, start: 'top 85%', end: 'bottom 15%', scrub: .35, invalidateOnRefresh: true } });
      });
    }

    setStep(0);
    steps.forEach((step, i) => ScrollTrigger.create({
      trigger: step,
      start: 'top 58%',
      end: 'bottom 58%',
      onEnter: () => setStep(i),
      onEnterBack: () => setStep(i)
    }));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();

