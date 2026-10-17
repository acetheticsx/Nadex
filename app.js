(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const year = document.querySelector('#year');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  if (year) year.textContent = String(new Date().getFullYear());

  // The app bar reacts to scroll and exposes a lightweight reading-progress line.
  let scrollFrame = 0;
  const scrollMotion = () => {
    scrollFrame = 0;
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const y = Math.max(0, window.scrollY || doc.scrollTop || 0);
    if (header) {
      header.classList.toggle('is-scrolled', y > 18);
      header.style.setProperty('--scroll-progress', `${Math.min(100, y / maxScroll * 100)}%`);
    }
    if (reduceMotion) return;
    const heroMark = document.querySelector('.hero-mark');
    const hero = document.querySelector('.hero');
    if (heroMark && hero) {
      const range = Math.max(1, hero.offsetHeight * .9);
      const progress = Math.max(0, Math.min(1, y / range));
      heroMark.style.setProperty('--hero-scale', (1.055 - progress * .12).toFixed(3));
      const frame = document.querySelector('.art-frame');
      if (frame) frame.style.setProperty('--frame-scale', (1 + progress * .06).toFixed(3));
    }
    document.querySelectorAll('.feature-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.min(1, Math.abs(center - window.innerHeight * .52) / (window.innerHeight * .85));
      const scale = .975 + (1 - distance) * .035;
      card.style.setProperty('--scroll-zoom', scale.toFixed(3));
    });
  };
  const scheduleScrollMotion = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(scrollMotion);
  };
  window.addEventListener('scroll', scheduleScrollMotion, { passive: true });
  window.addEventListener('resize', scheduleScrollMotion, { passive: true });
  scrollMotion();

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
      if (event.key === 'Escape') { closeMenu(); toggle.focus(); }
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const selectors = [
    '.hero-copy > .eyebrow', '.hero-copy > h1', '.hero-copy > .hero-subtitle',
    '.hero-copy > .hero-actions', '.hero-copy > .hero-stats', '.hero-art',
    '.section-heading', '.feature-card', '.rules-layout > div', '.rules-list li',
    '.requirement-item', '.join-layout > div', '.faq-list details', '.footer-main > *'
  ];
  const targets = [...new Set(selectors.flatMap(selector => [...document.querySelectorAll(selector)]))];
  targets.forEach(element => {
    element.setAttribute('data-reveal', element.matches('.hero-art') ? 'scale' : 'up');
    const siblings = [...(element.parentElement?.children || [])].filter(child => targets.includes(child));
    element.style.setProperty('--reveal-delay', `${Math.min(Math.max(0, siblings.indexOf(element)) * 75, 300)}ms`);
  });

  const scrambleNodes = element => {
    if (element.dataset.scrambleDone || element.dataset.scrambling) return;
    if (!element.matches('h1,h2,h3,.eyebrow,.card-meta,.requirement-value,.contact-role')) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeValue.trim()) nodes.push({ node, final: node.nodeValue });
    }
    if (!nodes.length) return;
    element.dataset.scrambling = 'true';
    const glyphs = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/+-';
    const length = nodes.reduce((sum, item) => sum + item.final.length, 0);
    const start = performance.now();
    const duration = Math.min(780, 340 + length * 5);
    const paint = now => {
      const progress = Math.min(1, (now - start) / duration);
      let position = 0;
      nodes.forEach(({node, final}) => {
        let output = '';
        for (let i = 0; i < final.length; i++, position++) {
          const char = final[i];
          if (char === ' ' || /[.,:!?/+-]/.test(char) || progress >= Math.min(1, (position / Math.max(1, length)) * .72 + .28)) output += char;
          else output += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
        node.nodeValue = output;
      });
      if (progress < 1) requestAnimationFrame(paint);
      else { nodes.forEach(({node, final}) => node.nodeValue = final); delete element.dataset.scrambling; element.dataset.scrambleDone = 'true'; }
    };
    requestAnimationFrame(paint);
  };

  requestAnimationFrame(() => document.documentElement.classList.add('motion-ready'));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    element.classList.add('is-visible');
    scrambleNodes(element);
    element.querySelectorAll('h1,h2,h3,.eyebrow,.card-meta,.requirement-value,.contact-role').forEach(scrambleNodes);
    observer.unobserve(element);
  }), { threshold: 0.12, rootMargin: '0px 0px -42px 0px' });
  targets.forEach(element => observer.observe(element));

  const parallaxTargets = [...document.querySelectorAll('.hero-art,.section-heading,.feature-card,.rules-layout > div,.rules-list li,.requirement-item,.join-layout > div,.contact-list a')];
  let frame = 0;
  const updateParallax = () => {
    frame = 0;
    const viewport = window.innerHeight || 1;
    parallaxTargets.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > viewport + 100) return;
      const centerOffset = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const strength = element.matches('.hero-art,.section-heading') ? 15 : 8;
      element.style.setProperty('--parallax-y', `${Math.max(-strength, Math.min(strength, centerOffset * -strength))}px`);
    });
  };
  const scheduleParallax = () => { if (!frame) frame = requestAnimationFrame(updateParallax); };
  window.addEventListener('scroll', scheduleParallax, { passive: true });
  window.addEventListener('resize', scheduleParallax, { passive: true });
  scheduleParallax();
})();
