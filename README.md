# DivineStays
Kota-first student accommodation website and lead-generation engine.

## Four launch properties
- Divine Residency — F-16 Jhawar Nagar — near Allen Sakar & Career Will
- Divine Residency — C-56 Landmark City, Kunadi — near Allen Samyak
- Divine Home — D-8 Landmark City, Kunadi — near Allen Sangyan
- Divine Home — G-62 Coral Park — near Allen Supath

## Stack
Next.js (App Router) + Prisma/Postgres (Supabase) + Supabase Storage. Deploys to Vercel — this app uses server-side rendering, API routes and middleware, so it is **not** compatible with static hosting (GitHub Pages).

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in a Supabase project's connection strings/keys, an `ADMIN_PASSWORD`, a `SESSION_SECRET`, and your real WhatsApp/call numbers.
3. `npm run db:migrate` then `npm run db:seed`
4. `npm run dev`

## Admin
`/admin` (password-protected via `ADMIN_PASSWORD`) — leads and review moderation. Property/offer/FAQ content is managed via `npm run db:studio` for now, not a web UI.

## Status
Live: JustDial-style directory homepage with area filter, per-property detail pages (photos, map, offers, FAQs, reviews), click-to-call/WhatsApp on every listing, lead capture wired to the DB, public review submission with admin moderation.

Not built yet: booking management (schema exists, no UI/API), property/offer/FAQ admin CRUD (use Prisma Studio), property comparison view, real property photos (placeholders in use until supplied).