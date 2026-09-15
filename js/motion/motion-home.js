(() => {
  const copy = {
    vi: { previewTitle:'Từ frame đến chuyển động.',previewCopy:'Những công cụ quan trọng xuất hiện cùng nhau trong một không gian làm việc.',previewLink:'Khám phá phần mềm →',sequenceTitle:'Một nhịp làm việc xuyên suốt.',sequenceCopy:'Capture → Animate → Review → Organize → Export.',capture:'Chụp',captureCopy:'Chụp frame và giữ phản hồi production ngay trong tầm mắt.',animateCopy:'Kiểm soát timing và spacing từng frame.',reviewCopy:'Xem lại chuyển động và continuity.',organize:'Tổ chức',organizeCopy:'Giữ shot, take và file nguồn rõ ràng.',exportCopy:'Chuẩn bị material hoàn thiện cho hậu kỳ.',workflowLink:'Xem toàn bộ workflow →' },
    en: { previewTitle:'From frames to motion.',previewCopy:'The essential tools come together in one workspace.',previewLink:'Explore the software →',sequenceTitle:'One continuous production rhythm.',sequenceCopy:'Capture → Animate → Review → Organize → Export.',capture:'Capture',captureCopy:'Capture frames with production feedback close at hand.',animateCopy:'Control timing and spacing frame by frame.',reviewCopy:'Review motion and continuity.',organize:'Organize',organizeCopy:'Keep shots, takes and source files clear.',exportCopy:'Prepare finished material for post-production.',workflowLink:'See the full workflow →' }
  };
  const labels = ['CAPTURE','ANIMATE','REVIEW','ORGANIZE','EXPORT'];
  function translate() {
    const lang = localStorage.getItem('daa-lang') === 'en' ? 'en' : 'vi';
    document.querySelectorAll('[data-motion-key]').forEach(el => { el.textContent = copy[lang][el.dataset.motionKey] || el.textContent; });
  }
  function init() {
    translate();
    document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => requestAnimationFrame(translate)));
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
    const setStep = i => { current.textContent = labels[i]; count.textContent = `${String(i+1).padStart(2,'0')} / 05`; steps.forEach((step, index) => step.classList.toggle('is-current', index === i)); };
    steps.forEach((step, i) => ScrollTrigger.create({ trigger: step, start: 'top 55%', end: 'bottom 55%', onEnter: () => setStep(i), onEnterBack: () => setStep(i) }));
    if (desktop) gsap.fromTo(current, { rotationX: 10, z: -65 }, { rotationX: 0, z: 35, ease: 'none', scrollTrigger: { trigger: '.sequence-chapter', start: 'top 70%', end: 'bottom 30%', scrub: true } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
