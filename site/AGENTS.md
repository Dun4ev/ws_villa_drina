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

## Demonstration mode, 2026-09-28

User requested keeping both property pages as a demonstration and removing the owners' phone numbers and email addresses. Keep those contacts out of rendered pages and client assets. Idila inquiry links lead to the gallery; both pages identify the website as an unofficial demonstration.

User also requested removing all Booking links. Gallery links replace Booking buttons in the header, hero, bottom section and mobile navigation; the linked Booking rating and dialog link are removed.

User also requested removing Instagram links. The demo dialog contains only the demonstration notice; no owner contact, social or booking links are exposed.


## Portfolio concepts, 2026-10-08

User requested removing real addresses, phone numbers and accounts and retaining the project for their portfolio, with fictional names. Use Vila Mirava and Vila Borika in visible text and metadata. Preserve the existing design, SR/EN, galleries, photo originals and legacy `/idila/` route. No owner channels, exact locations, map or video links in client content. Identify this as a self-initiated portfolio concept, not a client commission. Names are fictional; existing photos are reference material and do not make the project fully anonymous. Photo provenance remains in documentation. Publishing requires explicit authorization.

## Generated portfolio imagery, 2026-10-18

User requested replacing all real photos with newly generated images while retaining a broadly similar house type and concept. Mirava remains a riverside villa with a pool; Borika remains a timber mountain chalet. Preserve the existing visual system and functionality. All client photos must come from `public/images/mirava/` or `public/images/borika/` and be recorded in `asset-manifest.json`; prompts belong in `generated-assets-prompts.json`. Original and edited real-property photos are archived outside `public` at `../references/private-archive/public-images-2026-10-18/`. Do not copy archives, original photos or intermediate PNGs into the public artifact. The new floor plan is an independently authored illustrative SVG, not a real survey. Visible SR/EN text must describe fictional properties and AI-generated illustrative imagery. Preparation is authorized; external publication is a separate step. Keep the old Netlify demo private.

## Motion refinement, 2026-10-18

User requested using the animate skill to make both sites smoother and more pleasant. Preserve the current design, shrinking headers and curved menus. Implementation decisions: shared CSS motion tokens in `src/motion.css`; pointer drawers 280ms, dialogs 250ms, photo/button feedback 160ms, and 120ms opacity-only variants for reduced motion. Use transform/opacity for added motion, with CSS transitions that can retarget. Keyboard commands, Escape and keyboard photo navigation stay instantaneous. Gate hover movement to fine pointers with hover support. Scroll reveals run once, without animated blur; focus must never wait for a reveal. Keep the Borika mobile-menu close button within the viewport, including 320px widths. No motion-library dependency was added.

## Publication authorization, 2026-10-18

User explicitly authorized publishing the prepared Mirava/Borika source to GitHub and connecting Cloudflare Pages. Use the existing `Dun4ev/ws_villa_drina` repository and publish only `dist/client` from `site/`. Keep the previous Netlify demo private. Local reference archives and generated PNG intermediates are not part of the upload.
