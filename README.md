# NADEX PRIME GUILD

A responsive, static recruitment website for NADEX PRIME GUILD, built around the GFF-inspired design system: near-black surfaces, titanium typography, angular geometry, and restrained Free Fire orange accents. No framework or runtime dependencies.

## Run locally

Serve this directory with any static HTTP server. For example:

```sh
python -m http.server 8080
```

Then open `http://localhost:8080`.

## GFF typeface

The deployed stylesheet loads GFF from https://typace.ace-base.cc/fonts/GFF.ttf through brand-overrides.css. A local fonts/GFF.ttf is optional for offline use only and does not change the deployed font URL. The font is not bundled because its source and web-embedding license have not been verified.

## Design tokens

Colors, spacing, typography, motion, and layout tokens are defined in `styles.css` under `:root`. The default palette is Void `#0B0B0D`, Carbon `#151518`, Titanium `#D8D8D8`, FF Ember `#FF6A00`, and Glory Gold `#F5AD28`. Gradients and blur effects are intentionally avoided.

## SEO / AEO / GEO

The page includes a descriptive title and meta description, semantic headings, crawlable FAQ answers, Open Graph and Twitter metadata, a manifest, robots.txt, canonical metadata, a sitemap, and truthful Organization JSON-LD with supplied Instagram profiles. The canonical URL and sitemap are configured for https://nadex-prime.vercel.app/; update them only if the production domain changes. Structured data and metadata do not guarantee indexing or rich results.

## Features

- Guild features, rules, recruitment requirements, and Instagram contacts
- Accessible mobile navigation and keyboard Escape handling
- FAQ using native disclosure elements
- Reduced-motion support and visible keyboard focus
- Responsive layouts for mobile and desktop
- No fabricated live stats, member counts, prizes, or schedules

## Verification checklist

- Upload the licensed GFF font to `fonts/GFF.ttf`.
- Test links, mobile navigation, contrast, and layout at small viewport widths.
- Verify social preview metadata and structured data on the deployed URL.
