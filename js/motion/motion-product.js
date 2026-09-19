(() => {
  const names = ['CAPTURE','ANIMATE','REVIEW','ORGANIZE','EXPORT'];
  const FRAME_COUNT = 8;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const GUIDE_PATH = 'M78 350 C190 358 242 126 392 145 S631 352 822 103';
  const easing = {
    linear: t => t,
    easeIn: t => t * t,
    easeOut: t => 1 - Math.pow(1 - t, 2),
    easeInOut: t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  };

  const copy = {
    vi: {
      toolGuideCopy:'Lập kế hoạch quỹ đạo chuyển động bằng đường dẫn và các marker theo frame. Khoảng cách giữa các marker giúp hình dung spacing: gần nhau tạo chuyển động chậm hơn, xa nhau tạo chuyển động nhanh hơn.',
      motionGuideIntro:'Lập kế hoạch quỹ đạo và spacing giữa các frame trước khi animate. Đưa chuột vào khung Motion Guide và cuộn để di chuyển từ F01 tới frame cuối.',
      motionGuideSlowRule:'Marker gần nhau',motionGuideSlowRuleCopy:'Khoảng di chuyển nhỏ giữa hai frame → chuyển động chậm hơn.',
      motionGuideFastRule:'Marker xa nhau',motionGuideFastRuleCopy:'Khoảng di chuyển lớn giữa hai frame → chuyển động nhanh hơn.',
      motionGuideControlCopy:'Chọn một kiểu easing, sau đó cuộn chuột trực tiếp trên khung Motion Guide để xem spacing và tốc độ thay đổi.',
      motionGuideScrollHint:'Đưa chuột vào khung và cuộn · F01 → F08',motionGuideCurrentFrame:'Frame hiện tại',motionGuideSpeed:'Tốc độ chuyển động',motionGuideProgress:'Tiến trình',
      motionGuideLinear:'Linear',motionGuideLinearMeta:'Tốc độ đều',motionGuideEaseIn:'Ease In',motionGuideEaseInMeta:'Chậm → nhanh',motionGuideEaseOut:'Ease Out',motionGuideEaseOutMeta:'Nhanh → chậm',motionGuideEaseInOut:'Ease In / Out',motionGuideEaseInOutMeta:'Chậm → nhanh → chậm',
      motionGuideConstant:'Đều',motionGuideSlow:'Chậm',motionGuideMedium:'Vừa',motionGuideFast:'Nhanh',
      onionKicker:'RELATED PREVIEW TOOL / ONION SKIN'
    },
    en: {
      toolGuideCopy:'Plan a motion path using frame markers. The distance between markers visualizes spacing: closer positions create slower motion, while wider spacing creates faster motion.',
      motionGuideIntro:'Plan a path and spacing before animating. Move the pointer over the Motion Guide frame and scroll to travel from F01 to the final frame.',
      motionGuideSlowRule:'Markers close together',motionGuideSlowRuleCopy:'A smaller distance between frames creates slower movement.',
      motionGuideFastRule:'Markers farther apart',motionGuideFastRuleCopy:'A larger distance between frames creates faster movement.',
      motionGuideControlCopy:'Choose an easing pattern, then scroll directly over the Motion Guide frame to see spacing and speed change.',
      motionGuideScrollHint:'Hover the frame and scroll · F01 → F08',motionGuideCurrentFrame:'Current frame',motionGuideSpeed:'Motion speed',motionGuideProgress:'Progress',
      motionGuideLinear:'Linear',motionGuideLinearMeta:'Constant speed',motionGuideEaseIn:'Ease In',motionGuideEaseInMeta:'Slow → fast',motionGuideEaseOut:'Ease Out',motionGuideEaseOutMeta:'Fast → slow',motionGuideEaseInOut:'Ease In / Out',motionGuideEaseInOutMeta:'Slow → fast → slow',
      motionGuideConstant:'Constant',motionGuideSlow:'Slow',motionGuideMedium:'Medium',motionGuideFast:'Fast',
      onionKicker:'RELATED PREVIEW TOOL / ONION SKIN'
    }
  };

  function installGuideStyles() {
    if (document.querySelector('link[data-motion-guide-css]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'motion-guide.css';
    link.dataset.motionGuideCss = '';
    document.head.appendChild(link);
  }

  function installTranslations() {
    if (typeof I18N === 'undefined') return;
    if (I18N.vi) Object.assign(I18N.vi, copy.vi);
    if (I18N.en) Object.assign(I18N.en, copy.en);
  }

  function language() {
    return document.documentElement.lang?.toLowerCase().startsWith('en') ? 'en' : 'vi';
  }

  function text(key) {
    const lang = language();
    if (typeof I18N !== 'undefined' && I18N[lang]?.[key]) return I18N[lang][key];
    return copy[lang]?.[key] || key;
  }

  installGuideStyles();
  installTranslations();

  function initMotionGuide() {
    const guide = document.querySelector('.guide-scene');
    if (!guide || guide.querySelector('[data-motion-guide-demo]')) return;

    guide.querySelector(':scope > .guide-copy')?.remove();
    guide.querySelector(':scope > .guide-path')?.remove();
    guide.querySelector(':scope > .guide-frame-labels')?.remove();
    guide.classList.add('guide-scene--interactive');

    const demo = document.createElement('section');
    demo.className = 'motion-guide-demo';
    demo.dataset.motionGuideDemo = '';
    demo.innerHTML = `
      <div class="motion-guide-head">
        <div>
          <span class="cinema-kicker">05 / MOTION GUIDE</span>
          <h3 id="guide-scene-title">Motion Guide</h3>
          <p data-guide-i18n="motionGuideIntro">${text('motionGuideIntro')}</p>
        </div>
        <div class="motion-guide-rules" aria-label="Spacing explanation">
          <div class="motion-guide-rule"><span class="motion-guide-rule-visual" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span><strong data-guide-i18n="motionGuideSlowRule">${text('motionGuideSlowRule')}</strong><small data-guide-i18n="motionGuideSlowRuleCopy">${text('motionGuideSlowRuleCopy')}</small></span></div>
          <div class="motion-guide-rule"><span class="motion-guide-rule-visual is-far" aria-hidden="true"><i></i><i></i><i></i></span><span><strong data-guide-i18n="motionGuideFastRule">${text('motionGuideFastRule')}</strong><small data-guide-i18n="motionGuideFastRuleCopy">${text('motionGuideFastRuleCopy')}</small></span></div>
        </div>
      </div>

      <div class="motion-guide-workspace">
        <div class="motion-guide-stage" data-guide-wheel-zone tabindex="0" aria-label="Interactive Motion Guide. Scroll to move between frames.">
          <div class="motion-guide-stage-meta"><span>MOTION GUIDE / PATH</span><strong><span data-guide-i18n="motionGuideCurrentFrame">${text('motionGuideCurrentFrame')}</span> · <b data-guide-frame>F01</b> / F08</strong></div>
          <svg class="motion-guide-svg" viewBox="0 0 900 460" role="img" aria-label="Eight frame markers distributed along a motion path">
            <path class="motion-guide-base-path" data-guide-path d="${GUIDE_PATH}" />
            <path class="motion-guide-progress-path" data-guide-progress-path d="${GUIDE_PATH}" />
            <g data-guide-markers></g>
            <g data-guide-ghosts aria-hidden="true"><circle class="motion-guide-ghost" r="11" opacity=".22"></circle><circle class="motion-guide-ghost" r="10" opacity=".14"></circle><circle class="motion-guide-ghost" r="9" opacity=".08"></circle></g>
            <g data-guide-subject-group aria-hidden="true"><circle class="motion-guide-subject" r="15"></circle><circle class="motion-guide-subject-core" r="4"></circle></g>
          </svg>
          <div class="motion-guide-scroll-hint" data-guide-hint data-guide-i18n="motionGuideScrollHint">${text('motionGuideScrollHint')}</div>
        </div>

        <aside class="motion-guide-controls">
          <span class="motion-guide-control-kicker">SPACING / EASING</span>
          <p class="motion-guide-control-copy" data-guide-i18n="motionGuideControlCopy">${text('motionGuideControlCopy')}</p>
          <div class="motion-guide-recipes" data-guide-recipes></div>
          <div class="motion-guide-frame-control">
            <div class="motion-guide-control-label"><span data-guide-i18n="motionGuideCurrentFrame">${text('motionGuideCurrentFrame')}</span><output data-guide-frame-output>F01</output></div>
            <div class="motion-guide-slider-row"><span>F01</span><input class="motion-guide-slider" data-guide-slider type="range" min="0" max="1000" value="0" step="1" aria-label="Motion Guide progress"><span>F08</span></div>
          </div>
          <div class="motion-guide-speed"><div class="motion-guide-speed-head"><span data-guide-i18n="motionGuideSpeed">${text('motionGuideSpeed')}</span><output data-guide-speed-label>${text('motionGuideSlow')}</output></div><div class="motion-guide-speed-track"><div class="motion-guide-speed-fill" data-guide-speed-fill></div></div></div>
          <div class="motion-guide-progress"><div class="motion-guide-control-label"><span data-guide-i18n="motionGuideProgress">${text('motionGuideProgress')}</span><output data-guide-progress-output>0%</output></div><div class="motion-guide-progress-track" data-guide-progress-track></div><div class="motion-guide-progress-labels"><span>F01</span><span>F08</span></div></div>
        </aside>
      </div>`;

    const onion = guide.querySelector('[data-onion-demo]');
    guide.insertBefore(demo, onion || guide.firstChild);
    if (onion) {
      onion.classList.add('motion-guide-related');
      const onionKicker = onion.querySelector('.cinema-kicker');
      if (onionKicker) {
        onionKicker.dataset.guideI18n = 'onionKicker';
        onionKicker.textContent = text('onionKicker');
      }
    }

    document.querySelectorAll('[data-i18n="toolGuideCopy"]').forEach(node => { node.textContent = text('toolGuideCopy'); });

    const path = demo.querySelector('[data-guide-path]');
    const progressPath = demo.querySelector('[data-guide-progress-path]');
    const markerGroup = demo.querySelector('[data-guide-markers]');
    const subjectGroup = demo.querySelector('[data-guide-subject-group]');
    const ghosts = [...demo.querySelectorAll('.motion-guide-ghost')];
    const zone = demo.querySelector('[data-guide-wheel-zone]');
    const slider = demo.querySelector('[data-guide-slider]');
    const frameLabel = demo.querySelector('[data-guide-frame]');
    const frameOutput = demo.querySelector('[data-guide-frame-output]');
    const progressOutput = demo.querySelector('[data-guide-progress-output]');
    const speedLabel = demo.querySelector('[data-guide-speed-label]');
    const speedFill = demo.querySelector('[data-guide-speed-fill]');
    const progressTrack = demo.querySelector('[data-guide-progress-track]');
    const recipeRoot = demo.querySelector('[data-guide-recipes]');
    if (!path || !progressPath || !markerGroup || !subjectGroup || !zone || !slider || !recipeRoot) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let currentEase = 'easeInOut';
    let progress = 0;
    let pathLength = path.getTotalLength();

    const recipeDefs = [
      ['linear','motionGuideLinear','motionGuideLinearMeta'],
      ['easeIn','motionGuideEaseIn','motionGuideEaseInMeta'],
      ['easeOut','motionGuideEaseOut','motionGuideEaseOutMeta'],
      ['easeInOut','motionGuideEaseInOut','motionGuideEaseInOutMeta']
    ];
    const recipeDots = name => Array.from({length:6},(_,i) => `<i style="--x:${(easing[name](i / 5) * 100).toFixed(2)}%"></i>`).join('');
    recipeRoot.innerHTML = recipeDefs.map(([name,labelKey,metaKey]) => `<button type="button" class="motion-guide-recipe${name === currentEase ? ' is-active' : ''}" data-guide-ease="${name}" aria-pressed="${name === currentEase}"><strong data-guide-i18n="${labelKey}">${text(labelKey)}</strong><small data-guide-i18n="${metaKey}">${text(metaKey)}</small><span class="motion-guide-mini" aria-hidden="true">${recipeDots(name)}</span></button>`).join('');

    function pointForRawProgress(raw) {
      const clamped = Math.max(0, Math.min(1, raw));
      return path.getPointAtLength(easing[currentEase](clamped) * pathLength);
    }

    function renderMarkers() {
      markerGroup.innerHTML = '';
      for (let i = 0; i < FRAME_COUNT; i += 1) {
        const point = pointForRawProgress(i / (FRAME_COUNT - 1));
        const group = document.createElementNS(SVG_NS, 'g');
        group.classList.add('motion-guide-marker');
        group.dataset.frame = String(i);
        group.setAttribute('transform', `translate(${point.x} ${point.y})`);
        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('r', '8');
        const label = document.createElementNS(SVG_NS, 'text');
        label.setAttribute('x', '0'); label.setAttribute('y', '-20'); label.setAttribute('text-anchor', 'middle');
        label.textContent = `F${String(i + 1).padStart(2,'0')}`;
        group.append(circle, label);
        markerGroup.appendChild(group);
      }
    }

    function derivative(name, t) {
      if (name === 'linear') return 1;
      const fn = easing[name], epsilon = .002;
      const lo = Math.max(0, t - epsilon), hi = Math.min(1, t + epsilon);
      return (fn(hi) - fn(lo)) / Math.max(epsilon, hi - lo);
    }

    function updateSpeed() {
      const speed = derivative(currentEase, progress);
      const normalized = currentEase === 'linear' ? .5 : Math.max(.04, Math.min(1, speed / 2));
      if (speedFill) speedFill.style.setProperty('--speed', `${Math.round(normalized * 100)}%`);
      if (!speedLabel) return;
      if (currentEase === 'linear') speedLabel.textContent = text('motionGuideConstant');
      else if (speed < .58) speedLabel.textContent = text('motionGuideSlow');
      else if (speed > 1.35) speedLabel.textContent = text('motionGuideFast');
      else speedLabel.textContent = text('motionGuideMedium');
    }

    function updateProgress(next, fromSlider = false) {
      progress = Math.max(0, Math.min(1, next));
      const eased = easing[currentEase](progress);
      const point = path.getPointAtLength(eased * pathLength);
      subjectGroup.setAttribute('transform', `translate(${point.x} ${point.y})`);
      ghosts.forEach((ghost, index) => {
        const ghostPoint = pointForRawProgress(Math.max(0, progress - ((index + 1) * .035)));
        ghost.setAttribute('cx', ghostPoint.x); ghost.setAttribute('cy', ghostPoint.y);
        ghost.style.visibility = progress <= .002 && index > 0 ? 'hidden' : 'visible';
      });
      const nearest = Math.round(progress * (FRAME_COUNT - 1));
      [...markerGroup.children].forEach((marker, index) => {
        marker.classList.toggle('is-current', index === nearest);
        marker.classList.toggle('is-past', index < nearest);
        marker.classList.toggle('is-future', index > nearest);
      });
      const frameText = `F${String(nearest + 1).padStart(2,'0')}`;
      if (frameLabel) frameLabel.textContent = frameText;
      if (frameOutput) frameOutput.value = frameText;
      if (progressOutput) progressOutput.value = `${Math.round(progress * 100)}%`;
      if (progressTrack) progressTrack.style.setProperty('--progress', `${progress * 100}%`);
      if (!fromSlider) slider.value = String(Math.round(progress * 1000));
      progressPath.style.strokeDashoffset = String(pathLength * (1 - eased));
      updateSpeed();
    }

    function setEase(name) {
      if (!easing[name]) return;
      currentEase = name;
      recipeRoot.querySelectorAll('[data-guide-ease]').forEach(button => {
        const active = button.dataset.guideEase === name;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      renderMarkers();
      updateProgress(progress);
    }

    function refreshLocalizedText() {
      demo.querySelectorAll('[data-guide-i18n]').forEach(node => {
        const key = node.dataset.guideI18n;
        if (key) node.textContent = text(key);
      });
      document.querySelectorAll('[data-i18n="toolGuideCopy"]').forEach(node => { node.textContent = text('toolGuideCopy'); });
      const onionKicker = guide.querySelector('[data-onion-demo] .cinema-kicker');
      if (onionKicker) onionKicker.textContent = text('onionKicker');
      updateSpeed();
    }

    pathLength = path.getTotalLength();
    progressPath.style.strokeDasharray = String(pathLength);
    progressPath.style.strokeDashoffset = String(pathLength);
    renderMarkers();
    updateProgress(0);

    recipeRoot.addEventListener('click', event => {
      const button = event.target.closest('[data-guide-ease]');
      if (button) setEase(button.dataset.guideEase);
    });
    const markInteracted = () => {
      zone.classList.add('has-interacted');
      demo.querySelector('.motion-guide-workspace')?.classList.add('has-interacted');
    };

    slider.addEventListener('input', () => {
      markInteracted();
      updateProgress(Number(slider.value) / 1000, true);
    });

    // While the pointer is inside the visual Motion Guide frame, wheel input belongs
    // exclusively to the guide. The document must not scroll, even at F01/F08.
    // Moving the pointer outside this frame restores native page scrolling immediately.
    zone.addEventListener('wheel', event => {
      if (reduced.matches || !finePointer.matches) return;
      event.preventDefault();
      event.stopPropagation();
      if (Math.abs(event.deltaY) < .1) return;
      markInteracted();
      const delta = Math.max(-.12, Math.min(.12, event.deltaY * .00065));
      updateProgress(progress + delta);
    }, { passive:false });

    zone.addEventListener('keydown', event => {
      const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
      const backward = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
      if (!forward && !backward) return;
      event.preventDefault();
      markInteracted();
      updateProgress(progress + (forward ? .06 : -.06));
    });

    document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => requestAnimationFrame(refreshLocalizedText)));
  }

  function init() {
    initMotionGuide();
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
        center.innerHTML = `DA&amp;D<br><em>${names[i]}</em>`;
        tag.textContent = `${String(i + 1).padStart(2,'0')} / 05 · FRAME BY FRAME`;
        steps.forEach((step, index) => step.classList.toggle('is-current', index === i));
      };
      steps.forEach((step, i) => ScrollTrigger.create({ trigger:step, start:'top 58%', end:'bottom 58%', onEnter:()=>setStep(i), onEnterBack:()=>setStep(i) }));
      if (desktop) gsap.fromTo(center,{rotationX:12,z:-80},{rotationX:0,z:45,ease:'none',scrollTrigger:{trigger:'.product-motion-flow',start:'top 60%',end:'bottom 30%',scrub:true}});
    }

    gsap.utils.toArray('.product-info-section .section-head h2').forEach(title => gsap.fromTo(title,{y:40,opacity:.6,rotationX:desktop?9:0},{y:0,opacity:1,rotationX:0,ease:'none',scrollTrigger:{trigger:title,start:'top 94%',end:'top 50%',scrub:true}}));
    const guideDemo = document.querySelector('[data-motion-guide-demo]');
    if (guideDemo && desktop) gsap.fromTo(guideDemo,{y:26,opacity:.82,rotationX:4},{y:0,opacity:1,rotationX:0,ease:'none',scrollTrigger:{trigger:guideDemo,start:'top 90%',end:'top 52%',scrub:true}});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
