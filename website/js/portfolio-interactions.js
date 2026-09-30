/* Portfolio interactions: command search, section reveal, and the live theme sample. */
(() => {
  'use strict';
  const ready = callback => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback, { once: true }) : callback();
  ready(() => {
    const dialog = document.getElementById('command_palette');
    const input = document.getElementById('command_search');
    const results = document.getElementById('command_results');
    const trigger = document.getElementById('command_button');
    const isApplePlatform = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
    const shortcutLabel = isApplePlatform ? '⌘ K' : 'Ctrl K';
    if (trigger) {
      trigger.setAttribute('aria-label', 'Search pages and components (' + (isApplePlatform ? 'Command' : 'Control') + ' K)');
      const keyHint = trigger.querySelector('kbd');
      if (keyHint) keyHint.textContent = shortcutLabel;
    }
    const paletteHint = dialog?.querySelector('.command-palette__hint');
    if (paletteHint) paletteHint.textContent = 'Tab to browse · Enter to open · Esc to close · ' + shortcutLabel + ' to search';
    const root = document.querySelector('.right');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const commands = [
      { label: 'Selected work', detail: 'Portfolio', href: '#work' },
      { label: 'Experience', detail: 'Portfolio', href: '#experience' },
      { label: 'Design process', detail: 'Case study', href: '#process_page' },
      { label: 'Design principles', detail: 'System docs', href: '#principles_page' },
      { label: 'Components', detail: 'Component library', href: '#components_page' },
      { label: 'Accessibility', detail: 'System docs', href: '#accessibility_page' },
      { label: 'Resources and tokens', detail: 'System docs', href: '#resources_page' }
    ];

    function collectCommands() {
      document.querySelectorAll('#ds-nav a[href^="#"]').forEach(link => {
        const href = link.getAttribute('href');
        const label = link.textContent.trim().replace(/\s+/g, ' ');
        if (href && label && !commands.some(command => command.href === href)) commands.push({ label, detail: 'Design system', href });
      });
    }
    function renderCommands(query = '') {
      collectCommands();
      const term = query.trim().toLocaleLowerCase();
      const matches = commands.filter(command => `${command.label} ${command.detail}`.toLocaleLowerCase().includes(term));
      results.replaceChildren();
      if (!matches.length) {
        const empty = document.createElement('p'); empty.className = 'command-palette__empty'; empty.textContent = 'No matching pages. Try a component or topic.'; results.append(empty); return;
      }
      matches.forEach(command => {
        const link = document.createElement('a'); link.className = 'command-palette__item'; link.href = command.href; link.setAttribute('role', 'option');
        const title = document.createElement('span'); title.textContent = command.label;
        const detail = document.createElement('small'); detail.textContent = command.detail;
        link.append(title, detail); link.addEventListener('click', () => dialog.close()); results.append(link);
      });
    }
    function openPalette() {
      if (!dialog || dialog.open) return;
      renderCommands(input.value);
      dialog.showModal();
      requestAnimationFrame(() => input.focus());
    }
    if (dialog && input && results) {
      renderCommands();
      trigger?.addEventListener('click', openPalette);
      input.addEventListener('input', () => renderCommands(input.value));
      dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
      document.addEventListener('keydown', event => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openPalette(); }
        if (event.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName || '')) { event.preventDefault(); openPalette(); }
      });
      window.addEventListener('hashchange', () => dialog.close());
    }

    const preview = document.querySelector('.system-preview__canvas');
    const previewToggle = document.getElementById('preview_theme_toggle');
    previewToggle?.addEventListener('click', () => {
      const dark = preview.dataset.previewTheme !== 'dark';
      preview.dataset.previewTheme = dark ? 'dark' : 'light';
      previewToggle.setAttribute('aria-pressed', String(dark));
      previewToggle.textContent = dark ? 'Switch to light' : 'Switch to dark';
    });
    const feedback = document.getElementById('preview_feedback');
    document.querySelector('.preview-primary')?.addEventListener('click', event => {
      const button = event.currentTarget;
      const created = button.dataset.created !== 'true';
      button.dataset.created = String(created);
      button.innerHTML = created ? 'Project created <span class="material-icons" aria-hidden="true">check</span>' : 'Create project <span class="material-icons" aria-hidden="true">north_east</span>';
      if (feedback) { feedback.hidden = false; feedback.textContent = created ? 'Saved with the shared design tokens.' : 'Preview reset.'; }
    });
    document.querySelector('.preview-secondary')?.addEventListener('click', () => {
      if (feedback) { feedback.hidden = false; feedback.textContent = 'This component uses the same color, spacing and focus tokens as the rest of the system.'; }
    });

    if (reducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.portfolio-section, .portfolio-facts, .portfolio-footer').forEach(element => element.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { root, threshold: .12, rootMargin: '0px 0px -30px 0px' });
      document.querySelectorAll('.portfolio-section, .portfolio-facts, .portfolio-footer').forEach((element, index) => {
        element.classList.add('portfolio-reveal'); element.dataset.delay = String(index % 4); observer.observe(element);
      });
    }

    const navLinks = [...document.querySelectorAll('.portfolio-nav a[href^="#"]')];
    const tracked = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window && root && tracked.length) {
      const spy = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) navLinks.forEach(link => link.toggleAttribute('aria-current', link.getAttribute('href') === `#${entry.target.id}`));
      }), { root, rootMargin: '-15% 0px -70% 0px' });
      tracked.forEach(section => spy.observe(section));
    }
  });
})();
