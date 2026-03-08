# arharif.github.io — Premium Dual-Universe Personal Website

Production-ready GitHub Pages **USER SITE** for **https://arharif.github.io/**.

## Overview
This repository delivers a design-forward personal website with two cinematic entry paths:
- **Professional**: cybersecurity articles and technical insights
- **Personal**: books, anime, and series summaries/blogs

The experience is Web3-inspired (glassmorphism, gradients, subtle motion), responsive, and theme-aware.

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS
- Framer Motion
- React Router
- GitHub Actions Pages deployment

## Highlights
- Cinematic dual-entry landing (Professional / Personal)
- 3 themes: dark, light, purple (persisted in localStorage)
- Animated cards, glassmorphism surfaces, smooth hover motion
- Search + tag filtering across each universe
- Article detail experience with TOC, callouts, code styling, related posts
- Responsive navbar/mobile menu + sticky header + footer
- SEO baseline metadata, `robots.txt`, `sitemap.xml`, and `rss.xml`
- GitHub Actions workflow for Pages deployment

## User-Site Pages Configuration (Critical)
Because this is a **GitHub Pages user site** (`arharif.github.io`), runtime/build config is root-based:
- Vite `base` is `/`
- Router has **no project basename**
- SEO links target `https://arharif.github.io`
- 404 fallback includes SPA route recovery logic for direct/deep links

## Project Structure
- `src/components/` reusable UI components
- `src/content/` typed content model + seed data
- `src/lib/` helpers (theme/content query)
- `src/styles/` Tailwind + design tokens
- `public/` static SEO assets and favicon
- `.github/workflows/deploy.yml` CI/CD for GitHub Pages

## Local Development
```bash
npm install
npm run dev