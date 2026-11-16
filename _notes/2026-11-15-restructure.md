# guber.dev — restructure, 2026-11-15

## Intent

Visitor is a **potential client** (a business with a manual workflow), not a developer.
They must see the work and reach Michael in seconds. The site was one 151 KB page mixing
a consulting offer, a product showcase and a raw GitHub dump; nav order did not match
page order, no product had its own URL, and leftovers were served publicly.

## Goals

- A client understands "what he does / can I see something real / how do I reach him" fast.
- Every self-hosted product has its own URL, linkable from an email or a proposal.
- Contact is plain, visible and works without JavaScript.
- One stylesheet, small files, no build step.

## Non-goals

- No redesign of brand colours, typography or the logo. Reused the existing style block.
- No case studies, testimonials or metrics — none exist.
- No static-site generator, framework or dependency.

## Anti-goals (would make this a failure even though it works)

- Publishing an internal design note to the public web.
- A checkout/cart-style "agency" page with invented claims, numbers or client names.
- Losing the 67-repo archive, the store links, or the existing app support pages.

## Approches considered

1. **Reorder one page, cut content** — 1 file, ~1h. Cheap, but still one URL: a product
   cannot be linked, and the client still scrolls past everything.
2. **Landing + `/projects/` + per-product pages** — ~6 small files, half a day. Chosen.
3. **Regenerate the site with a generator (Jekyll/11ty + markdown)** — right at 50 pages,
   pure cost at 6. Rejected.

## What was built

```
/                        landing, client-facing
/work/vas/  sms/  investigation/  punchlist/     one page per self-hosted product
/projects/               all 67 repos (moved verbatim, own URL, own title)
/assets/site.css         old <style> block + additions
/assets/site.js          theme toggle, shared
robots.txt, sitemap.xml  previously missing
```

Landing order: hero → **Selected work** (4 self-hosted systems, then 19 store apps in a
compact grid, then a link to `/projects/`) → What I do → How I work → Stack → Contact.

## Decisions (mine, easy to change)

- **Email in plain text** (`michael@guber.dev` + `mailto:`) instead of the JS-obfuscated
  link. Anti-scraping cost more clients than spam: with JS off the old link did nothing.
- **Store apps stay on the landing** in a compact 3-column grid rather than on their own
  page. They are proof that things ship; a second click would lose the client.
- **Stack cut from 21 pills to 10** plus a one-line "also" note. Clients do not read tag walls.
- **`releasebar.guber.dev` link removed** — the host answers 502. Put it back when it is up.
- **"How I work" is new copy** (4 steps). It is the only invented content on the page and it
  describes a normal consulting flow; edit it to match how you actually work.
- **Product pages keep the existing card descriptions verbatim** and add a problem
  statement and a bullet list — no new numbers or claims were introduced.
- `index_r.html`, `readme_r.md`, `copy_of_ai_oracle.ipynb` deleted (were served publicly);
  `readme.md` replaced with a real repo README. All recoverable from git history.

## Constraints for whoever touches this next

- No build step. Plain files. Push to `main` deploys.
- Root-absolute asset and internal paths so nested pages work.
- New pages must be added to `sitemap.xml`.

## Left open

- `https://wa.me/guberm` returns 200 but has never been confirmed to reach the right
  WhatsApp account — verify, it is the channel clients use most.
- `releasebar.guber.dev` is down (502): fix and re-add, or leave it out.
- No testimonials, logos or case studies on the page. One or two real client results
  would do more than any layout change.

## Contact form contract (2026-11-16, shared by guber.dev + product landings)

All public "contact us" forms — guber.dev, investigation.guber.dev, punchlist.guber.dev,
sms.guber.dev — post the same way:

- `POST https://form.guber.dev/contact`, plain form-urlencoded (works without JS).
- Fields: `name` (1–100), `email` (valid address), `message` (1–4000), honeypot `_honey`
  (must stay empty), plus the Turnstile widget sitekey `0x4AAAAAAGCxRu2ZW-EpjO3t`.
- Processor (Hetzner VPS, Caddy → `form-processor` systemd unit, `/opt/form-processor/app.py`):
  honeypot filled → fake 303; Turnstile token present but invalid → 403; no token → soft
  delivery marked UNVERIFIED (`TURNSTILE_SOFT=1`); per-IP rate limits; delivery to Telegram
  and SMTP (Reply-To = sender).
- Success → `303` back to the caller's own origin (`Referer` allowlist) with `?sent=1#contact`;
  each landing shows its thanks banner for `?sent=1` and cleans the URL.
- Backend `ALLOWED_REDIRECT_HOSTS` (code default) lists the origins allowed to be bounced to.
