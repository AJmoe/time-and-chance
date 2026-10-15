# Time & Chance Consultancy website

One-page static site (HTML, CSS, vanilla JS) plus a custom `404.html`. No build step: serve the folder, e.g.
`python -m http.server 8090` and open http://127.0.0.1:8090.

- Brand colours: navy `#001838`, gold `#CAA76C`, white. Fonts: Cinzel and Montserrat (Google Fonts), matching the logo.
- Logo SVGs in `assets/` were cropped from the client's logo PDF. Favicons, `apple-touch-icon.png`, `assets/icon-512.png`
  and the social image `assets/og-image.png` are generated from them.
- Photos in `assets/photos/` are placeholders until the client supplies real ones. Search `TODO-CLIENT` in `index.html`.
- The contact form opens the visitor's email app (mailto) and always shows email/WhatsApp alternatives. There is no backend.

## Preview hosting (Render)

`render.yaml` deploys this as a free Render static site. Render serves `404.html` for missing paths. The blueprint also
sets security headers (CSP, nosniff, referrer and permissions policies) and `X-Robots-Tag: noindex` for the preview.

The CSP allows the one inline script in `index.html` by its sha256 hash. If that script changes, update the hash in
`render.yaml`, or the reveal animations will leave sections hidden.

## Before launch (search `TODO-LAUNCH`)

1. Confirm the domain, then add `rel="canonical"`, `og:url` and absolute `og:image` tags (template in the `index.html` head).
2. Add `sitemap.xml` and its `Sitemap:` line in `robots.txt`.
3. Remove the `X-Robots-Tag: noindex` header from `render.yaml` (or the production host).
4. Replace the placeholder photos and give each a specific `alt` text.
