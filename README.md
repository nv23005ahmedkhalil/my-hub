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
  cv:        { url: "Ahmed_Khalil_Abdulameer_CV_V3.pdf" },
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

## Run it locally with Docker (one command)

Requires [Docker](https://docs.docker.com/get-docker/) installed.

```bash
docker compose up --build
```

Then open **http://localhost:8080**. That's it — Nginx serves the static files inside the container.

Stop it with `docker compose down`. On future runs (no code changes) you can just use `docker compose up`.

### Without Docker Compose

```bash
docker build -t contact-hub .
docker run -d -p 8080:80 --name contact-hub contact-hub
```

Open http://localhost:8080. Stop with `docker stop contact-hub && docker rm contact-hub`.

To use a different local port, e.g. 3000, change `8080:80` to `3000:80`.

## Deploying

This is a static site — you have two options:

- **Docker, on any VPS or server:** copy the whole folder to the server and run `docker compose up -d --build` (add `-d` to run in the background). Put it behind a reverse proxy (Nginx, Caddy, Traefik) or a platform like Fly.io / Railway / Render for a public domain and HTTPS.
- **Plain static hosting (no Docker needed):** upload `index.html`, `style.css`, `script.js`, and `favicon.svg` to any web root (Apache, Nginx, Netlify, Vercel, Cloudflare Pages, GitHub Pages). No build step either way.

Before going live, update in `index.html`:
- `<link rel="canonical" ...>` and the `og:url` / `twitter` tags with your real domain
- `og:image` with a real preview image URL (1200×630px recommended)

## Browser support

Modern evergreen browsers (Chrome, Safari, Firefox, Edge). Uses CSS variables, `backdrop-filter`, and `prefers-color-scheme` / `prefers-reduced-motion` media queries, all widely supported.
