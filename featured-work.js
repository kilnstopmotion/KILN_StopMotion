(() => {
  const work = {
    title: 'Lạc',
    format: 'Stop-motion',
    year: '',
    duration: '',
    stillSrc: '',
    loopVideoSrc: '',
    fullWorkUrl: ''
  };

  const copy = {
    vi: {
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

  const lang = () => localStorage.getItem('daa-lang') === 'en' ? 'en' : 'vi';

  function injectStyles() {
    if (document.getElementById('featured-work-styles')) return;
    const style = document.createElement('style');
    style.id = 'featured-work-styles';
    style.textContent = `
      body[data-page="featured"]{background:#090b18;color:var(--motion-white)}
      .featured-page-main{padding-top:88px;background:linear-gradient(180deg,#0a0c18,#111634 58%,#090b18)}
      .featured-work-section{min-height:calc(100vh - 88px);padding:clamp(90px,10vw,150px) 0;color:var(--motion-white);overflow:hidden}
      .featured-work-section .section-kicker{color:#ff7b8d}
      .featured-work-section .section-head{align-items:start;margin-bottom:54px}
      .featured-work-section .section-head h1{margin:10px 0 0;color:#fff;font:700 clamp(58px,7vw,106px)/.94 var(--serif);letter-spacing:-.055em}
      .featured-work-section .section-copy{color:#c5cade}
      .featured-work-shell{display:grid;gap:28px}
      .featured-work-hero{display:grid;grid-template-columns:minmax(0,1.22fr) minmax(320px,.78fr);gap:24px;align-items:stretch}
      .featured-work-media{position:relative;min-height:520px;overflow:hidden;border:1px solid #3b4267;background:radial-gradient(circle at 48% 42%,#283067,#090b1b 72%);box-shadow:0 30px 70px rgba(0,0,0,.32)}
      .featured-work-media img,.featured-work-media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
      .featured-work-media::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(5,6,8,.04),rgba(5,6,8,.14) 55%,rgba(5,6,8,.72));z-index:2}
      .featured-work-placeholder{position:absolute;inset:0;display:grid;place-items:center;padding:32px;text-align:center;color:#aeb6d6;font:800 11px var(--mono);letter-spacing:.14em;text-transform:uppercase}
      .featured-work-frame-label{position:absolute;z-index:3;left:18px;top:16px;padding:7px 9px;border:1px solid rgba(255,255,255,.14);background:rgba(5,6,8,.58);backdrop-filter:blur(10px);color:#ff8796;font:800 9px var(--mono);letter-spacing:.14em}
      .featured-work-name{position:absolute;z-index:3;left:22px;right:22px;bottom:20px;color:#fff;font:700 clamp(52px,7vw,108px)/.82 var(--serif);letter-spacing:-.055em;text-shadow:0 8px 34px rgba(0,0,0,.55)}
      .featured-work-info{border:1px solid #343a60;background:rgba(12,15,34,.76);padding:clamp(26px,3vw,42px);display:flex;flex-direction:column;justify-content:space-between;gap:34px}
      .featured-work-info h2{margin:10px 0 0;color:#fff;font:700 clamp(34px,4vw,56px)/1 var(--serif)}
      .featured-work-info>p{margin:0;color:#bac1da;font-size:16px}
      .featured-work-meta{margin:0;padding:0;list-style:none;border-top:1px solid rgba(233,237,255,.18)}
      .featured-work-meta li{display:grid;grid-template-columns:minmax(110px,.75fr) minmax(0,1.25fr);gap:20px;padding:14px 0;border-bottom:1px solid rgba(233,237,255,.14)}
      .featured-work-meta span{color:#8e98bd;font:800 9px var(--mono);letter-spacing:.12em;text-transform:uppercase}
      .featured-work-meta strong{color:#f3f4fa;font-size:14px;font-weight:650}
      .featured-work-gallery{display:grid;grid-template-columns:1fr 1fr;gap:24px}
      .featured-work-shot{position:relative;min-height:360px;overflow:hidden;border:1px solid #343a60;background:#090b19}
      .featured-work-shot img,.featured-work-shot video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
      .featured-work-shot .featured-work-placeholder{background:radial-gradient(circle at 50% 45%,rgba(31,34,81,.85),#080a16 72%)}
      .featured-work-full{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:28px;align-items:end;padding:clamp(30px,5vw,64px);border:1px solid #474e78;background:linear-gradient(115deg,#171d45,#0b0e22 62%,#070914);overflow:hidden;min-height:230px;color:inherit}
      .featured-work-full::before{content:"";position:absolute;width:340px;aspect-ratio:1;border:1px solid rgba(212,34,56,.36);border-radius:50%;right:-90px;top:-140px;box-shadow:0 0 0 48px rgba(212,34,56,.025),0 0 0 96px rgba(212,34,56,.014)}
      .featured-work-full-copy{position:relative;z-index:1;max-width:760px}
      .featured-work-full-copy span{color:#ff7b8d;font:800 10px var(--mono);letter-spacing:.16em}
      .featured-work-full h3{margin:12px 0 10px;color:#fff;font:700 clamp(42px,5vw,72px)/.95 var(--serif);letter-spacing:-.045em}
      .featured-work-full p{margin:0;color:#bfc6dd;max-width:620px}
      .featured-work-full-action{position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;min-width:170px;min-height:52px;padding:14px 18px;border:1px solid rgba(255,255,255,.32);color:#d7dbea;font:800 10px var(--mono);letter-spacing:.12em;white-space:nowrap}
      a.featured-work-full{background:linear-gradient(115deg,#171d45,#0b0e22 62%,#070914)}
      a.featured-work-full:hover .featured-work-full-action{transform:translateX(3px)}
      @media(max-width:980px){.featured-work-hero{grid-template-columns:1fr}.featured-work-media{min-height:500px}.featured-work-full{grid-template-columns:1fr}}
      @media(max-width:720px){.featured-page-main{padding-top:74px}.featured-work-section{padding:72px 0}.featured-work-section .section-head{margin-bottom:34px}.featured-work-media{min-height:420px}.featured-work-gallery{grid-template-columns:1fr}.featured-work-shot{min-height:300px}.featured-work-full{min-height:0}.featured-work-meta li{grid-template-columns:1fr;gap:6px}}
      @media(prefers-reduced-motion:reduce){.featured-work-shot video{display:none}}
    `;
    document.head.appendChild(style);
  }

  function mediaCard(type, src, label, placeholder, reduced) {
    const wrap = document.createElement('div');
    wrap.className = 'featured-work-shot';
    wrap.innerHTML = `<span class="featured-work-frame-label">${label}</span>`;
    if (!src) {
      const empty = document.createElement('div');
      empty.className = 'featured-work-placeholder';
      empty.textContent = placeholder;
      wrap.appendChild(empty);
      return wrap;
    }
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
      img.alt = `${work.title} — still`;
      img.loading = 'lazy';
      img.decoding = 'async';
      wrap.appendChild(img);
    }
    return wrap;
  }

  function render() {
    const root = document.getElementById('featured-work-root');
    if (!root) return null;
    injectStyles();
    const t = copy[lang()];
    root.innerHTML = `
      <section class="featured-work-section" id="featured-work">
        <div class="container">
          <div class="section-head featured-work-heading">
            <div><span class="section-kicker" data-featured-key="kicker">${t.kicker}</span><h1 data-featured-key="title">${t.title}</h1></div>
            <p class="section-copy" data-featured-key="lead">${t.lead}</p>
          </div>
          <div class="featured-work-shell">
            <div class="featured-work-hero">
              <div class="featured-work-media" data-featured-hero>
                <span class="featured-work-frame-label" data-featured-key="workLabel">${t.workLabel}</span>
                <div class="featured-work-placeholder" data-featured-hero-placeholder>${t.stillPlaceholder}</div>
                <strong class="featured-work-name">${work.title}</strong>
              </div>
              <aside class="featured-work-info">
                <div><span class="section-kicker" data-featured-key="info">${t.info}</span><h2>${work.title}</h2></div>
                <p data-featured-key="description">${t.description}</p>
                <ul class="featured-work-meta">
                  <li><span data-featured-key="name">${t.name}</span><strong>${work.title}</strong></li>
                  <li><span data-featured-key="format">${t.format}</span><strong>${work.format}</strong></li>
                  <li><span data-featured-key="year">${t.year}</span><strong data-work-value="year">${work.year || t.pending}</strong></li>
                  <li><span data-featured-key="duration">${t.duration}</span><strong data-work-value="duration">${work.duration || t.pending}</strong></li>
                </ul>
              </aside>
            </div>
            <div class="featured-work-gallery" data-featured-gallery></div>
            <div class="featured-work-full" data-featured-full>
              <div class="featured-work-full-copy"><span data-featured-key="fullEyebrow">${t.fullEyebrow}</span><h3 data-featured-key="fullTitle">${t.fullTitle}</h3><p data-featured-key="fullCopy">${t.fullCopy}</p></div>
              <span class="featured-work-full-action" data-featured-key="comingSoon">${t.comingSoon}</span>
            </div>
          </div>
        </div>
      </section>`;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = root.querySelector('[data-featured-hero]');
    if (work.stillSrc && hero) {
      hero.querySelector('[data-featured-hero-placeholder]')?.remove();
      const img = document.createElement('img');
      img.src = work.stillSrc;
      img.alt = `${work.title} — still`;
      img.decoding = 'async';
      hero.prepend(img);
    }

    const gallery = root.querySelector('[data-featured-gallery]');
    gallery?.appendChild(mediaCard('image', work.stillSrc, t.still, t.stillPlaceholder, reduced));
    gallery?.appendChild(mediaCard('video', work.loopVideoSrc, t.loop, t.videoPlaceholder, reduced));

    if (work.fullWorkUrl) {
      const full = root.querySelector('[data-featured-full]');
      const link = document.createElement('a');
      link.className = full.className;
      link.href = work.fullWorkUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = full.innerHTML;
      full.replaceWith(link);
      const action = link.querySelector('.featured-work-full-action');
      if (action) action.textContent = lang() === 'en' ? 'WATCH FULL ↗' : 'XEM FULL ↗';
    }
    return root.querySelector('.featured-work-section');
  }

  function translate() {
    const section = document.getElementById('featured-work');
    if (!section) return;
    const t = copy[lang()];
    section.querySelectorAll('[data-featured-key]').forEach(el => {
      const key = el.dataset.featuredKey;
      if (t[key]) el.textContent = t[key];
    });
    const year = section.querySelector('[data-work-value="year"]');
    const duration = section.querySelector('[data-work-value="duration"]');
    if (year) year.textContent = work.year || t.pending;
    if (duration) duration.textContent = work.duration || t.pending;
  }

  function init() {
    const section = render();
    document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => requestAnimationFrame(translate)));
    const motion = window.DAAMotion;
    if (!section || !motion || motion.reduced.matches || !motion.gsap || !motion.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = motion;
    const heading = section.querySelector('.featured-work-heading');
    const hero = section.querySelector('.featured-work-hero');
    const shots = section.querySelectorAll('.featured-work-shot');
    const full = section.querySelector('.featured-work-full');
    if (heading) gsap.fromTo(heading,{y:36,opacity:.35},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:heading,start:'top 92%',end:'top 56%',scrub:true}});
    if (hero) gsap.fromTo(hero,{y:48,opacity:.55,scale:.985},{y:0,opacity:1,scale:1,ease:'none',scrollTrigger:{trigger:hero,start:'top 92%',end:'top 46%',scrub:true}});
    if (shots.length) gsap.fromTo(shots,{y:42,opacity:.45},{y:0,opacity:1,stagger:.08,ease:'none',scrollTrigger:{trigger:shots[0],start:'top 92%',end:'top 48%',scrub:true}});
    if (full) gsap.fromTo(full,{y:34,opacity:.5},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:full,start:'top 94%',end:'top 62%',scrub:true}});
    ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();