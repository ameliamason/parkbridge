# ParkBridge

Mobile-first parking intelligence for UK drivers. Find and compare parking before you leave, or identify your provider and pay instantly once you've parked.

**Stack:** Next.js 14 App Router · TypeScript (strict) · Tailwind CSS · Supabase (PostGIS) · Leaflet + OpenStreetMap · Vercel

**PRD:** [`/wireframes/ParkBridge_PRD_v0.3.docx`](wireframes/ParkBridge_PRD_v0.3.docx)

---

## Phase 0 Setup Checklist

- [ ] `npm install`
- [ ] Copy `.env.example` → `.env.local` and fill in values
- [ ] Create Supabase project, enable PostGIS, run `supabase/migrations/001_initial_schema.sql`
- [ ] Run `npx tsx scripts/seed-providers.ts` to populate provider deep-links
- [ ] *(Phase 2 only)* Configure Google Maps API keys if switching from Leaflet
- [ ] Set up Vercel project pointing at this repo (`main` → production, `develop` → staging)

## Development

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev
```

## Project Structure

```
/app                  Next.js App Router pages
  /api                API route handlers (search, identify, corrections, providers)
  /search             Destination autocomplete
  /results            Map + parking list
  /identify           GPS at-car identification
  /located            Provider result + deep-link CTA
  /fallback           GPS fail · manual entry
  /correct            User correction form
/components           Shared React components
/lib                  Types, Supabase client, provider deep-links, session token
/scripts              seed-providers.ts, validate-deeplinks.ts
/supabase/migrations  PostGIS schema (001_initial_schema.sql)
/wireframes           Design reference: HTML prototype + PRD docs
/.github/workflows    CI: lint + typecheck on every PR
```

## Deep-Link Providers (Phase 0)

RingGo · PayByPhone · JustPark · NCP · Q-Park · APCOA Connect · Flowbird · ParkMobile

See [`lib/providers.ts`](lib/providers.ts) for iOS/Android/web templates.
Run `npx tsx scripts/validate-deeplinks.ts` on a physical device to verify each scheme.

## Deployment

| Branch | Environment | URL |
|--------|-------------|-----|
| `feature/*` | Preview | Auto-generated |
| `develop` | Staging | parkbridge-staging.vercel.app |
| `main` | Production | parkbridge.vercel.app |
