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
  const cards = reviews.map((review, index) => {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.setAttribute('role', 'group');
    card.style.setProperty('--avatar-color', review.color);
    card.style.setProperty('--delay', `${Math.abs(index - 2) * 110}ms`);
    card.innerHTML = `<div class="review-card-inner"><div class="review-topline"><span class="review-demo"></span><span>FRAME / 0${index + 1}</span></div><span class="review-quote-mark" aria-hidden="true">“</span><blockquote></blockquote><div class="review-person"><span class="review-avatar" aria-hidden="true">${review.initials}</span><div><h3>${review.name}</h3><p class="review-role"></p><p class="review-detail"></p></div></div></div>`;
    stage.appendChild(card);
    const button = document.createElement('button');
    button.type = 'button';
    button.addEventListener('click', () => select(index));
    pagination.appendChild(button);
    card.addEventListener('click', () => { if (!suppressClick) select(index); });
    return card;
  });
  const dots = [...pagination.children];
  function select(index, announce = true) {
    active = (index + reviews.length) % reviews.length;
    cards.forEach((card, i) => {
      let slot = (i - active + reviews.length) % reviews.length;
      if (slot > 2) slot -= reviews.length;
      const distance = Math.abs(slot);
      card.style.setProperty('--slot', slot);
      card.style.setProperty('--drop', `${distance * 29}px`);
      card.style.setProperty('--scale', 1 - distance * .105);
      card.style.setProperty('--turn', `${slot * 2}deg`);
      card.style.setProperty('--layer', 5 - distance);
      card.style.setProperty('--opacity', 1 - distance * .18);
      card.classList.toggle('is-active', i === active);
      card.setAttribute('aria-hidden', String(i !== active));
      dots[i].setAttribute('aria-current', String(i === active));
    });
    if (announce) status.textContent = `${active + 1} / ${reviews.length} · ${reviews[active].name}`;
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
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  stage.addEventListener('pointermove', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      suppressClick = true;
      stage.classList.add('is-dragging');
      stage.setPointerCapture(event.pointerId);
    }
  });
  function endGesture(event, cancelled = false) {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!cancelled && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      suppressClick = true;
      select(active + (dx < 0 ? 1 : -1));
    }
    gesture = null;
    stage.classList.remove('is-dragging');
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
  }
  stage.addEventListener('pointerup', event => endGesture(event));
  stage.addEventListener('pointercancel', event => endGesture(event, true));
  stage.addEventListener('lostpointercapture', event => {
    // Touch starts with implicit capture on the child; transferring it to the stage
    // emits a bubbling loss event from that child, not the end of the gesture.
    if (event.target !== stage) return;
    gesture = null;
    stage.classList.remove('is-dragging');
  });
  stage.addEventListener('pointerleave', () => { if (!stage.classList.contains('is-dragging')) gesture = null; });
  translate();
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
