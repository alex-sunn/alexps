# Alex Sun | Personal Portfolio

Personal portfolio for **Alex Sun** (Toronto, ON), combining a light-first editorial master-detail layout with an adaptive full-viewport Three.js 3D ASCII backdrop, deep-linked URL routing, and downloadable PDF resume.

## Tech Stack
- **Frontend:** React 19, TypeScript, Vite
- **3D ASCII Backdrop:** Three.js + offscreen luminance/accent shader pass + 2D fallback
- **Testing:** Vitest, Testing Library

## Local Development

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: Start Vite dev server
- `npm run test`: Run unit and component test suite (`vitest run`)
- `npm run build`: Strict TypeScript check (`tsc -b`) and production bundle (`vite build`)

## Editing Content

All copy, proof metrics, work experience, project highlights, awards, and chart benchmarks live in [`src/data/resumeData.ts`](./src/data/resumeData.ts).

Static assets in `public/`:
- `public/alex-sun.jpg`: Profile portrait
- `public/Alex_Sun_Resume.pdf`: Downloadable 1-page resume
- `public/favicon.svg`: Site monogram favicon
- `public/og-image.png`: Social link preview image (`1200x630`)

## Deployment (Zero-Config Static Hosting)

Build output is emitted to `dist/` via `npm run build`:
- **Vercel / Netlify / Cloudflare Pages:** Connect `https://github.com/alex-sunn/alexps`, set build command to `npm run build`, and publish directory to `dist`.
