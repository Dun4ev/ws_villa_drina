# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Confirmed visual refinement, 2026-09-22

The user wants a little more luxury through restrained effects. Preserve the current typography, colors and layout. Use the 21st.dev Blur Fade pattern sparingly: once-only entrances, a subtle hero settle and quiet image/button hover feedback. Respect reduced motion, never hide content permanently, and do not replay on language change or scrolling back.

Mobile menu refinement: the user supplied a curved-menu reference. Adapt its sliding curved edge and staggered links to the existing cream/green typography. Preserve native dialog focus containment, Escape, scroll lock, section navigation and reduced motion; no Next.js/Tailwind migration is needed.

Confirmed header: keep transparency at the top and fix navigation while scrolling. After scrolling, shrink from 106 to 53 px (mobile 85 to 48 px to preserve touch targets), with restrained dark translucent glass and backdrop blur. Do not replace it with opaque cream.

## Second property, 2026-09-22

User approved the Idila mock in `../references/idila-tara/concept-v1.png` and requested implementation as a separate `/idila/` page with reciprocal links in both top menus. Preserve Drina styling; Idila uses its own cream/charcoal/rust identity and real Tara.rs photos. Preserve SR/EN across property links.

## Idila refinement, 2026-09-22

User requested the same shrinking glass header and restrained effects as Drina: fixed 106/53 px desktop, 85/48 px mobile; once-only reveals, quiet photo/button hover, curved animated mobile menu, reduced-motion support. Preserve cream/rust identity while harmonizing section widths, spacing and image proportions. User explicitly requested removing TARA.RS logos from working photo copies; preserve originals and record edited asset provenance.
