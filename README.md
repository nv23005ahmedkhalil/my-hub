# Ahmed Khalil — Contact Hub

A fast, static, single-page contact hub. Pure HTML/CSS/JS — no build step, no dependencies to install.

## Files

```
contact-hub/
├── index.html     Page structure, content, and SEO/Open Graph metadata
├── style.css       All styling, themes, and animations
├── script.js       Your links live here (CONFIG object) + small behaviors
├── favicon.svg     Browser tab icon
└── README.md       This file
```

## How to update your links

Open **`script.js`** and edit the `CONFIG` object at the top of the file:

```js
const CONFIG = {
  instagram: { url: "..." },
  whatsapp:  { number: "9733...", message: "" },
  linkedin:  { url: "..." },
  email:     { address: "...", subject: "" },
};
```

That's the only place you need to touch to change any destination. The page reads from `CONFIG` on load and updates every button automatically.

## How to add a real profile photo

In `index.html`, find this line inside the hero section:

```html
<div class="avatar" id="avatar"><span>AK</span></div>
```

Replace the inner `<span>AK</span>` with an image tag:

```html
<div class="avatar" id="avatar"><img src="your-photo.jpg" alt="Ahmed Khalil" /></div>
```

Add `your-photo.jpg` (ideally square, at least 300×300px) into the project folder.

## How to change name / subtitle / card text

All wording lives directly in `index.html` — search for the `<h1 class="name">`, `<p class="subtitle">`, and `.card-desc` elements and edit the text.

## Deploying

This is a static site — upload the whole `contact-hub` folder to any host:

- **Apache / Nginx / shared hosting:** upload the folder contents to your web root (e.g. `public_html/` or `/var/www/html/`). No server configuration required.
- **Netlify / Vercel / Cloudflare Pages / GitHub Pages:** drag-and-drop the folder or connect the repo — no build command needed.

Before going live, update in `index.html`:
- `<link rel="canonical" ...>` and the `og:url` / `twitter` tags with your real domain
- `og:image` with a real preview image URL (1200×630px recommended)

## Browser support

Modern evergreen browsers (Chrome, Safari, Firefox, Edge). Uses CSS variables, `backdrop-filter`, and `prefers-color-scheme` / `prefers-reduced-motion` media queries, all widely supported.
