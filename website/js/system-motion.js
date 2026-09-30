/* Small progressive enhancement for standalone system pages. */
(() => {
  const ready = callback => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback, { once: true }) : callback();
  ready(() => {
    const items = document.querySelectorAll('.right > .page > *, .right > section > *');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08, root: document.querySelector('.right') });
    items.forEach((item, index) => {
      if (item.matches('h1, .page__title, h2, p, .demo, .card, .table, .resource-card, .comp-card')) {
        item.classList.add('showcase-reveal'); item.style.transitionDelay = `${Math.min(index % 5, 4) * 35}ms`; observer.observe(item);
      }
    });
  });
})();
