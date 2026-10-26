# Frame by Frame — portfolio

**Live site:** https://asishj1.github.io/portfolio/  
**Repository:** https://github.com/Asishj1/portfolio

A complete static video editing and motion portfolio, designed for GitHub Pages. Working identity: **Frame by Frame**. The creator’s actual name and contact details have not been supplied.

## Preview

From this directory run `python3 -m http.server 4173 --directory dist`, then open `http://localhost:4173`.

There is no installation, compilation, framework, or server application required. `dist/` is the complete production website.

## Publish on GitHub Pages

1. Put the contents of this folder in a new GitHub repository, keeping `.github/workflows/pages.yml` and `dist/` at its root. Use the `main` branch.
2. In the repository’s **Settings → Pages**, choose **GitHub Actions** as the source.
3. Push to `main`, or run **Deploy portfolio to GitHub Pages** from Actions.
4. Open the deployment URL from the successful workflow run. Test the actual public site before announcing it.

The workflow uploads `dist/` directly and uses official Pages actions with read-only repository access and deployment permissions scoped to the deployment job. No secrets are needed. Documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

All local assets use relative paths. Project details use hashes such as `#project/cgi-01`, so refreshes and direct links work without server rewrites, including under a repository subpath.

## Replace the demo content

- `dist/content.js`: central category, sample media, featured layout, and contact manifest.
- Set `email` to the verified public contact email to activate the contact button.
- Replace the working identity in `dist/index.html`, its title/description, and the favicon with your own branding.
- Add real project media in `dist/assets/` and reference it using `./assets/filename.mp4`.
- The six featured entries currently act as **demo templates**. The script generates the remaining category slots from those templates. To launch a real portfolio, replace that demo generation block in `dist/app.js` with your verified project array and update the displayed demo labels, counts, descriptions, credits, and metadata accordingly. Do not remove demo disclosure until the samples have been replaced.
- Add real project descriptions, credits, poster frames, accessible video captions/transcripts, and verified social links. No social accounts, testimonials, employers, or client claims have been invented.

Planned portfolio: SaaS 2; CGI 6; AI 8; Explainer 2; Motion Graphics 5; Promotional Ads 6. Total: 29. These are **planned content slots**, not 29 verified finished case studies. The initial gallery shows one demo per category; filters show all slots in their category.

## Interaction design

Pronounced multilayer scroll parallax on the hero image and typography, independent gallery-image drift and staggered card entrances, scroll-driven rotation in the dark glass approach section, animated visible film grain, and a fixed glass navigation bar with five graduated backdrop-blur layers; a slow typography ticker; a supplementary play cursor on fine-pointer devices; rotating photo previews that pause on hover, focus, hidden-page state, and reduced motion; category filters with accessible pressed state and live result counts; keyboard-operable native video dialogs with Escape dismissal and focus restoration; next-project browsing; direct project links; load-all behavior; a persistent manual motion switch.

The native pointer remains available. Videos never autoplay and load only after a project is opened. Video playback pauses on dialog close and when the browser tab is hidden. Reduced-motion preferences remove decorative motion and disable the motion switch so it cannot override the system preference.

## Media and privacy

Sample videos and photos are included locally for a dependable preview. Videos have `preload="none"`; the 16 MB media library is not downloaded on initial page load. Photos use fixed dimensions and below-the-fold lazy loading. Google Fonts is the only remote runtime dependency; system fonts serve as fallbacks. No analytics, contact form service, account system, or tracking code is included. Local storage remembers only the manual motion preference.

See `CREDITS.md` for third-party media attribution. The actual creator’s work has not been supplied; **no sample in this preview is represented as their work**.

## Verification and limitations

See `VERIFICATION.md` for checks actually performed. Public GitHub deployment is verified only when a successful live URL is recorded there. Manual motion-off was browser-tested; the system reduced-motion path is implemented and source-reviewed, but no full screen reader audit or OS preference emulation was performed. Placeholder films do not yet have authored caption/transcript tracks, so this preview is not a claim of full WCAG conformance.


## Dark theme and depth update

Dark mode is the default. The header’s accessible light/dark toggle saves a preference in `portfolio-theme` local storage. A small pre-style initialization avoids a light flash on first render.

Hero imagery and titles now travel farther in opposite directions during scrolling. Gallery image and type layers also use opposing offsets. On fine-pointer hover (and keyboard focus), text enlarges while the image zooms out and receives a soft blur. Scroll transforms and hover scale use separate properties, so they compose. Reduced motion and the manual motion-off control disable these extra animations.

This updated version is available locally; GitHub publishing remains pending the previously declined browser upload approval.


## Anchored foreground refinement

Scroll parallax now applies only to the photographs inside project frames. Removed continuous heading shifts, card drift, and foreground text offsets. Reel text stays vertically centered in its frame; the glass panel and its text scale together on hover or keyboard focus. The SaaS demo panel also scales as one unit. Section entrances and decorative approach graphic motion are retained. Asset version parameters prevent older preview scripts from masking updates.


## Directional navigation optics

The fixed bar now uses anisotropic SVG backdrop filters: horizontal blur is limited to 0.35 px while vertical blur increases through 5,10,18,27,and38 px with upward offsets. This creates a vertical pull instead of an evenly frosted blur. Navigation content is a separate sharp layer. The monogram is a bounded SVG with explicit desktop/mobile dimensions and centered header alignment.


## Clear lens glass and arrow alignment

The newest glass treatment uses clear centers and edge-only refraction rather than a full frosted surface. Locally generated displacement maps drive panel, wide, and circular SVG lens filters; an excluded center mask confines the effect to the rim. Navigation, reel labels, and controls stay sharp. Centered inline SVGs replace the font-based down-right arrow and reel play symbol.


## Current glass direction: soft liquid controls, smeared navigation

The top navigation has been restored to vertical smearing, with subtle red/blue channel offsets in its backdrop filters. It does not use lens-edge distortion. Logo and navigation text remain on an unfiltered foreground layer. Liquid-glass styling is reserved for media play buttons and text panels: softened edge refraction, 2–4 px frosting, gentle translucent tint, and fine edge highlights. The earlier fully clear, strongly warped-rim treatment has been superseded.


## Responsive approach section repair

The approach copy panel now establishes its own positioned containing block, preventing its optical pseudo-element from covering the neighboring illustration. The diagram uses SVG paths and ellipses in a fixed viewBox with proportional sizing and rotation only; the previous font glyph, glow, and scale transform were removed. Columns stretch to matching heights above 760 px and stack below that breakpoint. Card content, labels, and illustration dimensions adapt to the available width.


## Chromatic visibility correction

Chromatic separation now has its own final backdrop layer after the five vertical smear layers. Opposing red/blue offsets of 1.8 px remain visible instead of being softened by subsequent blur. Navigation and logo remain above the filtered backdrop. The earlier per-layer 0.25 px color offsets were removed.


## Current published release — 26 October 2026

All visual revisions described above are now live at https://asishj1.github.io/portfolio/, including the restored header chromatic aberration and responsive approach panel fix. Earlier local-only notes describe their status at the time of each revision. GitHub Pages deployment 40286115190 succeeded.
