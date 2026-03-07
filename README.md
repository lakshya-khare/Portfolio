# Lakshya Khare — Portfolio

Live site: [lakshya-khare.github.io/Portfolio](https://lakshya-khare.github.io/Portfolio/)

Personal portfolio built with plain HTML, CSS, and JavaScript — no frameworks, no build tools.

## Sections

- **Hero** — Animated typewriter cycling through roles
- **About** — Background, open-to status, volunteering, and honors
- **Core Competencies** — Skill groups across product, data, and strategy
- **Experience & Education** — Side-by-side timeline layout
- **Projects** — Six featured projects with cover images and links
- **Contact** — Email CTA, social links, and LinkedIn QR code

## Tech Stack

| Layer | Details |
|---|---|
| Markup | HTML5, semantic elements, JSON-LD structured data |
| Styling | CSS3 — custom properties, grid, glassmorphism, dark mode |
| Scripting | Vanilla JS — Lenis smooth scroll, scroll progress bar, 3D tilt, typewriter |
| Fonts | Inter (Google Fonts) |
| Icons | Font Awesome 6.5.1 |
| Hosting | GitHub Pages |

## Features

- Dark / light mode with `localStorage` persistence and `prefers-color-scheme` fallback
- Smooth scroll via [Lenis](https://github.com/darkroomengineering/lenis) with a fixed scroll progress bar
- Active navigation link tracking on scroll
- Rotating typewriter animation in the hero
- 3D tilt effect on project cards
- Scroll-reveal animations via `IntersectionObserver`
- SEO: canonical tag, Open Graph, Twitter Card, JSON-LD Person schema, sitemap, robots.txt

## Local Development

No build step needed. Open `index.html` directly in a browser, or serve it locally:

```bash
npx serve .
# or
python -m http.server 8080
```

## Contact

Lakshya Khare — [lakshyakhare226@gmail.com](mailto:lakshyakhare226@gmail.com)  
LinkedIn: [linkedin.com/in/lakshyakhare](https://linkedin.com/in/lakshyakhare)  
GitHub: [github.com/lakshya-khare](https://github.com/lakshya-khare)
