const root = document.documentElement;
const hero = document.querySelector<HTMLElement>('[data-hero-motion]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const showFinalFrame = () => {
  hero?.classList.add('hero-motion--entered', 'hero-motion--settled');
  root.classList.remove('hero-motion-enabled');
};

if (!hero || reducedMotion.matches) {
  showFinalFrame();
} else {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero.classList.add('hero-motion--entered'));
  });

  window.setTimeout(showFinalFrame, 1900);
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) showFinalFrame();
  }, { once: true });
}
