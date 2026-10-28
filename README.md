# Dr. Siraj Ahmad — three portfolio designs

A Next.js static site with three visual designs, all sharing the same profile, educational resources and inquiry form. The root route opens Demo 1. Each design has dedicated About, Educational Material and Inquiry pages.

## Local development

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Build and check the exported site with:

```sh
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run preview
```

For a GitHub project-path build in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/doctor-portfolio'
npm run build
npm run verify:export
npm run preview
```

Preview at http://localhost:3000/doctor-portfolio/. The preview server serves `out/`. The base path must match the build. Stop preview with Ctrl+C. Leave the environment variable empty for a root-domain build.

## Pages and designs

| Design | Home       | About            | Educational Material | Inquiry            |
| ------ | ---------- | ---------------- | -------------------- | ------------------ |
| 1      | `/`        | `/about/`        | `/education/`        | `/inquiry/`        |
| 2      | `/demo/2/` | `/demo/2/about/` | `/demo/2/education/` | `/demo/2/inquiry/` |
| 3      | `/demo/3/` | `/demo/3/about/` | `/demo/3/education/` | `/demo/3/inquiry/` |

`/demo/1/` and its detail pages are also exported. Switching demos preserves the current page. Navbar links, footer links and local assets use the configured GitHub Pages base path. All 16 routes are statically exported; no application server is needed.

## Profile and assets

Edit `data/doctor_portfolio_demo_data.json` to update the shared profile, links, educational titles, qualifications, professional experience and video collections. The new profile was prepared from the supplied DrSirajAhmad Info document. Tentative employment matches, unverified publication claims, social follower counts and fictional research/awards are excluded. The teaching experience figure is attributed to PW MedEd; it is not combined with clinical experience.

The supplied portrait is stored at `public/images/doctor/dr-siraj-ahmad.png` and shared by every homepage and About page. Update `profileImage` and `heroImage` to replace it. Book artwork displays titles, not official covers or unverified editions.

Social links include the supplied YouTube, Instagram, email and Practo profiles. Telegram is labeled PW MedEd, a collaborated community channel, rather than Dr. Siraj's personal channel.

The downloadable `public/downloads/pharmacology-revision-demo.pdf` is a one-page demo notes/revision worksheet. It is clearly identified as a sample template, not authored course notes. Replace or extend these resources with approved PDFs in `public/downloads/`.

## YouTube learning

Every homepage features the first five distinct episodes of **5 MCQ’s in 5 Minutes**, with thumbnail selection and an embedded player. Continue on YouTube opens the full playlist. The repeated episode IDs in the request were corrected using the public playlist order: `18AtXNn8ie8`, `1fdUj5XC6ww`, `_URqebijMXQ`, `rbzx3xkSx44`, `QgquCQNqGWg`.

Educational Material includes that course, FMGE Solution Decoded and FMGE January 2024, with collection thumbnails, their selected videos, embedded playback and links to view complete playlists on YouTube. Select a collection directly from its card; there is no playlist search bar. Playlist metadata was read on 28 October 2026. These are curated collections, not a live ranking or automatic feed. The Trending label follows the requested featured course; no top-viewed ranking is asserted. YouTube controls playback availability and whether a video can be embedded.

## Inquiry email delivery — one-time activation required

The form posts directly from the static site to FormSubmit's AJAX endpoint for **keshvisingh7@gmail.com**, the supplied recipient. No SMTP password or API secret is exposed. The form includes purpose selection (guidance, paid collaboration and other professional requests), contact fields, consent, a honeypot, a submission lock, timeout handling and a direct email fallback.

Before accepting public inquiries:

1. Open the deployed Inquiry page and submit an owner-controlled activation/test request.
2. Open the FormSubmit activation email sent to keshvisingh7@gmail.com and confirm the mailbox.
3. Submit a second owner-controlled request and verify that it arrives in the inbox. Check spam if needed.

See https://formsubmit.co/ and https://formsubmit.co/documentation for activation and AJAX details. Activation is controlled by the mailbox owner. No activation request or real email was sent during development. Delivery to an inbox is not confirmed by local builds or response-handler checks.

The confirmation popup appears only when FormSubmit returns an accepted response. Activation-required responses and failed requests retain the visitor's form values and show an explanation; they do not show the sent popup. A service acceptance response is not a delivery receipt. The form discloses that the visitor's details are sent through FormSubmit to the team. It is for professional requests and must not collect patient records or medical emergencies.

The form recipient is stored in `contact.email`; change it and repeat activation if the team's destination changes. Google Forms environment variables are no longer used.

## GitHub Pages deployment

The included `.github/workflows/deploy.yml` deploys pushes to `main` and supports manual runs. In GitHub Settings → Pages, select **GitHub Actions** as the source. The workflow installs locked dependencies, lints, type-checks, builds the static export, verifies all routes and local assets, then uploads and deploys `out/`.

The workflow sets the repository base path automatically. Repositories named `USERNAME.github.io` use the root path. `.nojekyll` and `robots.txt` are generated after building. These three design previews retain noindex metadata and a disallow-all robots file; change these only when a production design and content are approved for indexing.
