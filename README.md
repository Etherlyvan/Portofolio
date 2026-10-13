# Jovan Prabowo Kuncoro — Comic Portfolio

A fully static Astro portfolio inspired by the supplied black, white, and red manga reference. No React, hydration, remote images, font requests, analytics, or animation libraries. Decorative art is inline SVG and CSS. The only runtime dependency is Astro; Astro Check and TypeScript are development dependencies.

## Requirements

- Node.js 22.12+ (Node 24 LTS recommended) and npm.
- Docker Engine / Docker Desktop with Compose for container deployment.

## Local development

```sh
npm install
npm run dev
```

Open the URL printed by Astro (normally http://127.0.0.1:4321).

## Check and production build

```sh
npm run check
npm run build
npm run preview
```

`dist/` contains the complete website, including `/blog/` and a 404 page. `npm run preview` is a development verification tool. Production uses Nginx, with no Node process.

Set `SITE_URL` to your final public origin **before building** to generate correct canonical and Open Graph URLs. The default is `http://localhost:8080`. On PowerShell:

```powershell
$env:SITE_URL = 'https://your-domain.example'
npm run build
```

No social preview image is generated. Open Graph and Twitter title/description metadata are included.

## Docker deployment

```sh
docker build --build-arg SITE_URL=https://your-domain.example -t jovan-portfolio .
docker run --name jovan-portfolio -p 8080:80 -d jovan-portfolio
```

The build stage installs locked dependencies, runs type checks, and produces static files. The final Nginx Alpine image contains only Nginx and the static output. It includes gzip, cache headers for assets, security headers, and a health check.

## Compose deployment

```sh
docker compose up --build -d
docker compose ps
docker compose exec portfolio nginx -t
```

Open http://localhost:8080. To use your public origin, copy `.env.example` to `.env` and set `SITE_URL` before building. Compose uses the value as a build argument. If 8080 is occupied, set `PORTFOLIO_PORT=8088` (or another free port) in `.env`. Stop with `docker compose down`.

## Project structure

```text
src/components/layout/   Navigation and footer
src/components/sections/ Hero, About, Experience, Projects, Skills, Gallery, Contact
src/components/comic/    Torn dividers, labels, bursts, manga panels, photo frames
src/components/ui/       Asset-aware images, placeholders, buttons
src/config/assets.ts    All image paths, CV, and personal profile links
src/data/               Project, experience, skill, gallery content
src/layouts/            Shared document and metadata
src/pages/              Home, blog landing, 404
src/styles/             Global, comic, and reduced-motion styles
src/scripts/            Small progressive enhancements
public/images/          Add your final local images here
```

## Replace images

The portfolio now includes 17 generated manga-style WebP image placeholders under `public/images/`. Replace a file with your photo using the same name; no configuration or section component changes are needed. If using a different name/format, update its path in `src/config/assets.ts`. See [IMAGE_REPLACEMENT_GUIDE.md](IMAGE_REPLACEMENT_GUIDE.md). Downloadable local bundle: `placeholder-images.zip`. The asset manifest `PLACEHOLDER_ASSETS.json` records dimensions, generation provenance, and complete prompts. All initial images are fictional/conceptual artwork, not personal photographs or actual project screenshots.

## Edit content

- Projects: edit `src/data/projects.ts`. Categories are `web`, `ai`, `business`, and `3d`; projects may have several. Add a matching asset key if adding a new project.
- Experience: edit `src/data/experience.ts`. Each entry has company, role, date, and bullet points.
- Skills: edit `src/data/skills.ts`. Categories are `frontend`, `backend`, `ai`, `tools`, and `other`; each entry has a name, category, text mark, and color.
- Gallery: edit captions in `src/data/gallery.ts`; add matching paths to `assets.gallery`. Keep the arrays the same length. The horizontal strip supports touch, keyboard arrows, previous/next buttons, and pagination.
- CV/socials: set the verified URLs in `links` in `src/config/assets.ts`. Add your CV under `public/` and use `/jovan-cv.pdf`. Until supplied, the CV button is disabled and social links are labeled coming soon.
- Blog: the requested navigation points to an honest empty blog landing. Add articles as Astro pages when you have content.

## Accessibility and performance

Content and navigation work without JavaScript. Filters show all items without JavaScript; the gallery remains natively scrollable. Enhancements activate only after the script loads. Keyboard focus, a skip link, semantic landmarks, pressed states, filter announcements, and reduced-motion support are included. Image frames reserve space; real images below the hero use lazy loading.

Lighthouse performance >95 is a target, not a guaranteed score. Measure the production page after replacing assets and setting up hosting. Keep images compressed and avoid third-party scripts.
