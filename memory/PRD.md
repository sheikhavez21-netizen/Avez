# Relay Premium Car Care — PRD

## Original Problem Statement
"Build a web app chnage the black to white colour keep the papap orange nad chnage the logo and make UX better" — rebuild the existing dark-themed Relay Car Care landing page (single HTML file) as a light/white-themed site, keep the orange accent, use the new uploaded RELAY Premium Car Care logo, and improve UX.

## Product
Landing page for Relay Premium Car Care — doorstep premium car wash service in Goa, India. All bookings via WhatsApp (wa.me/919665980103) or phone (+91 96659 80103).

## User Personas
- Goan car owner who values convenience ("Susegad" lifestyle) and wants doorstep car care
- Owner of ceramic/PPF-protected vehicles needing safe maintenance washes
- Repeat customer interested in monthly subscription plans

## Architecture
- Frontend: React (CRA + craco), Tailwind, shadcn/ui (Accordion), lucide-react icons
- Fonts: Outfit (headings), Manrope (body)
- Backend: FastAPI template retained (no app-specific endpoints needed yet)
- Logo asset: /app/frontend/public/assets/relay-logo.png (whitespace-trimmed)
- Design guidelines: /app/design_guidelines.json

## Core Requirements (static)
- White/light theme, orange (#FF5A00) accent retained
- New RELAY Premium Car Care logo in nav and footer
- Better UX: sticky glass nav, scroll-reveal animations, accordion inclusions, mobile sticky CTA, mobile menu

## Implemented
- 2026-08-23: Full light-theme rebuild in React — Navbar (glass, mobile menu), Hero (headline, CTAs, trust badges, hero image), Philosophy/Susegad section, 4 wash packages with accordion inclusions (₹449–₹1,299), How It Works (3 steps), 4 subscription tiers (₹899–₹3,299) with perks, Why Relay standards, dark contrast Booking CTA section, Coverage (Panjim) + Footer with logo and contacts, mobile sticky booking bar. All CTAs link to WhatsApp with pre-filled messages. data-testid on all interactive elements.

## Verified
- Page loads, all sections render, package accordion expands, hero CTA href = wa.me/919665980103, backend /api/ healthy

## Backlog
- P0: None blocking
- P1: Real photos of Relay crew/work (replace Unsplash stock), testimonials from real customers
- P2: Booking form with slot picker (beyond WhatsApp), Google Maps coverage area, multilingual (Konkani/English), Instagram/social links

## Next Tasks
1. Replace stock imagery with real Relay photos when provided
2. Add customer testimonials section
3. Add FAQ section
