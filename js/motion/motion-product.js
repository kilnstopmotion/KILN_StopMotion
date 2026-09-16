(() => {
  const names = ['CAPTURE','ANIMATE','REVIEW','ORGANIZE','EXPORT'];

  // Featured-work content. Add media URLs here later without changing the section structure.
  const featuredWork = {
    title: 'Lạc',
    format: 'Stop-motion',
    year: '',
    duration: '',
    stillSrc: '',
    loopVideoSrc: '',
    fullWorkUrl: ''
  };

  const featuredCopy = {
    vi: {
      nav: 'Tác phẩm tiêu biểu',
      kicker: 'FEATURED / WORK',
      title: 'Tác phẩm tiêu biểu',
      lead: 'Một không gian dành cho những tác phẩm được chọn lọc, kèm still frame, đoạn loop ngắn và thông tin tác phẩm.',
      workLabel: 'TÁC PHẨM / 001',
      info: 'Thông tin tác phẩm',
      name: 'Tên tác phẩm',
      format: 'Định dạng',
      year: 'Năm',
      duration: 'Thời lượng',
      pending: 'Sẽ cập nhật',
      description: 'Phần giới thiệu chi tiết về Lạc sẽ được bổ sung sau.',
      still: 'STILL / 01',
      stillPlaceholder: 'Still frame sẽ được bổ sung',
      loop: 'LOOP / EXCERPT',
      videoPlaceholder: 'Video loop sẽ được bổ sung',
      fullEyebrow: 'FULL WORK',
      fullTitle: 'Xem full tác phẩm',
      fullCopy: 'Liên kết xem bản đầy đủ sẽ được bổ sung khi tác phẩm sẵn sàng.',
      comingSoon: 'COMING SOON'
    },
    en: {
      nav: 'Featured work',
      kicker: 'FEATURED / WORK',
      title: 'Featured work',
      lead: 'A curated space for selected work, with still frames, a short loop excerpt, and production information.',
      workLabel: 'WORK / 001',
      info: 'Work information',
      name: 'Title',
      format: 'Format',
      year: 'Year',
      duration: 'Duration',
      pending: 'To be updated',
      description: 'A full introduction to Lạc will be added later.',
      still: 'STILL / 01',
      stillPlaceholder: 'Still frame coming soon',
      loop: 'LOOP / EXCERPT',
      videoPlaceholder: 'Loop video coming soon',
      fullEyebrow: 'FULL WORK',
      fullTitle: 'Watch full work',
      fullCopy: 'The full-work link will be added when the piece is ready.',
      comingSoon: 'COMING SOON'
    }
  };

  function getLang() {
    return localStorage.getItem('daa-lang') === 'en' ? 'en' : 'vi';
  }

  function injectFeaturedWorkStyles() {
    if (document.getElementById('featured-work-styles')) return;
    const style = document.createElement('style');
    style.id = 'featured-work-styles';
    style.textContent = `
      .featured-work-section{background:linear-gradient(180deg,#0a0c18,#111634 56%,#090b18);color:var(--motion-white);overflow:hidden}
      .featured-work-section .section-kicker{color:#ff7b8d}
      .featured-work-section .section-head{align-items:start;margin-bottom:54px}
      .featured-work-section .section-head h2{color:#fff}
      .featured-work-section .section-copy{color:#c5cade}
      .featured-work-shell{display:grid;gap:28px}
      .featured-work-hero{display:grid;grid-template-columns:minmax(0,1.22fr) minmax(320px,.78fr);gap:24px;align-items:stretch}
      .featured-work-media{position:relative;min-height:520px;overflow:hidden;border:1px solid #3b4267;background:radial-gradient(circle at 48% 42%,#283067,#090b1b 72%);box-shadow:0 30px 70px rgba(0,0,0,.32)}
      .featured-work-media img,.featured-work-media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
      .featured-work-media video{background:#050608}
      .featured-work-media::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(5,6,8,.04),rgba(5,6,8,.14) 55%,rgba(5,6,8,.72));z-index:2}
      .featured-work-placeholder{position:absolute;inset:0;display:grid;place-items:center;padding:32px;text-align:center;color:#aeb6d6;font:800 11px var(--mono);letter-spacing:.14em;text-transform:uppercase}
      .featured-work-frame-label{position:absolute;z-index:3;left:18px;top:16px;padding:7px 9px;border:1px solid rgba(255,255,255,.14);background:rgba(5,6,8,.58);backdrop-filter:blur(10px);color:#ff8796;font:800 9px var(--mono);letter-spacing:.14em}
      .featured-work-name{position:absolute;z-index:3;left:22px;right:22px;bottom:20px;color:#fff;font:700 clamp(52px,7vw,108px)/.82 var(--serif);letter-spacing:-.055em;text-shadow:0 8px 34px rgba(0,0,0,.55)}
      .featured-work-info{border:1px solid #343a60;background:rgba(12,15,34,.76);padding:clamp(26px,3vw,42px);display:flex;flex-direction:column;justify-content:space-between;gap:34px}
      .featured-work-info h3{margin:10px 0 0;color:#fff;font:700 clamp(32px,3.5vw,52px)/1 var(--serif)}
      .featured-work-info>p{margin:0;color:#bac1da;font-size:16px}
      .featured-work-meta{margin:0;padding:0;list-style:none;border-top:1px solid rgba(233,237,255,.18)}
      .featured-work-meta li{display:grid;grid-template-columns:minmax(110px,.75fr) minmax(0,1.25fr);gap:20px;padding:14px 0;border-bottom:1px solid rgba(233,237,255,.14)}
      .featured-work-meta span{color:#8e98bd;font:800 9px var(--mono);letter-spacing:.12em;text-transform:uppercase}
      .featured-work-meta strong{color:#f3f4fa;font-size:14px;font-weight:650}
      .featured-work-gallery{display:grid;grid-template-columns:1fr 1fr;gap:24px}
      .featured-work-shot{position:relative;min-height:360px;overflow:hidden;border:1px solid #343a60;background:#090b19}
      .featured-work-shot img,.featured-work-shot video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
      .featured-work-shot video{background:#050608}
      .featured-work-shot::after{content:"";position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.04)}
      .featured-work-shot .featured-work-placeholder{background:radial-gradient(circle at 50% 45%,rgba(31,34,81,.85),#080a16 72%)}
      .featured-work-full{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:28px;align-items:end;padding:clamp(30px,5vw,64px);border:1px solid #474e78;background:linear-gradient(115deg,#171d45,#0b0e22 62%,#070914);overflow:hidden;min-height:230px}
      .featured-work-full::before{content:"";position:absolute;width:340px;aspect-ratio:1;border:1px solid rgba(212,34,56,.36);border-radius:50%;right:-90px;top:-140px;box-shadow:0 0 0 48px rgba(212,34,56,.025),0 0 0 96px rgba(212,34,56,.014)}
      .featured-work-full-copy{position:relative;z-index:1;max-width:760px}
      .featured-work-full-copy span{color:#ff7b8d;font:800 10px var(--mono);letter-spacing:.16em}
      .featured-work-full h3{margin:12px 0 10px;color:#fff;font:700 clamp(42px,5vw,72px)/.95 var(--serif);letter-spacing:-.045em}
      .featured-work-full p{margin:0;color:#bfc6dd;max-width:620px}
      .featured-work-full-action{position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;min-width:170px;min-height:52px;padding:14px 18px;border:1px solid rgba(255,255,255,.32);color:#d7dbea;font:800 10px var(--mono);letter-spacing:.12em;white-space:nowrap}
      .featured-work-full[href]{background:var(--motion-red);border-color:var(--motion-red);color:#fff;transition:transform .22s var(--ease),box-shadow .22s var(--ease)}
      .featured-work-full[href]:hover .featured-work-full-action{transform:translateX(3px)}
      @media(max-width:980px){.featured-work-hero{grid-template-columns:1fr}.featured-work-media{min-height:500px}.featured-work-gallery{grid-template-columns:1fr 1fr}.featured-work-full{grid-template-columns:1fr}}
      @media(max-width:720px){.featured-work-section .section-head{margin-bottom:34px}.featured-work-media{min-height:420px}.featured-work-gallery{grid-template-columns:1fr}.featured-work-shot{min-height:300px}.featured-work-full{min-height:0}.featured-work-meta li{grid-template-columns:1fr;gap:6px}}
      @media(prefers-reduced-motion:reduce){.featured-work-shot video{display:none}}
    `;
    document.head.appendChild(style);
  }

  function makeMedia(type, src, label, placeholder, reduced) {
    const wrap = document.createElement('div');
    wrap.className = 'featured-work-shot';

    const frameLabel = document.createElement('span');
    frameLabel.className = 'featured-work-frame-label';
    frameLabel.textContent = label;
    wrap.appendChild(frameLabel);

    if (src) {
      if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.autoplay = !reduced;
        if (reduced) video.controls = true;
        wrap.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${featuredWork.title} — still`;
        img.loading = 'lazy';
        img.decoding = 'async';
        wrap.appendChild(img);
      }
    } else {
      const empty = document.createElement('div');
      empty.className = 'featured-work-placeholder';
      empty.textContent = placeholder;
      wrap.appendChild(empty);
    }
    return wrap;
  }

  function mountFeaturedWork() {
    if (document.getElementById('featured-work')) return document.getElementById('featured-work');

    injectFeaturedWorkStyles();
    const workflow = document.getElementById('workflow');
    const subnav = document.querySelector('.product-subnav');
    if (!workflow || !subnav) return null;

    const lang = getLang();
    const t = featuredCopy[lang];

    if (!subnav.querySelector('a[href="#featured-work"]')) {
      const link = document.createElement('a');
      link.href = '#featured-work';
      link.dataset.featuredWorkNav = '';
      link.textContent = t.nav;
      const workflowLink = subnav.querySelector('a[href="#workflow"]');
      if (workflowLink?.nextSibling) subnav.insertBefore(link, workflowLink.nextSibling);
      else subnav.appendChild(link);
    }

    const section = document.createElement('section');
    section.className = 'section featured-work-section';
    section.id = 'featured-work';
    section.innerHTML = `
      <div class="container">
        <div class="section-head featured-work-heading">
          <div><span class="section-kicker" data-featured-copy="kicker">${t.kicker}</span><h2 data-featured-copy="title">${t.title}</h2></div>
          <p class="section-copy" data-featured-copy="lead">${t.lead}</p>
        </div>
        <div class="featured-work-shell">
          <div class="featured-work-hero">
            <div class="featured-work-media" data-featured-hero>
              <span class="featured-work-frame-label" data-featured-copy="workLabel">${t.workLabel}</span>
              <div class="featured-work-placeholder" data-featured-hero-placeholder>${t.stillPlaceholder}</div>
              <strong class="featured-work-name">${featuredWork.title}</strong>
            </div>
            <aside class="featured-work-info">
              <div><span class="section-kicker" data-featured-copy="info">${t.info}</span><h3>${featuredWork.title}</h3></div>
              <p data-featured-copy="description">${t.description}</p>
              <ul class="featured-work-meta">
                <li><span data-featured-copy="name">${t.name}</span><strong>${featuredWork.title}</strong></li>
                <li><span data-featured-copy="format">${t.format}</span><strong>${featuredWork.format}</strong></li>
                <li><span data-featured-copy="year">${t.year}</span><strong data-featured-value="year">${featuredWork.year || t.pending}</strong></li>
                <li><span data-featured-copy="duration">${t.duration}</span><strong data-featured-value="duration">${featuredWork.duration || t.pending}</strong></li>
              </ul>
            </aside>
          </div>
          <div class="featured-work-gallery" data-featured-gallery></div>
          <div class="featured-work-full" data-featured-full>
            <div class="featured-work-full-copy"><span data-featured-copy="fullEyebrow">${t.fullEyebrow}</span><h3 data-featured-copy="fullTitle">${t.fullTitle}</h3><p data-featured-copy="fullCopy">${t.fullCopy}</p></div>
            <span class="featured-work-full-action" data-featured-copy="comingSoon">${t.comingSoon}</span>
          </div>
        </div>
      </div>`;

    workflow.insertAdjacentElement('afterend', section);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = section.querySelector('[data-featured-hero]');
    const heroPlaceholder = section.querySelector('[data-featured-hero-placeholder]');
    if (featuredWork.stillSrc && hero) {
      heroPlaceholder?.remove();
      const img = document.createElement('img');
      img.src = featuredWork.stillSrc;
      img.alt = `${featuredWork.title} — still`;
      img.decoding = 'async';
      hero.prepend(img);
    }

    const gallery = section.querySelector('[data-featured-gallery]');
    gallery?.appendChild(makeMedia('image', featuredWork.stillSrc, t.still, t.stillPlaceholder, reduced));
    gallery?.appendChild(makeMedia('video', featuredWork.loopVideoSrc, t.loop, t.videoPlaceholder, reduced));

    if (featuredWork.fullWorkUrl) {
      const full = section.querySelector('[data-featured-full]');
      const anchor = document.createElement('a');
      anchor.className = full.className;
      anchor.href = featuredWork.fullWorkUrl;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.innerHTML = full.innerHTML;
      full.replaceWith(anchor);
      const action = anchor.querySelector('.featured-work-full-action');
      if (action) action.textContent = lang === 'en' ? 'WATCH FULL ↗' : 'XEM FULL ↗';
    }

    return section;
  }

  function translateFeaturedWork() {
    const section = document.getElementById('featured-work');
    if (!section) return;
    const t = featuredCopy[getLang()];
    const nav = document.querySelector('[data-featured-work-nav]');
    if (nav) nav.textContent = t.nav;
    section.querySelectorAll('[data-featured-copy]').forEach(el => {
      const key = el.dataset.featuredCopy;
      if (t[key]) el.textContent = t[key];
    });
    const year = section.querySelector('[data-featured-value="year"]');
    const duration = section.querySelector('[data-featured-value="duration"]');
    if (year) year.textContent = featuredWork.year || t.pending;
    if (duration) duration.textContent = featuredWork.duration || t.pending;
  }

  function init() {
    const featuredSection = mountFeaturedWork();
    document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => requestAnimationFrame(translateFeaturedWork)));

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
        tag.textContent = `${String(i+1).padStart(2,'0')} / 05 · FRAME BY FRAME`;
        steps.forEach((step, index) => step.classList.toggle('is-current', index === i));
      };
      steps.forEach((step, i) => ScrollTrigger.create({ trigger: step, start: 'top 58%', end: 'bottom 58%', onEnter: () => setStep(i), onEnterBack: () => setStep(i) }));
      if (desktop) gsap.fromTo(center, { rotationX: 12, z: -80 }, { rotationX: 0, z: 45, ease: 'none', scrollTrigger: { trigger: '.product-motion-flow', start: 'top 60%', end: 'bottom 30%', scrub: true } });
    }

    // Animate chapter visuals, never the cards that the existing stagger/hover owns.
    gsap.utils.toArray('.product-info-section .section-head h2').forEach(title => gsap.fromTo(title,
      { y: 40, opacity: .6, rotationX: desktop ? 9 : 0 },
      { y: 0, opacity: 1, rotationX: 0, ease: 'none', scrollTrigger: { trigger: title, start: 'top 94%', end: 'top 50%', scrub: true } }));

    if (featuredSection) {
      const heading = featuredSection.querySelector('.featured-work-heading');
      const hero = featuredSection.querySelector('.featured-work-hero');
      const shots = featuredSection.querySelectorAll('.featured-work-shot');
      const full = featuredSection.querySelector('.featured-work-full');
      if (heading) gsap.fromTo(heading, { y: 36, opacity: .35 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: heading, start: 'top 92%', end: 'top 56%', scrub: true } });
      if (hero) gsap.fromTo(hero, { y: 48, opacity: .55, scale: .985 }, { y: 0, opacity: 1, scale: 1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top 92%', end: 'top 46%', scrub: true } });
      if (shots.length) gsap.fromTo(shots, { y: 42, opacity: .45 }, { y: 0, opacity: 1, stagger: .08, ease: 'none', scrollTrigger: { trigger: shots[0], start: 'top 92%', end: 'top 48%', scrub: true } });
      if (full) gsap.fromTo(full, { y: 34, opacity: .5 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: full, start: 'top 94%', end: 'top 62%', scrub: true } });
      ScrollTrigger.refresh();
    }

    const guide = document.querySelector('.guide-scene');
    if (guide && desktop) {
      const path = guide.querySelector('.guide-path path');
      const circles = guide.querySelectorAll('.guide-path circle');
      const length = path.getTotalLength();
      gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: guide, start: 'top 84%', end: 'bottom 28%', scrub: true } });
      gsap.fromTo(circles, { scale: .4, opacity: .25, transformOrigin: 'center center' }, { scale: 1, opacity: 1, stagger: .12, ease: 'none', scrollTrigger: { trigger: guide, start: 'top 82%', end: 'bottom 32%', scrub: true } });
      gsap.fromTo(guide.querySelector('.guide-path'), { rotationX: 9, z: -75 }, { rotationX: 0, z: 0, ease: 'none', scrollTrigger: { trigger: guide, start: 'top 85%', end: 'bottom 25%', scrub: true } });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
