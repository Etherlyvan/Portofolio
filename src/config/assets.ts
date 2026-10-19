type ImagePath = string | null;
export const assets = {
  hero: { person: '/images/hero-person-cinematic-cutout-v3.webp' as ImagePath, manga: '/images/hero-manga.webp' as ImagePath },
  about: { person: '/images/about-beach-v1.webp' as ImagePath },
  skills: { person: '/images/skills-persona/jovan-cutout.webp' },
  experience: { person: '/images/experience-persona/jovan-cutout.webp' },
  contact: { person: '/images/contact-concert-v1.webp' as ImagePath },
  persona: { coding: '/images/persona-v4/jovan-coding-v4.webp', batik: '/images/persona-v4/batik-ink-border.webp' },
  projects: { batikpedia: '/images/comic-v3/project-batikpedia.webp' as ImagePath, genbatik: '/images/comic-v3/project-genbatik.webp' as ImagePath, rahoErp: '/images/comic-v3/project-raho.webp' as ImagePath },
  gallery: Array.from({ length: 6 }, (_, index): ImagePath => index < 5 ? `/images/comic-v3/gallery-${String(index + 1).padStart(2, '0')}.webp` : '/images/gallery/gallery-06.webp'),
  manga: Array.from({ length: 4 }, (_, index): ImagePath => index === 0 ? '/images/manga/stadium-front-panel-v1.webp' : index === 2 ? '/images/manga/arms-crossed-panel-v1.webp' : index === 3 ? '/images/manga/concert-panel-v2.webp' : `/images/manga/manga-${String(index + 1).padStart(2, '0')}.webp`),
};
// Only add verified personal URLs. Null values render an honest unavailable state.
export const links = { cv: null as string | null, linkedin: null as string | null, github: 'https://github.com/Etherlyvan' as string | null, discord: null as string | null };

