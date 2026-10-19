const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('#primary-nav');
if (menu && nav) {
  menu.hidden = false;
  document.querySelector('.site-header')?.classList.add('menu-enabled');
  nav.inert = true;
  const menuLinks = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a'));
  const select = (link: HTMLAnchorElement) => {
    menuLinks.forEach(item => item.classList.toggle('is-selected', item === link));
    const chapter = nav.querySelector<HTMLElement>('.menu-chapter');
    if (chapter) chapter.textContent = link.dataset.menuSection?.toUpperCase() || '';
  };
  menuLinks.forEach(link => {
    link.addEventListener('pointerenter', () => select(link));
    link.addEventListener('focus', () => select(link));
  });
  const close = () => {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    nav.inert = true;
    document.documentElement.classList.remove('persona-menu-open');
    menu.focus();
  };
  menu.addEventListener('click', () => {
    if (menu.getAttribute('aria-expanded') === 'true') { close(); return; }
    menu.setAttribute('aria-expanded', 'true');
    nav.inert = false;
    nav.classList.add('is-open');
    document.documentElement.classList.add('persona-menu-open');
    (nav.querySelector<HTMLAnchorElement>('a[aria-current]') || menuLinks[0])?.focus({ preventScroll: true });
  });
  nav.addEventListener('click', event => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a');
    if (link) {
      nav.querySelectorAll('a').forEach(item => item.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'location');
      close();
    } else if (event.target === nav) close();
  });
  const activeSection = location.pathname.startsWith('/blog') ? 'blog' : location.hash.slice(1) || 'home';
  nav.querySelector(`[data-menu-section="${activeSection.replace(/[^a-z]/g, '')}"]`)?.setAttribute('aria-current', 'location');
  document.addEventListener('keydown', event => {
    if (menu.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const current = Math.max(0, menuLinks.indexOf(document.activeElement as HTMLAnchorElement));
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? menuLinks.length - 1 : (current + (event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 1) + menuLinks.length) % menuLinks.length;
      menuLinks[next]?.focus({ preventScroll: true });
      menuLinks[next]?.scrollIntoView({ block: 'nearest' });
    }
    if (event.key === 'Tab') {
      const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a'));
      const focusables: HTMLElement[] = [menu, ...links];
      const current = focusables.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && current <= 0) { event.preventDefault(); focusables.at(-1)?.focus(); }
      else if (!event.shiftKey && (current === focusables.length - 1 || current === -1)) { event.preventDefault(); menu.focus(); }
    }
  });
}
document.querySelectorAll<HTMLElement>('[data-filter-group]').forEach(group => {
  const projectGroup = group.dataset.filterGroup === 'projects';
  const items = Array.from(document.querySelectorAll<HTMLElement>(projectGroup ? '[data-project]' : '[data-skill]'));
  const status = document.querySelector(projectGroup ? '#project-status' : '#skill-status');
  const filter = (value: string) => {
    let count = 0;
    items.forEach(item => { const show = value === 'all' || item.dataset.category?.split(' ').includes(value); item.hidden = !show; if (show) count++; });
    group.querySelectorAll<HTMLButtonElement>('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
    if (status) status.textContent = `${count} ${projectGroup ? 'projects' : 'skills'} shown.`;
    if (!projectGroup) group.dispatchEvent(new CustomEvent('skills:filtered', { bubbles: true, detail: { category: value, count } }));
  };
  group.hidden = false;
  group.addEventListener('click', event => { const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]'); if (button?.dataset.filter) filter(button.dataset.filter); });
  if (projectGroup) { const reset = document.querySelector<HTMLButtonElement>('[data-reset-projects]'); if (reset) { reset.hidden = false; reset.addEventListener('click', () => filter('all')); } }
});
const track = document.querySelector<HTMLElement>('.gallery-track');
if (track) {
  const slides = Array.from(track.querySelectorAll<HTMLElement>('.gallery-item'));
  const dots = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-slide]'));
  const previous = document.querySelector<HTMLButtonElement>('.gallery-arrow.previous');
  const next = document.querySelector<HTMLButtonElement>('.gallery-arrow.next');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let requested = 0;
  const step = () => slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
  const max = () => Math.max(0, track.scrollWidth - track.clientWidth);
  const update = () => {
    current = Math.abs(track.scrollLeft - Math.min(max(), requested * step())) < 2
      ? requested
      : Math.min(slides.length - 1, Math.round(track.scrollLeft / step()));
    dots.forEach((dot, index) => dot.setAttribute('aria-pressed', String(index === current)));
    if (previous) previous.disabled = track.scrollLeft < 2;
    if (next) next.disabled = track.scrollLeft >= max() - 2;
  };
  const go = (index: number) => {
    requested = Math.min(slides.length - 1, Math.max(0, index));
    track.scrollTo({ left: Math.min(max(), requested * step()), behavior: reduced.matches ? 'instant' : 'smooth' });
    update();
  };
  [previous, next, document.querySelector<HTMLElement>('.gallery-dots')].forEach(control => { if (control) control.hidden = false; });
  previous?.addEventListener('click', () => go(current - 1));
  next?.addEventListener('click', () => go(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => go(index)));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  track.addEventListener('keydown', event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); go(current + (event.key === 'ArrowRight' ? 1 : -1)); } });
  update();
}
