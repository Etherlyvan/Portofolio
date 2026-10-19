# Hero motion implementation

The Astro hero now follows the approved Persona-style storyboard while keeping the original final composition and photos.

- `0–500ms`: red slash wipe, ink background, paper tear, and side manga panels
- `280–820ms`: greeting and staggered name cards
- `570–1170ms`: red portrait and main character impact reveal
- `910–1430ms`: role, description, buttons, location tags, and perspective note
- `1430–1900ms`: final frame settles to the normal responsive layout

The sequence is disabled for `prefers-reduced-motion`, restores the final frame after browser back/forward cache navigation, and has a timeout fallback so content cannot remain hidden.
