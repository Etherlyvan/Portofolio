const contact = document.querySelector<HTMLElement>('.contact-persona');

if (contact && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    contact.classList.add('contact-persona--entered');
    observer.disconnect();
  }, { threshold: .15 });

  observer.observe(contact);
}
