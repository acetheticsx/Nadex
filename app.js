(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const year = document.querySelector('#year');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (year) year.textContent = String(new Date().getFullYear());

  const closeMenu = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const revealTargets = [
    '.hero-copy > .eyebrow', '.hero-copy > h1', '.hero-copy > .hero-subtitle',
    '.hero-copy > .hero-actions', '.hero-copy > .hero-stats', '.hero-art',
    '.section-heading', '.feature-card', '.rules-layout > div', '.rules-list li',
    '.requirement-item', '.join-layout > div', '.faq-list details', '.footer-main > *'
  ].flatMap(selector => Array.from(document.querySelectorAll(selector)));

  const uniqueTargets = [...new Set(revealTargets)];
  uniqueTargets.forEach((element, index) => {
    element.setAttribute('data-reveal', element.matches('.hero-art') ? 'scale' : 'up');
    const group = element.parentElement;
    const siblings = group ? Array.from(group.children).filter(child => uniqueTargets.includes(child)) : [];
    const order = Math.max(0, siblings.indexOf(element));
    element.style.setProperty('--reveal-delay', `${Math.min(order * 75, 300)}ms`);
  });

  requestAnimationFrame(() => document.documentElement.classList.add('motion-ready'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  uniqueTargets.forEach(element => observer.observe(element));
})();
