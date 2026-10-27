# Dr. Ananya Mehra — portfolio design prototypes

One fictional doctor, one local JSON dataset, one set of features, and three independently art-directed portfolio proposals. The root route opens Demo 1. A small, persistent switcher above the portfolio navigation opens the other demos.

## Run locally

Requires Node.js 22 and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000. The site is static-export ready. To build it:

```sh
npm run lint
npm run typecheck
npm run build
npm run verify:export
```

The production export is written to `out/`. To preview the built files, run `npm run preview`. For a repository-path build, start preview with the same `NEXT_PUBLIC_BASE_PATH` value used for that build.

## Routes and structure

- `/` opens Demo 1.
- `/demo/1/`, `/demo/2/` and `/demo/3/` open the matching designs directly.
- All portfolio sections are available through working in-page navigation: About, Teaching, Books, Research, Achievements and Contact. The education and career timeline is part of About.

`app/page.tsx` serves Demo 1 directly. `app/demo/[design]/page.tsx` statically generates the other demos. `components/designs/` holds each art-directed home composition. Shared profile sections and YouTube/inquiry functionality live in `components/Sections.tsx`, `components/YouTubeLibrary.tsx` and `components/Inquiry.tsx`. `components/DemoSwitcher.tsx` is the single design selector. All three pass the same JSON-backed data to those components.

## Replace the fictional profile

Edit `data/doctor_portfolio_demo_data.json`, then rebuild. This file contains the supplied profile, biography, education, academic appointments, expertise, teaching series, selected videos, books, research, achievements, contact categories and FAQ. The `data/portfolio.ts` adapter exposes the public portfolio; sample inquiry records are excluded. The `data/types.ts` types are derived from the supplied schema.

The original portrait supplied with the prompt is kept at `public/images/doctor/ananya-mehra.png`; the site uses the transparent cutout at `public/images/doctor/ananya-mehra-cutout.png` to make it sit cleanly on all three art directions. Replace the `profileImage` and `heroImage` paths in the JSON for the eventual real doctor. The book covers and playlist thumbnails are drawn with local CSS, so missing remote images cannot break a demo.

## Add YouTube playlists and videos

The shared library includes a search bar in all three demos. It searches playlist/video titles, categories, descriptions, and playlist names across the site's local dataset. Selecting a result loads the matching playlist or video in the existing player, including results outside the currently selected playlist. Empty searches show guidance; the clear button restores the full library. This searches the curated site library, not the whole YouTube platform.

Demo 1 follows the supplied Lecturio reference with a pale green educator hero, navy learning pathways, subject tiles, and white/green learning sections. Demo 2 follows the Clinical Guruji reference with a blue portrait hero, statistics, resource category cards, video collections, and feature grids. The commercial enrollment elements in the references are adapted into free resource and professional inquiry links.

In the JSON, update a playlist's `youtubePlaylistId` or `youtubeUrl`, then set each featured video's `youtubeVideoId` or `youtubeUrl` and `playlistId`. Existing `playlistId` relationships populate the selectable video list. Selecting a video loads its responsive, privacy-enhanced YouTube embed in the page; selecting **Play full playlist here** loads the complete official playlist in that same player. Visitors can browse and play items directly inside YouTube's playlist embed. `lib/youtube.ts` validates plain IDs and standard YouTube watch, short, embed and playlist URLs. Missing or invalid IDs show a labeled demo preview. No API key or YouTube Data API is needed for embeds.

