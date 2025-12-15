# PRD — Restaurant Booking + Admin Panel

## Goal
Enable customers to request reservations and admins to approve/deny with confirmations via email.

## Users
- Customer (public)
- Admin (authenticated)

## MVP Features
Customer:
- Create reservation request (date, time, party size, name, email)
- See “pending” confirmation screen

Admin:
- View pending requests
- Approve (assign table + confirm time)
- Deny (with reason)

System:
- Email on request received + approved/denied

## Non-Functional
- Responsive UI (mobile-first)
- Accessibility basics (keyboard, focus, labels)
- Clear UI states (loading/empty/error)
