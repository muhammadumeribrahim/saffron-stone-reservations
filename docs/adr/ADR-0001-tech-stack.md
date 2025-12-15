# ADR-0001: Tech Stack

## Decision
Use Next.js + TypeScript + Tailwind + Supabase + Resend.

## Why
- Next.js supports full-stack patterns and deployment (Vercel)
- Supabase speeds up Auth + Postgres with Row Level Security
- Resend is simple for transactional emails

## Consequences
- We must design database + security policies carefully
- Environment variables must be managed correctly
