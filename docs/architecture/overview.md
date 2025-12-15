# Architecture Overview

## High level
- Next.js app serves both public and admin UI
- Supabase for Auth + Postgres
- Server Actions (or API routes) for database writes
- Email provider for notifications

## Key flows
1) Customer submits request -> status PENDING -> email "received"
2) Admin approves -> confirmed reservation created + table assigned -> email "confirmed"
3) Admin denies -> status DENIED + reason -> email "denied"
