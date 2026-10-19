const career = document.querySelector<HTMLElement>('.experience-persona');

if (career) {
  const list = career.querySelector<HTMLElement>('[role="tablist"]');
  const stage = career.querySelector<HTMLElement>('[data-career-stage]');
  const tabs = Array.from(career.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(career.querySelectorAll<HTMLElement>('[data-career-panel]'));
  const visuals = Array.from(career.querySelectorAll<HTMLElement>('[data-career-visual]'));
  const transitionLabel = career.querySelector<HTMLElement>('[data-career-transition-label]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const timers: number[] = [];
  let activeIndex = 0;

  const clearTimers = () => {
    while (timers.length) window.clearTimeout(timers.pop());
  };

  const later = (callback: () => void, delay: number) => {
    timers.push(window.setTimeout(callback, delay));
  };

  const syncTabs = (index: number) => {
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (!selected) tab.classList.remove('is-activating');
    });
  };

  const settle = (index: number) => {
    clearTimers();
    activeIndex = index;
    career.classList.remove('is-switching');
    stage?.classList.remove('is-switching');
    syncTabs(index);

    panels.forEach((panel, panelIndex) => {
      panel.hidden = panelIndex !== index;
      delete panel.dataset.state;
    });

    visuals.forEach((visual, visualIndex) => {
      const selected = visualIndex === index;
      visual.dataset.state = selected ? 'active' : 'idle';
      visual.setAttribute('aria-hidden', String(!selected));
    });

    const theme = visuals[index]?.dataset.theme;
    if (stage && theme) stage.dataset.theme = theme;
  };

  const pulseActiveTab = (index: number) => {
    const tab = tabs[index];
    if (!tab || reducedMotion.matches) return;
    tab.classList.remove('is-activating');
    requestAnimationFrame(() => tab.classList.add('is-activating'));
    later(() => tab.classList.remove('is-activating'), 340);
  };

  const select = (index: number) => {
    if (!tabs[index] || !panels[index] || !visuals[index]) return;
    if (index === activeIndex && !career.classList.contains('is-switching')) {
      pulseActiveTab(index);
      return;
    }

    if (reducedMotion.matches) {
      settle(index);
      return;
    }

    const previousIndex = activeIndex;
    settle(previousIndex);
    activeIndex = index;
    syncTabs(index);
    if (transitionLabel) transitionLabel.textContent = tabs[index].querySelector('strong')?.textContent ?? '';
    career.classList.add('is-switching');
    stage?.classList.add('is-switching');
    tabs[index].classList.add('is-activating');
    panels[previousIndex].dataset.state = 'leaving';
    visuals[previousIndex].dataset.state = 'leaving';
    visuals[previousIndex].setAttribute('aria-hidden', 'true');

    later(() => {
      panels[previousIndex].hidden = true;
      delete panels[previousIndex].dataset.state;
      panels[index].hidden = false;
      panels[index].dataset.state = 'entering';
    }, 115);

    later(() => {
      const theme = visuals[index].dataset.theme;
      if (stage && theme) stage.dataset.theme = theme;
      visuals[previousIndex].dataset.state = 'idle';
      visuals[index].dataset.state = 'entering';
      visuals[index].setAttribute('aria-hidden', 'false');
    }, 145);

    later(() => settle(index), 680);
  };

  tabs.forEach((tab, index) => tab.addEventListener('click', () => select(index)));

  list?.addEventListener('keydown', (event) => {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0) return;
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? tabs.length - 1
        : (current + (event.key === 'ArrowUp' ? -1 : 1) + tabs.length) % tabs.length;
    select(next);
    tabs[next].focus({ preventScroll: true });
  });

  reducedMotion.addEventListener('change', () => settle(activeIndex));
  if (list) list.hidden = false;
  settle(0);
}
