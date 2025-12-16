# Saffron & Stone — Reservation Requests

A modern reservation request system built for a busy restaurant workflow: guests request a table, staff approves/denies, and guests receive email updates plus a confirmation code to check status anytime.

## What this solves (real problem)
Restaurants often take requests through calls, walk-ins, and DMs. That causes:
- missed messages
- inconsistent details
- no single “pending requests” view for staff
- guests repeatedly calling to check status

This app turns that into one clean flow.

## Key features
### Guest experience
- Reservation request form (date, party size, valid time slots)
- Instant confirmation code
- Status page to check request anytime
- Email updates when the request is approved/denied

### Staff experience (Admin)
- Secure staff login
- Dashboard to view requests (pending/approved/denied)
- Search by code / name / email
- One-click approve/deny actions

## Tech stack
- Next.js (App Router)
- Tailwind CSS
- Supabase (Postgres + Auth)
- Resend (email delivery)

## Pages
- `/` Home
- `/reserve` Reservation request form
- `/reserve/success` Success screen (shows confirmation code)
- `/reservation/[code]` Status page for guests
- `/admin/login` Staff login
- `/admin/reservations` Admin dashboard
- `/case-study` Product story (why this exists)

## Running locally
```bash
npm install
npm run dev


## Local Setup
1. Install deps: `npm i`
2. Create `.env.local` using `.env.example`
3. Run: `npm run dev`

## Docs
- Product requirements: `/docs/product/PRD.md`
- Architecture overview: `/docs/architecture/overview.md`
- Decisions (ADRs): `/docs/adr/`
