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
`/admin` (password-protected via `ADMIN_PASSWORD`) — leads, bookings, review moderation, property management.

## Status
In progress: lead capture, click-to-call/WhatsApp, booking + admin dashboard, reviews with photos, search/filters/maps, offers, FAQs, property comparison.