/* Native scroll reveal; the full workflow also works without JavaScript. */
(() => {
  function init() {
    const nodes = [...document.querySelectorAll('.workflow-node')];
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    if (!reduced.matches && 'IntersectionObserver' in window) {
      nodes.forEach(node => node.classList.add('is-pending'));
      observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => nodes.indexOf(a.target)-nodes.indexOf(b.target));
        visible.forEach((entry, i) => {
          entry.target.style.setProperty('--reveal-delay', `${i * 180}ms`);
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      }, {threshold:.16});
      nodes.forEach(node => observer.observe(node));
      reduced.addEventListener('change', () => {
        if (!reduced.matches) return;
        observer.disconnect();
        nodes.forEach(node => node.classList.remove('is-pending','is-revealed'));
      });
    }
    const dialog = document.createElement('dialog');
    if (typeof dialog.showModal !== 'function') return;
    dialog.className = 'shot-dialog';
    dialog.setAttribute('aria-label', 'DA&D StopMotion');
    dialog.innerHTML = '<div class="shot-dialog-bar"><span></span><button type="button"></button></div><img alt="">';
    document.body.appendChild(dialog);
    const photo = dialog.querySelector('img');
    const close = dialog.querySelector('button');
    let opener;
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus({preventScroll:true}); });
    document.querySelectorAll('[data-app-shot]').forEach(link => link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      photo.src = link.href;
      photo.alt = link.querySelector('img').alt;
      dialog.querySelector('span').textContent = translateSite('shotHint');
      close.textContent = translateSite('shotClose') + ' ×';
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    }));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
