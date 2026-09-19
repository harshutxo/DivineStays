# DivineStays

Kota-first student accommodation website and lead-generation engine.

## Four launch properties
- Divine Residency — F-16 Jhawar Nagar — near Allen Sakar & Career Will
- Divine Residency — C-56 Landmark City, Kunadi — near Allen Samyak
- Divine Home — D-8 Landmark City, Kunadi — near Allen Sangyan
- Divine Home — G-62 Coral Park — near Allen Supath

## Lead intelligence
The site records submitted accommodation enquiries and attribution fields: source, UTM source/medium/campaign, landing page, referrer domain, and consent timestamp.

The admin includes a Search intelligence workspace with an initial Kota hostel keyword watchlist.

Google Search Console can show the search queries for which DivineStays appears, plus clicks, impressions, CTR and average position. It does not expose the identity or phone number of someone who merely types a query into Google.

## Search Console workflow
1. Verify the DivineStays website in Google Search Console.
2. Add the verified property URL to GOOGLE_SEARCH_CONSOLE_SITE_URL.
3. Open /admin/search for the DivineStays search-intelligence workspace.
4. Use Search Console's Queries report to inspect actual search terms and performance.

An optional consent-gated Google Analytics 4 measurement ID can be set with NEXT_PUBLIC_GA_ID.

## Setup
1. npm install
2. Copy .env.example to .env.local and fill in Supabase, admin auth, contact numbers and optional analytics settings.
3. npm run db:migrate then npm run db:seed
4. npm run dev

## Admin
/admin is password-protected. Leads are managed at /admin/leads; search visibility is tracked from /admin/search.
