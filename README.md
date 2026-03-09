# arharif.github.io

Premium GitHub Pages **USER SITE** deployed at **https://arharif.github.io/**.

## Architecture
- Static frontend: React + TypeScript + Vite + Tailwind + Framer Motion
- BaaS: Supabase (OTP Auth, Postgres, Storage)
- Hosting: GitHub Pages user-site (root domain)

## Product Surfaces
1. **Public website**
   - Cinematic split entry
   - Professional Framework Academy (book/slide topic experiences)
   - Personal Culture Hub (Philosophy and Anime, Books, Hobbies)
2. **Admin CMS**
   - OTP-only login
   - Topic CRUD + Content CRUD
   - Draft / Publish / Archive workflow
   - Media upload and inline images
   - Video embed support

## Themes
- Dark
- Light
- Purple
- Rainbow (controlled premium gradient treatment)

## Environment Variables
Create `.env` from `.env.example`.

```bash
cp .env.example .env
```

Required:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_EMAIL` (set to `x731072000@gmail.com`)
- `VITE_SUPABASE_MEDIA_BUCKET` (default: `content-media`)

## OTP Admin Login
- Route: `/login`
- Flow: email -> send OTP -> verify OTP
- Only authenticated email matching `VITE_ADMIN_EMAIL` is authorized for `/admin`
- No password is required by the app login flow

## Supabase Setup
Run `docs/supabase.sql` in Supabase SQL editor.
It sets up:
- `topics` table
- `content_entries` table
- RLS for public-read/published-read and admin-only mutations
- `content-media` storage bucket policies

## GitHub Pages Deployment
Workflow: `.github/workflows/deploy.yml`
- Trigger: push to `main`
- Install: `npm ci`
- Build: `npm run build`
- Upload: `dist`
- Deploy: official Pages actions
- Build envs injected from GitHub Secrets:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_ADMIN_EMAIL`
  - `VITE_SUPABASE_MEDIA_BUCKET`

## Local Commands
```bash
npm ci
npm run dev
npm run build
```

## Troubleshooting
- **Blank page**
  - Ensure `vite.config.ts` has `base: '/'`
  - Ensure no stale project subpath assumptions
  - Ensure `index.html` root div exists and `src/main.tsx` mounts correctly
  - Check browser console for runtime errors (app includes visible error boundary screen)
- **Missing env vars**
  - App shows a visible warning banner and runs in public fallback mode
  - OTP auth requires Supabase URL + anon key
- **Auth redirect/session issues**
  - Ensure Supabase OTP email provider is enabled
  - Ensure callback includes token hash and `/login` can process it
- **Build failures**
  - Ensure `package-lock.json` is committed when using `npm ci`
- **Old path/domain references**
  - Confirm there are no stale references to old repository naming/subpaths

## Security Notes
- Use only Supabase anon key in frontend
- Never commit service-role keys or passwords
- Admin mutations are controlled through RLS + admin email allowlist
