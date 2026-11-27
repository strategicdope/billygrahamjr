# billygrahamjr.com

Static site for Billy Graham Jr. (BG), hosted on GitHub Pages. There's no build step: the files in this repo are the site.

## Pages
| Path | Page |
|---|---|
| `index.html` | Home: hero, programs, events, about, speaking, books and journals, testimonials, contact |
| `deed-papers/` | Free Deed Papers page, with the signup popup (`#get`) |
| `deed-papers/thanks/` | Thank-you page that Kit redirects to after signup, with a direct PDF download |
| `shop/` | Digital downloads: Deed Papers live, digital journals "Coming soon" |

## How the Deed Papers signup works
The popup form posts to Kit form **10249927** (`https://app.kit.com/forms/10249927/subscriptions`). Kit redirects to `/deed-papers/thanks/` and emails the PDF from hello@billygrahamjr.com.

## Editing
- Colors, fonts and widths are tokens in `:root` at the top of `css/styles.css`.
- After changing `css/styles.css` or `js/main.js`, bump the `?v=` number on their links in every HTML page so browsers fetch the new file.
- Adding a shop product: copy an `<article class="dl">` block in `shop/index.html`.

## Hosting
- GitHub Pages serves the `main` branch. The `CNAME` file holds `billygrahamjr.com`.
- DNS is managed in GoDaddy.
