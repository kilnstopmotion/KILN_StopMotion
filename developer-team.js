(() => {
  const members = [...document.querySelectorAll('.team-member')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      target.classList.toggle('is-in-view', isIntersecting);
      if (isIntersecting) {
        target.classList.remove('is-pending');
        target.classList.add('is-revealed');
      }
    });
  }, {threshold: .15});
  members.forEach(member => {
    member.classList.add('is-pending');
    observer.observe(member);
  });
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    observer.disconnect();
    members.forEach(member => member.classList.remove('is-pending','is-revealed','is-in-view'));
  });
})();
