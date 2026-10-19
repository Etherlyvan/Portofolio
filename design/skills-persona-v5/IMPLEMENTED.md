# Implemented Skills Persona v5

Skills.astro now uses its own skills-persona classes. Other section styling remains independent. The character is a transparent image with CSS outline; red burst is native SVG. Fifteen tiles use existing local SVG icons, native buttons and aria-pressed. Factual descriptions live in data/skills.ts.

Category filtering sends skills:filtered to the selection module. Selection is retained when visible, otherwise the first visible item is selected. Arrow/Home/End navigation acts only on visible tiles. React is the initial choice. No-JS renders every skill and the initial detail. Motion respects reduced-motion.

Generated asset: public/images/skills-persona/jovan-cutout.webp. Built-in image_gen prompt and original source are in cutout-prompt.json. Existing manga photos were not replaced.

Checks: Astro check (0 errors/warnings), build; 320/375/768/1024/1440/1920 filter/selection/keyboard/no-overflow checks; no-JS; 375/1440 adjacent-section seam and reduced-motion checks. Screenshots implemented-*.png are rendered Astro output, not mockups.
