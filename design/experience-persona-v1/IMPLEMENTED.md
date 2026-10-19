# Experience Persona — Astro implementation

Experience.astro replaces the timeline section inside AboutExperience.astro. Styling is scoped in experience-persona.css. Work history data and dates remain in data/experience.ts.

Four native tabs switch the detail panels: RAHO Premier, Sekawan Media, Genbatik, and Batikpedia. Batikpedia uses the Full-Stack Project description from the updated CV, including the Next.js/TypeScript/Prisma application and Three.js/WebGL museum gallery. Arrow Up/Down and Home/End activate and focus the relevant tab. A single selected tab has tabindex=0. Without JavaScript, tab controls stay hidden and all four panels remain visible. Selection motion respects prefers-reduced-motion.

Character: public/images/experience-persona/jovan-cutout.webp, created using built-in image_gen background extraction from concert-panel-v2.webp. Prompt and source are in cutout-prompt.json. White outline is CSS drop-shadow; burst artwork is inline SVG; paper menus/details are live HTML/CSS, not the concept bitmap.

About retains the beach cafe photo. Existing boundaries retain one ComicSeam each. Screenshots implemented-*.png show the original output; with-batikpedia-*.png show the four-item version. Checks: Astro check with no errors/warnings, build, Batikpedia tab/keyboard/overflow at 320/375/768/1024/1440/1920px.
