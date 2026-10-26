# Verification — 26 October 2026

## Completed

- JavaScript syntax checks passed for `dist/app.js` and `dist/content.js` using Node.
- The static HTTP server returned HTTP 200 for the entry page.
- Local asset references in the HTML and content manifest were checked; all referenced files exist.
- Browser inspection confirmed category results: SaaS 2, CGI 6, AI 8, Explainer 2, Motion Graphics 5, Promotional Ads 6. Initial All work view: 6 of 29; load-all: 29 of 29.
- Opened project dialogs with mouse and keyboard Enter. Next preview changed the project. Escape closed the dialog, paused playback, and returned focus to the originating project button.
- Native video playback started successfully for the packaged Sintel sample (readyState 4; playing true). The flower source was separately checked and opens locally in its project dialog.
- Direct `#project/cgi-01` navigation survived a browser reload and reopened the dialog.
- Manual motion-off produced no ticker animation and no hero transform in computed browser styles. The native cursor is never hidden by the implementation.
- Responsive layouts were rendered in 360, 430, 768, and 1440 px iframe viewports. Effective content widths were 345, 415, 753, and 1425 px after browser scrollbar space. No horizontal document overflow was detected; mobile uses one project column, tablet and desktop use two.
- Browser QA loaded the site under `/outputs/portfolio/dist/`, confirming local resources and gallery controls work under a nested base path, as required for GitHub project sites.
- All six remote source photographs initially loaded; photos were subsequently packaged locally. Local hero and gallery photos were inspected in-browser.
- No browser console errors were reported for the local final preview tab during the final error check.
- Site output contains approximately 39 KB of HTML/CSS/JS/SVG and 18 MB total including demo photos and three videos. Video preload is disabled, and below-the-fold images load lazily.

## Limits

- System reduced-motion behavior is implemented through CSS and matchMedia and was source-reviewed. No OS setting emulation, screen reader audit, automated accessibility audit, Lighthouse run, or live mobile device test was performed.
- Placeholder films do not include authored caption/transcript tracks. Add appropriate accessible media alternatives with the creator’s real project content before a full accessibility claim.
- Initial unavailable Google sample links were replaced with packaged, attributed Blender trailers; those broken links are absent from the final site.
- The site was deployed on GitHub Pages and opened at https://asishj1.github.io/portfolio/. First deployment: https://github.com/Asishj1/portfolio/actions/runs/40228613120 (success).
- Live browser checks confirmed CGI filtering, project dialog opening, and native playback of `assets/sintel-trailer.mp4` (playing true; readyState 4). Hero image loaded and the live page had no horizontal overflow or console errors. Hero parallax produced a nonzero computed transform during scrolling.
- A public repository clone was compared against all 20 local source and media files: every file matched exactly at the initial deployment.
- The initial workflow emitted a Node runtime deprecation warning. It was updated to supported official action releases and a stable Ubuntu 24.04 runner; final run https://github.com/Asishj1/portfolio/actions/runs/40228784275 succeeded in 1m 26s using commit `fa5eb389616405cbcdce3138ff2c759c03dede00`.

## Content status

All 29 project slots are demonstrations. Working identity, demo titles, and artwork are illustrative; no original work, client claims, awards, biography facts, or contact details have been invented or attributed to the creator. Verified project media, creator name, contact email, and social links remain to be supplied for a personalized public portfolio.


## Motion and glass update — 26 October 2026

- Added pronounced hero image parallax (up to 140 px), independently moving hero typography, opposite gallery-column drift, image depth inside cards, section entrance animations, and scroll-driven approach graphic rotation.
- Replaced the faint SVG texture with an included 192 × 192 px seeded noise texture, animated in small stepped offsets.
- Added fixed glass navigation with five progressively masked backdrop blur layers (3, 8, 16, 24, and 36 px), plus glass surfaces on controls and the approach panel.
- Browser reads confirmed the hero image reached a 140 px transform, adjacent gallery cards drifted in opposite directions, the approach star rotated with scrolling, and the header remained fixed at 14 px from the viewport top.
- Browser checks at 360, 430, 768, and 1440 px iframe widths found no document overflow, and all heading lines fit. An initial overflow from the angled ticker was fixed with a clipping wrapper before publication.
- Manual motion-off removed all scene style overrides, revealed pending content, and stopped the grain animation. JavaScript syntax checks and local browser console checks passed. System reduced motion remains implemented through CSS and matchMedia.
- All portfolio content remains clearly labeled demonstration material.

Publication status for the motion/glass update: local implementation complete; browser upload approval for GitHub was declined before any updated asset upload. The existing live URL therefore still serves the previous design. No publication workaround was attempted.


## Dark default / hover depth update — 26 October 2026

