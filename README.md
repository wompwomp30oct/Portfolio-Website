# Kagaz & Chiaroscuro — portfolio site

A static site built from `../visual_identity_style_guide.md`. No build step:
open `index.html` in a browser, or serve the folder with any static server.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: hero, selected plates, series index, night film strip, about teaser, year ledger, contact |
| `archive.html` | All plates. Filter by series (`archive.html#night`), switch grid ↔ ledger |
| `plate.html?w=<slug>` | One page per plate: matted image, spec, 3:1 detail crops, prev/next, related |
| `about.html` | Practice, principles, capabilities ("print spec"), what you're open to |
| `system.html` | Colophon: sitemap, colour, type, grid, live components, motion, responsive rules |

## Files

- `css/kagaz.css`: every token and component. Tokens come straight from §16 of the style guide.
- `js/works.js`: **the archive data.** Titles, dates, series, notes, tags.
- `js/site.js`: behaviour, plus the `SITE` config at the top (email + social links).
- `assets/img/`: web-sized copies (max 1800px) of the originals in this folder. The originals are untouched.

## To do before publishing

1. In `js/site.js`, set `SITE.email`, `instagram`, `pinterest` and `behance`. They're placeholders now.
2. In `js/works.js`, check titles. Ones without text in the image are working titles (Back Seat, Afterimage, Rings…).
3. Six plates have no date in their filename and show as "n.d.". Add a `date: 'YYYY-MM-DD'` if you know it.
4. The About copy is a first draft written from the work. Rewrite it in your own voice.

## Adding a plate

1. Put a web-sized JPG in `assets/img/<slug>.jpg`.
2. Add an entry to `WORKS` in `js/works.js` (keep date order). Archive, ledger, film strip, series counts and plate pages all update from that one file.
# Portfolio-Website
