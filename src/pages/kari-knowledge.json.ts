import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { skills } from '../data/skills';
import { links } from '../config/assets';
import { getKariSiteId } from '../config/kari';

/** Reviewed public fields only. Never crawl/import personal pages or whole source files. */
export const GET: APIRoute = async ({ site }) => {
  const content = {
    schemaVersion: 1,
    siteId: getKariSiteId(import.meta.env.KARI_SITE_ID),
    sourceOrigin: site?.origin ?? 'http://localhost:8080',
    chunks: [
      { id: 'profile', href: '/#about', text: 'Jovan Prabowo Kuncoro is a software engineer in Jakarta, Indonesia, with experience in full-stack development, ERP systems, and AI-powered applications.' },
      { id: 'contact', href: '/#contact', text: `Public contact: jovanku1@gmail.com. GitHub: ${links.github}. CV available on request; no downloadable CV is published.` },
      ...projects.map(({ slug, name, description, technologies }) => ({ id: `project-${slug}`, href: '/#projects', text: `${name}: ${description} Technologies: ${technologies.join(', ')}.` })),
      ...experience.map(({ company, role, date, points }, index) => ({ id: `experience-${index}`, href: '/#experience', text: `${company} — ${role} (${date}). ${points.join(' ')}` })),
      ...skills.map(({ id, name, description }) => ({ id: `skill-${id}`, href: '/#skills', text: `${name}: ${description}` })),
    ],
  };
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(content)));
  const version = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  return new Response(JSON.stringify({ ...content, contentVersion: version }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
  });
};
