# Frame by Frame — portfolio

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

Subtle scroll parallax on the hero media; a slow typography ticker; a supplementary play cursor on fine-pointer devices; rotating photo previews that pause on hover, focus, hidden-page state, and reduced motion; category filters with accessible pressed state and live result counts; keyboard-operable native video dialogs with Escape dismissal and focus restoration; next-project browsing; direct project links; load-all behavior; a persistent manual motion switch.

The native pointer remains available. Videos never autoplay and load only after a project is opened. Video playback pauses on dialog close and when the browser tab is hidden. Reduced-motion preferences remove decorative motion and disable the motion switch so it cannot override the system preference.

## Media and privacy

Sample videos and photos are included locally for a dependable preview. Videos have `preload="none"`; the 16 MB media library is not downloaded on initial page load. Photos use fixed dimensions and below-the-fold lazy loading. Google Fonts is the only remote runtime dependency; system fonts serve as fallbacks. No analytics, contact form service, account system, or tracking code is included. Local storage remembers only the manual motion preference.

See `CREDITS.md` for third-party media attribution. The actual creator’s work has not been supplied; **no sample in this preview is represented as their work**.

## Verification and limitations

See `VERIFICATION.md` for checks actually performed. Public GitHub deployment is verified only when a successful live URL is recorded there. Manual motion-off was browser-tested; the system reduced-motion path is implemented and source-reviewed, but no full screen reader audit or OS preference emulation was performed. Placeholder films do not yet have authored caption/transcript tracks, so this preview is not a claim of full WCAG conformance.
