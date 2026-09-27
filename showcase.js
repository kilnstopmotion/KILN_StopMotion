(() => {
  const intro = document.querySelector('[data-showcase-intro]');
  if (!intro) return;
  const copy = {
    vi: { finalePre: 'Xin hân hạnh giới thiệu', finaleCopy: 'Phần mềm giúp bạn chụp, xem trước và quản lý từng khung hình một cách dễ dàng và trực quan nhất.', explore: 'Khám phá phần mềm', download: 'Tải xuống' },
    en: { finalePre: 'Proudly introducing', finaleCopy: 'Software that helps you capture, preview and manage every frame with ease and intuitive control.', explore: 'Explore the product', download: 'Download' }
  };
  function translate() {
    let language = document.documentElement.lang;
    try { language = localStorage.getItem('daa-lang') || language; } catch (_) { /* Storage may be disabled. */ }
    const lang = language === 'en' ? 'en' : 'vi';
    intro.querySelectorAll('[data-showcase-key]').forEach(el => { el.textContent = copy[lang][el.dataset.showcaseKey]; });
  }
  translate();
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => requestAnimationFrame(translate)));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const stage = intro.querySelector('.showcase-stage');
  const logo = intro.querySelector('.showcase-logo-wrap');
  const field = intro.querySelector('.intro-color-field');
  const halo = intro.querySelector('.intro-halo');
  const readout = intro.querySelector('[data-showcase-frame]');
  const animations = [];
  let finished = false;
  let timer;
  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    animations.forEach(animation => animation.cancel());
    intro.classList.remove('intro-playing');
    readout.textContent = '096';
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', finish);
    window.removeEventListener('keydown', onKey);
    document.removeEventListener('click', onClick, true);
    reduced.removeEventListener('change', finish);
  }
  function onScroll() { if (window.scrollY > 24) finish(); }
  function onKey(event) { if (['Escape', 'Tab', 'End', 'PageDown', ' '].includes(event.key)) finish(); }
  function onClick(event) { if (event.target.closest('a,button')) finish(); }
  // No scroll pinning or input interception. Restored pages and anchor links open immediately.
  if (reduced.matches || location.hash || window.scrollY > 24 || !logo.animate) { finish(); return; }
  const ease = 'cubic-bezier(.22,1,.36,1)';
  function animate(element, frames, duration, delay = 0, easing = ease) {
    const animation = element.animate(frames, {duration, delay, easing, fill:'both'});
    animations.push(animation);
    return animation;
  }
  try {
    const box = logo.getBoundingClientRect();
    const bounds = stage.getBoundingClientRect();
    const dx = bounds.left + bounds.width / 2 - box.left - box.width / 2;
    const dy = bounds.top + Math.min(bounds.height, innerHeight - bounds.top) / 2 - box.top - box.height / 2;
    const scale = Math.min(156, innerWidth * .32) / box.width;
    const centered = `translate(${dx}px,${dy}px)`;
    const cy = box.top + box.height / 2 + dy - bounds.top;
    halo.style.top = `${cy}px`;
    intro.classList.add('intro-playing');
    animate(field, [{clipPath:'inset(0 100% 0 0 round 0px)'},{clipPath:'inset(0 0 0 0 round 0px)'}], 700);
    animate(field, [{clipPath:`circle(120% at 50% ${cy}px)`,opacity:1},{clipPath:`circle(64px at 50% ${cy}px)`,opacity:1,offset:.82},{clipPath:`circle(0px at 50% ${cy}px)`,opacity:0}], 900, 1150).effect.updateTiming({fill: 'forwards'});
    animate(intro.querySelector('.intro-ribbon'), [{transform:'translateX(-18%) rotate(-35deg)'},{transform:'translateX(12%) rotate(100deg)'}], 2150);
    animate(intro.querySelector('.intro-ribbon-secondary'), [{transform:'translateX(45%) rotate(25deg)'},{transform:'translateX(-30%) rotate(-45deg)'}], 2050);
    animate(halo, [{opacity:0,transform:'translate(-50%,-50%) scale(.35)'},{opacity:.8,offset:.35},{opacity:0,transform:'translate(-50%,-50%) scale(1.8)'}], 1100, 700);
    animate(logo, [
      {opacity:0,transform:`${centered} scale(${scale * .45}) rotate(-12deg)`,offset:0,easing:ease},
      {opacity:1,transform:`${centered} scale(${scale * 1.1}) rotate(3deg)`,offset:.19,easing:ease},
      {opacity:1,transform:`${centered} scale(${scale}) rotate(0deg)`,offset:.31,easing:ease},
      {opacity:1,transform:`${centered} scale(${scale}) rotate(0deg)`,offset:.65,easing:ease},
      {opacity:1,transform:'translate(-8px,-4px) scale(1.025) rotate(-1deg)',offset:.94,easing:ease},
      {opacity:1,transform:'translate(0,0) scale(1) rotate(0deg)',offset:1}
    ], 2400, 500, 'linear');
    const reveal = (selector, delay, duration=850) => intro.querySelectorAll(selector).forEach((el,i) => animate(el,[{opacity:0,transform:'translateY(28px) rotateX(-12deg)',clipPath:'inset(0 0 100% 0)'},{opacity:1,transform:'translateY(0) rotateX(0)',clipPath:'inset(-15% -10% -20% -10%)'}],duration,delay+i*160));
    reveal('.showcase-finale-pre',2150,650);
    reveal('.intro-title-line',2280,1000);
    reveal('.showcase-positioning',2650);
    reveal('.showcase-philosophy',2870);
    reveal('.showcase-final-actions',3080,700);
    animate(intro.querySelector('.showcase-topline'),[{opacity:0},{opacity:1}],600,2450);
    const counter = animate(readout,[{opacity:.4},{opacity:1}],3800);
    counter.onfinish = finish;
    timer = setTimeout(finish,4500); // Also restores content if an animation is interrupted.
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',finish);
    window.addEventListener('keydown',onKey);
    document.addEventListener('click',onClick,true);
    reduced.addEventListener('change',finish);
    window.addEventListener('pagehide',finish,{once:true});
  } catch (_) { finish(); }
})();