- Browser confirmed default theme `dark`, body background rgb(16,20,16), dark browser theme-color, and an accessible “Switch to light mode” header button.
- Switching to light produced rgb(237,238,230); reloading preserved light; switching back restored dark.
- Keyboard focus on the reel settled at foreground text scale 1.12, background scale 1, and a 2 px blur, compared with a background rest scale of 1.08. Fine-pointer hover uses the same effect.
- Scroll transforms independently moved the hero image by -52.6 px and text by +43.2 px at the sampled position.
- Responsive reports at 360,430,768,1440 px iframe widths found no horizontal overflow; all hero heading lines fit with the new theme control.
- Both manual motion-off and reduced-motion CSS preserve readable content and disable additional scale motion. Publication status remains local-only pending GitHub upload approval.


## Anchored foreground update — 26 October 2026

- Removed scroll-driven title transforms, heading shifts, gallery-card drift, and foreground offsets; image-only parallax is retained.
- Browser measurements after refreshed asset loading found the reel title center aligned exactly with the frame center (0 px offset), no inline title transform, and no gallery text transform. Image transforms continued changing with scroll.
- Glass title panel and its text now share a parent hover/focus scale; inner text has no separate zoom. The SaaS demo panel follows the same unified behavior.
- JavaScript syntax check passed. Updated local preview only; GitHub publishing remains pending upload approval.


## Directional blur and logo containment — 26 October 2026

- In-browser inspection confirmed all five directional SVG filters are applied to the backdrop. Visual inspection while the main heading passed behind the bar showed vertical streaks, with sharp navigation text above them.
- The logo bounding box was fully inside the header: header top14/bottom92 px, logo top29/bottom77 px, leaving 15 px vertical clearance on each side.
- The earlier italic text mark was replaced by an explicitly bounded SVG monogram to eliminate glyph overhang. Updated local assets have a new cache version.
- These changes remain in the local preview; publishing is still pending GitHub upload approval.


## Clear lens glass and centered arrow — 26 October 2026

- Browser measurement found exactly 0 px horizontal and vertical difference between the arrow SVG center and its circular button center.
- Main glass surfaces have no central backdrop blur; a masked pseudo-element applies the appropriate lens displacement filter only around the perimeter.
- Dark and light themes were checked; no document overflow was observed. Browser error log was empty in the final preview.
- Refraction was visually inspected over the hero photograph. The demo interface uses a clear highlighted surface without a backdrop displacement effect to avoid sampling beyond its clipped frame.
- The update remains local; no GitHub publication was attempted.


## Corrected glass scope and chromatic navigation — 26 October 2026

- Browser verified header lens pseudo-element is disabled, directional smear layers are visible, and the vertical-pull backdrop filters are applied.
- Red/blue backdrop channels have opposing 0.25 px horizontal and 0.08 px vertical offsets per layer; the foreground navigation is not color-split.
- Media text panel uses the softened lens-panel filter with 3 px blur; play controls use lens-round with 4 px blur. Displacement strengths were reduced from 25 to 12 for panels and 20 to 8 for round controls.
- Browser screenshot was inspected with the heading passing beneath the bar. JavaScript syntax passed. The centered arrow and anchored foreground text are retained.
- This remains a local preview update, without an attempted GitHub upload.


## Approach section flaw audit and repair — 26 October 2026

- Root cause: the copy panel lacked `position: relative`, so its absolute glass pseudo-element used the entire positioned grid as its containing block and blurred the illustration. The panel now contains and clips its own backdrop layer; its foreground children are above it.
- Replaced the composited font asterisk and scaled div ellipses with a proportional SVG diagram, without a filter or glow. Rotation is retained without animated scaling.
- At the reported 1714 × 1254 viewport, both panels measured 520 px tall and the SVG had `filter: none`.
- Real browser viewport checks at 1280,900,768,760,390,and360 px showed no document or text-panel horizontal overflow. Panels were equal height in the two-column layout, then stacked at 760 px and below.
- JavaScript syntax passed, and the browser error log was empty. Temporary viewport overrides were reset after testing.
- Local update only; GitHub upload remains pending.


## Chromatic visibility correction — 26 October 2026

- Confirmed that previous RGB separation was only 0.25 px per smear layer and was too easily softened by the layered filters.
- Moved color separation to a dedicated final `header-chroma` layer after the directional blur layers; red/blue horizontal offsets are +1.8/-1.8 px.
- Browser confirmed six backdrop layers and the final `url(#header-chromatic)` filter. Inspected the large heading passing beneath the bar, with the foreground logo/navigation remaining sharp.
- This edit is local; no GitHub upload was attempted.


## Latest release published — 26 October 2026

- All preceding local-only revisions are now published at https://asishj1.github.io/portfolio/.
- Deployment commit: 871e67f828450d7504fca5f537eedd21893b2834. Successful workflow: https://github.com/Asishj1/portfolio/actions/runs/40286115190.
- All production files match the public repository byte for byte.
- Public browser verified the chroma2 stylesheet, dedicated header chromatic layer, default dark theme, and no broken loaded images. Screenshot saved as portfolio-live-latest.png.
