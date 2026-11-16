# guber.dev

Source of [guber.dev](https://guber.dev) — portfolio and consulting site of Michael Guber.

Plain HTML, CSS and a little JavaScript. No build step, no dependencies, no generator:
the files in this repository *are* the site. Deploy = push to `main` (GitHub Pages).

## Structure

| Path | What it is |
|---|---|
| `index.html` | Landing page: selected work (4 self-hosted products), apps published on the stores, what I do, how I work, stack, contact |
| `projects/index.html` | All 67 public, non-fork GitHub repositories, with search, sort and category filters |
| `work/<product>/index.html` | One page per self-hosted product: the problem, what it does, where it runs |
| `assets/site.css` | Single stylesheet for every page |
| `assets/site.js` | Theme toggle (dark/light, remembered in `localStorage`) |
| `assets/store-icons/` | Product icons used by the cards and the product pages |
| `subscription-notifier/`, `ytsubscore/` | Support, privacy and terms pages for the published apps |
| `app-ads.txt`, `CNAME`, `robots.txt`, `sitemap.xml` | Domain and crawler plumbing |
| `_notes/` | Working notes. Jekyll ignores folders starting with `_`, so this is never published |
| `form.guber.dev` (Hetzner VPS 2.29.155.27) | Contact-form backend: Caddy → `form-processor` systemd service (Python stdlib). Not part of this repo — see `_notes/2026-11-15-restructure.md` for the contract |

## Editing notes

- Every page must link the shared assets with **root-absolute** paths
  (`/assets/site.css`, `/assets/site.js`) so pages work at any depth.
- Internal links between pages are root-absolute too (`/projects/`, `/work/vas/`).
- Product cards reuse the existing `.app-card` markup: the four self-hosted products use
  `.app-card.app-card-featured` on the landing, the store apps use the compact
  `.app-cards-compact` grid.
- Adding a page? Add its URL to `sitemap.xml`.
- `projects/index.html` is built from GitHub metadata. **New repositories go there, not on the
  landing page** — the landing no longer holds the grid. Edit the `.project-card` blocks in place:
  the filter/sort script reads the `data-*` attributes on each card, and the counts in the filter
  buttons (plus `#projectCounter`) are maintained by hand. Check for a duplicate `data-name`
  before adding — the sync once added a second card for a repository that was already listed.