The current demo data includes selected public playlists and video IDs from [Stanford's YouTube channel](https://www.youtube.com/@stanford/playlists), as requested. The teaching section labels them as third-party sample material and links to Stanford; they are not presented as Dr. Mehra's work. The static prototype does not discover a channel's playlists automatically. Replace `profile.socialLinks.youtube`, `profile.socialLinks.youtubeLabel`, `teaching.sourceChannel`, and the playlist/video records with the doctor's verified links when available. This keeps the site key-free and avoids claiming or displaying unverified work. If you want every playlist item listed as custom cards, include each item's video URL/ID in the JSON as well.

Set the social profile links in the same JSON object. Only HTTPS links on the official YouTube, Instagram, and X/Twitter domains are rendered as clickable links; empty values show a visible “link pending” label in all three designs:

```json
"socialLinks": {
  "youtube": "https://www.youtube.com/@official-handle",
  "instagram": "https://www.instagram.com/official-handle/",
  "twitter": "https://x.com/official-handle"
}
```

Do not add invented video IDs or external links. Current video IDs belong to the Stanford sample playlists listed in `teaching.sourceChannel`; replace these with the doctor's own approved channel content before production.

## Connect Google Forms and Google Sheets

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_GOOGLE_FORM_URL=
NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL=
```

Use the published Google Forms responder URL for the first value and the embed URL (with `embedded=true`) for the second. `lib/inquiry.ts` validates and centralizes these public URLs. An embed URL shows the form in the portfolio with an external-tab option; an external URL alone shows a button to the form. With neither value set, the demo form validates input locally and explicitly confirms that nothing was sent or saved.

Create a form with these fields: Full name (required), Email (required), Phone (optional), Inquiry category (required), Subject (required), Message (required), and Consent to contact (required). Use the supplied JSON's five inquiry categories. Add this caution to the real form: “This form is for general professional inquiries only. Do not submit medical emergencies, patient records or sensitive health information.”

In the form’s Responses section, link a new or existing Google Sheet, and optionally enable response notifications. Manage new rows in that private sheet. Suggested manual columns are Inquiry status, Assigned to, Follow-up date, Internal notes and Replied date; suggested statuses are New, In Progress, Replied and Closed. The site does not access or publish the spreadsheet and has no admin dashboard.

For GitHub Actions, put the two public form URLs in repository Actions variables with those names. They are public links, not credentials.

## Deploy to GitHub Pages

1. Push the project and its `package-lock.json` to the `main` branch.
2. In the repository's **Settings → Pages**, select **GitHub Actions** as the source.
3. The included `.github/workflows/deploy.yml` installs dependencies, runs lint and TypeScript checks, builds and verifies `out/`, then deploys it with the official Pages artifact/deploy actions.

The workflow sets `NEXT_PUBLIC_BASE_PATH` to the repository name for project Pages URLs (`https://USERNAME.github.io/REPOSITORY/`). Repositories named `USERNAME.github.io` use the root path. `next.config.ts` enables `output: "export"`, `trailingSlash: true`, `images.unoptimized: true` and the base path. Next.js `Link` handles internal links, and the shared `assetPath()` helper prefixes local `next/image` sources. The build adds `.nojekyll` and a disallow-all `robots.txt` for the fictional prototype. Every route is statically rendered; there is no server runtime, API route or fallback redirect.

For a local project-path build in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/doctor-portfolio'
npm run build
npm run verify:export
```

Unset the variable to build for a root domain. `verify:export` checks the static routes, assets, local links, metadata and Pages marker files under the selected path.

## Move the selected design to production

Replace the fictional content and portrait with approved real profile information, then move the selected design’s composition to `/` and remove the other two demo routes and switcher. Update metadata in `app/layout.tsx` for the production site. Remove the no-index setting and `Disallow: /` only when the production content is ready to be indexed. Update the GitHub Pages base path for a custom domain and run the production build again. Add real YouTube IDs and published form URLs only after they have been verified.

The demos use verified public Stanford sample playlist/video IDs at the user's request; they are clearly identified as third-party demo material. No doctor-specific YouTube profile, Instagram profile, X/Twitter profile, contact email or Google Form URL was supplied. Replace the sample channel and pending social links with the doctor's official profiles before production. Live inquiry delivery and Google Sheets receipt require the doctor's own published form and cannot be tested until then.
