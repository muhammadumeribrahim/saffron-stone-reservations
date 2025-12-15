# Restaurant Table Booking + Admin Panel

Production-style reservation system:
- Customers request bookings with date/time/party size
- Admin approves/denies and assigns tables
- Email confirmations and status tracking

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + Auth)
- Email provider (Resend recommended)

## Local Setup
1. Install deps: `npm i`
2. Create `.env.local` using `.env.example`
3. Run: `npm run dev`

## Docs
- Product requirements: `/docs/product/PRD.md`
- Architecture overview: `/docs/architecture/overview.md`
- Decisions (ADRs): `/docs/adr/`
