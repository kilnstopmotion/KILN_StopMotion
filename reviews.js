(() => {
  const section = document.querySelector('#reviews');
  if (!section) return;
  // Illustrative profiles only. Replace names, roles and both quotes with approved real reviews.
  // Initials provide self-contained avatar placeholders until real portraits are supplied.
  const reviews = [
    { name: 'Minh Anh', initials: 'MA', color: '#626f8b', role: ['Animator độc lập', 'Independent animator'], detail: ['Stop-motion · Hà Nội', 'Stop-motion · Hanoi'], quote: ['Xem lại từng khung hình ngay khi chụp giúp tôi giữ được nhịp chuyển động mình muốn.', 'Reviewing each frame as I shoot helps me keep the rhythm I imagined.'] },
    { name: 'Hoàng Nam', initials: 'HN', color: '#6d7260', role: ['Nhà làm phim', 'Filmmaker'], detail: ['Phim ngắn · TP. Hồ Chí Minh', 'Short films · Ho Chi Minh City'], quote: ['Tôi thích một không gian làm việc gọn gàng, để tập trung nhiều hơn vào nhân vật và câu chuyện.', 'I like a clear workspace that lets me focus on the characters and their story.'] },
    { name: 'Thảo Linh', initials: 'TL', color: '#966754', role: ['Sinh viên hoạt hình', 'Animation student'], detail: ['Đồ án stop-motion · Đà Nẵng', 'Stop-motion projects · Da Nang'], quote: ['Từ những chuyển động đầu tiên đến một cảnh hoàn chỉnh, mọi thứ trở nên dễ hình dung hơn.', 'From the first tiny movements to a finished scene, the process feels easier to picture.'] },
    { name: 'Gia Huy', initials: 'GH', color: '#526d77', role: ['Nghệ sĩ mô hình', 'Model artist'], detail: ['Puppet & miniature · Hà Nội', 'Puppets & miniatures · Hanoi'], quote: ['Thật vui khi thấy mô hình của mình có sức sống, từng chút một, ngay trên màn hình.', 'Seeing my model come to life, little by little, right on screen is a joy.'] },
    { name: 'Khánh Vy', initials: 'KV', color: '#7f657b', role: ['Người sáng tạo nội dung', 'Content creator'], detail: ['Product animation · TP. HCM', 'Product animation · Ho Chi Minh City'], quote: ['Chụp, xem thử rồi tinh chỉnh ngay. Nhịp làm việc ấy cho tôi thêm không gian để thử ý tưởng mới.', 'Capture, preview, then refine. That rhythm gives me more room to try new ideas.'] }
  ];
  const copy = {
    vi: { title: 'Một công cụ.<br><em>Nhiều góc nhìn.</em>', lead: 'Những lời chia sẻ từ người làm chuyển động.', sample: 'BẢN MẪU · 5 hồ sơ và nhận xét minh họa, chưa phải đánh giá thực tế.', hint: 'Kéo hoặc vuốt để khám phá · Chọn một góc nhìn', prev: 'Review trước', next: 'Review tiếp theo', select: 'Chọn review', label: 'Review của người dùng', keyboard: 'Dùng phím mũi tên trái hoặc phải để chọn review', demo: 'HỒ SƠ MẪU' },
    en: { title: 'One tool.<br><em>Many perspectives.</em>', lead: 'A few words from the people behind the motion.', sample: 'DEMO · 5 illustrative profiles and quotes, not actual testimonials.', hint: 'Drag or swipe to explore · Choose a perspective', prev: 'Previous review', next: 'Next review', select: 'Select review', label: 'User reviews', keyboard: 'Use the left or right arrow key to select a review', demo: 'SAMPLE PROFILE' }
  };
  const stage = section.querySelector('.reviews-stage');
  const pagination = section.querySelector('.reviews-pagination');
  const status = section.querySelector('.reviews-status');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 2;
  let language;
  let gesture = null;
  let suppressClick = false;
  let position = active;
  let destination = active;
  let velocity = 0;
  let step = 280;
  let frame = 0;
  let previousTime = 0;
  let hovered = -1;
  let tiltX = 0;
  let tiltY = 0;
  let targetX = 0;
  let targetY = 0;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const wrap = value => ((value % reviews.length) + reviews.length) % reviews.length;
  const slotAt = (index, center) => wrap(index - center + 2.5) - 2.5;
  const cards = reviews.map((review, index) => {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.setAttribute('role', 'group');
    card.style.setProperty('--avatar-color', review.color);
    card.style.setProperty('--delay', `${Math.abs(index - 2) * 110}ms`);
    card.innerHTML = `<div class="review-arrival"><div class="review-card-inner"><span class="review-sheen" aria-hidden="true"></span><span class="review-ripple" aria-hidden="true"></span><div class="review-topline"><span class="review-demo"></span><span>FRAME / 0${index + 1}</span></div><span class="review-quote-mark" aria-hidden="true">“</span><blockquote></blockquote><div class="review-person"><span class="review-avatar" aria-hidden="true">${review.initials}</span><div><h3>${review.name}</h3><p class="review-role"></p><p class="review-detail"></p></div></div></div></div>`;
    stage.appendChild(card);
    const button = document.createElement('button');
    button.type = 'button';
    button.addEventListener('click', () => select(index));
    pagination.appendChild(button);
    card.addEventListener('click', () => { if (!suppressClick) select(index); });
    return card;
  });
  const dots = [...pagination.children];
  const surfaces = cards.map(card => card.querySelector('.review-card-inner'));

  // The orbit and the pointer tilt have separate transform layers. Updating one
  // never interrupts the other, including while reversing a swipe mid-gesture.
  function paint() {
    cards.forEach((card, i) => {
      const slot = slotAt(i, position);
      const distance = Math.abs(slot);
      const fade = 1 - clamp((distance - 2.12) / .36, 0, 1);
      card.style.transform = `translate3d(calc(-50% + ${slot * step}px), ${distance * 25 + distance * distance * 7}px, ${-distance * 105}px) rotateY(${-slot * 13}deg) rotateZ(${slot * 2.3}deg) scale(${1 - distance * .045})`;
      card.style.opacity = fade;
      card.style.zIndex = 10 - Math.round(distance * 3);
      // Fade the wrapping card at the back of the orbit, never through the text.
      card.style.pointerEvents = fade < .15 ? 'none' : '';
      const pointed = i === hovered && !reduced.matches;
      surfaces[i].style.setProperty('--tilt-x', `${pointed ? tiltX : 0}deg`);
      surfaces[i].style.setProperty('--tilt-y', `${pointed ? tiltY : 0}deg`);
    });
  }
  function tick(time) {
    frame = 0;
    const dt = Math.min((time - (previousTime || time - 16.67)) / 1000, .032);
    previousTime = time;
    if (!gesture?.dragging) {
      velocity += ((destination - position) * 180 - velocity * 22) * dt;
      position += velocity * dt;
    }
    const blend = 1 - Math.exp(-14 * dt);
    tiltX += (targetX - tiltX) * blend;
    tiltY += (targetY - tiltY) * blend;
    const moving = Math.abs(destination - position) > .0005 || Math.abs(velocity) > .003;
    const tilting = Math.abs(targetX - tiltX) + Math.abs(targetY - tiltY) > .015;
    if (!moving && !gesture?.dragging) { position = destination; velocity = 0; }
    paint();
    if ((!gesture?.dragging && moving) || tilting) frame = requestAnimationFrame(tick);
    else previousTime = 0;
  }
  function requestPaint() {
    if (reduced.matches) {
      position = destination;
      velocity = tiltX = tiltY = targetX = targetY = 0;
      paint();
    } else if (!frame) frame = requestAnimationFrame(tick);
  }
  function measure() {
    step = innerWidth <= 760 ? Math.min(stage.clientWidth * .84, 345) : clamp(stage.clientWidth * .235, 195, 340);
    requestPaint();
  }
  function resetPointer() {
    targetX = targetY = 0;
    cards.forEach(card => card.classList.remove('is-pointed', 'is-pressed'));
    requestPaint();
  }
  function pointAt(event) {
    const card = event.target.closest('.review-card');
    if (!card || reduced.matches) return;
    const index = cards.indexOf(card);
    // Read the orbit wrapper so the inner surface's tilt cannot feed back into
    // pointer coordinates and make the card wobble under a stationary cursor.
    const rect = card.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    if (hovered !== index) {
      cards.forEach(item => item.classList.remove('is-pointed'));
      tiltX = tiltY = 0;
      hovered = index;
    }
    card.classList.add('is-pointed');
    surfaces[index].style.setProperty('--light-x', `${x * 100}%`);
    surfaces[index].style.setProperty('--light-y', `${y * 100}%`);
    targetX = (y - .5) * -11;
    targetY = (x - .5) * 15;
    requestPaint();
  }
  function illuminate(index) {
    if (reduced.matches) return;
    const surface = surfaces[index];
    const arrival = cards[index].querySelector('.review-arrival');
    arrival.getAnimations().filter(animation => animation.id === 'review-tap').forEach(animation => animation.cancel());
    const tap = arrival.animate([
      { transform: 'translateZ(0) scale(1)' },
      { transform: 'translateZ(-8px) scale(.987)', offset: .22 },
      { transform: 'translateZ(7px) scale(1.008)', offset: .6 },
      { transform: 'translateZ(0) scale(1)' }
    ], { duration: 520, easing: 'ease-out' });
    tap.id = 'review-tap';
    // Cancel previous flourishes so rapid clicks never accumulate animations.
    const sheen = surface.querySelector('.review-sheen');
    const ripple = surface.querySelector('.review-ripple');
    [sheen, ripple].forEach(el => el.getAnimations().forEach(animation => animation.cancel()));
    sheen.animate([
      { transform: 'translateX(-120%) skewX(-18deg)', opacity: 0 },
      { opacity: .45, offset: .35 },
      { transform: 'translateX(160%) skewX(-18deg)', opacity: 0 }
    ], { duration: 850, easing: 'cubic-bezier(.2,.7,.3,1)' });
    ripple.animate([
      { transform: 'translate(-50%,-50%) scale(.1)', opacity: .28 },
      { transform: 'translate(-50%,-50%) scale(4)', opacity: 0 }
    ], { duration: 700, easing: 'ease-out' });
  }
  function select(index, announce = true) {
    const next = wrap(index);
    destination += slotAt(next, wrap(destination));
    active = next;
    resetPointer();
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === active);
      card.setAttribute('aria-hidden', String(i !== active));
      dots[i].setAttribute('aria-current', String(i === active));
    });
    if (announce) {
      status.textContent = `${active + 1} / ${reviews.length} · ${reviews[active].name}`;
      illuminate(active);
    }
    requestPaint();
  }
  function translate() {
    language = document.documentElement.lang === 'en' ? 'en' : 'vi';
    const text = copy[language];
    const locale = language === 'en' ? 1 : 0;
    section.querySelectorAll('[data-review-copy]').forEach(el => {
      if (el.dataset.reviewCopy === 'title') el.innerHTML = text.title;
      else el.textContent = text[el.dataset.reviewCopy];
    });
    section.querySelector('[data-review-prev]').setAttribute('aria-label', text.prev);
    section.querySelector('[data-review-next]').setAttribute('aria-label', text.next);
    section.querySelector('.reviews-carousel').setAttribute('aria-label', text.label);
    stage.setAttribute('aria-label', text.keyboard);
    pagination.setAttribute('aria-label', text.select);
    cards.forEach((card, i) => {
      card.querySelector('blockquote').textContent = reviews[i].quote[locale];
      card.querySelector('.review-role').textContent = reviews[i].role[locale];
      card.querySelector('.review-detail').textContent = reviews[i].detail[locale];
      card.querySelector('.review-demo').textContent = text.demo;
      card.setAttribute('aria-label', `${i + 1} / ${reviews.length} · ${reviews[i].name}`);
      dots[i].setAttribute('aria-label', `${text.select} ${i + 1}: ${reviews[i].name}`);
    });
  }
  section.querySelector('[data-review-prev]').addEventListener('click', () => select(active - 1));
  section.querySelector('[data-review-next]').addEventListener('click', () => select(active + 1));
  stage.addEventListener('keydown', event => {
    const destinations = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: reviews.length - 1 };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    select(destinations[event.key]);
  });
  stage.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick = false;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, start: position, origin: destination, lastX: event.clientX, time: event.timeStamp, speed: 0, dragging: false, vertical: false };
    pointAt(event);
    event.target.closest('.review-card')?.classList.add('is-pressed');
  });
  stage.addEventListener('pointermove', event => {
    if (!gesture) {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
        if (event.target.closest('.review-card')) pointAt(event);
        else resetPointer();
      }
      return;
    }
    if (gesture.id !== event.pointerId || gesture.vertical) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.dragging && Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx) * 1.2) {
      gesture.vertical = true;
      resetPointer();
      return;
    }
    if (!gesture.dragging && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      gesture.dragging = true;
      suppressClick = true;
      stage.classList.add('is-dragging');
      stage.setPointerCapture(event.pointerId);
      resetPointer();
    }
    if (gesture.dragging) {
      const elapsed = Math.max(1, event.timeStamp - gesture.time);
      gesture.speed = .55 * gesture.speed + .45 * (event.clientX - gesture.lastX) / elapsed;
      gesture.lastX = event.clientX;
      gesture.time = event.timeStamp;
      if (!reduced.matches) {
        position = gesture.start - dx / step;
        velocity = 0;
        requestPaint();
      }
    }
  });
  function endGesture(event, cancelled = false) {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const current = gesture;
    gesture = null;
    if (!cancelled && current.dragging) {
      const speed = event.timeStamp - current.time < 90 ? current.speed : 0;
      let next = Math.round(current.start - dx / step + clamp(-speed * 150 / step, -.6, .6));
      if (Math.abs(dx) > 45 && next === current.origin) next += dx < 0 ? 1 : -1;
      velocity = reduced.matches ? 0 : clamp(-speed * 1000 / step, -5, 5);
      select(next);
    } else {
      destination = current.origin;
      requestPaint();
    }
    resetPointer();
    stage.classList.remove('is-dragging');
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    // The click dispatched immediately after pointerup stays suppressed.
    setTimeout(() => { suppressClick = false; }, 0);
  }
  stage.addEventListener('pointerup', event => endGesture(event));
  stage.addEventListener('pointercancel', event => endGesture(event, true));
  stage.addEventListener('lostpointercapture', event => {
    // Touch starts with implicit capture on the child; transferring it to the stage
    // emits a bubbling loss event from that child, not the end of the gesture.
    if (event.target === stage) endGesture(event, true);
  });
  stage.addEventListener('pointerleave', event => {
    resetPointer();
    if (gesture && !gesture.dragging) endGesture(event, true);
  });
  window.addEventListener('blur', () => {
    if (gesture) endGesture({ pointerId: gesture.id }, true);
    resetPointer();
  });
  reduced.addEventListener('change', () => {
    cancelAnimationFrame(frame);
    frame = previousTime = 0;
    resetPointer();
    section.classList.remove('is-entering');
    surfaces.forEach(surface => surface.getAnimations({ subtree: true }).forEach(animation => animation.cancel()));
    requestPaint();
  });
  new ResizeObserver(measure).observe(stage);
  translate();
  measure();
  select(active, false);
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      section.classList.add('is-entering');
      setTimeout(() => section.classList.remove('is-entering'), 1400);
      observer.disconnect();
    }, { threshold: .15 });
    observer.observe(section);
  }
})();
