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
- 2026-08-23 (v2): Monthly plans moved off the home page to dedicated /monthly route (nav "Monthly Plans" pill links there). Relay wash video added to hero (transcoded H.264 mp4 + VP8 webm for browser compatibility, autoplay muted loop). Real photos: frames extracted from the wash video replace all stock images (hero poster, philosophy, why-relay). Logo made transparent (white background removed). New Testimonials section (3 Panjim customer quotes — PLACEHOLDER quotes, need real ones). New FAQ section (6 tap-to-expand questions on products, water/electricity, timing, booking, payment, coverage).
- 2026-08-23 (v3): Slot booking form (id=book-slot) after Packages — name (optional), package select, date picker, 5 time-slot chips, location; validates then opens WhatsApp with pre-filled booking message. Package card buttons pre-select their package in the form via "relay:select-package" event and scroll to it. Hero + mobile sticky CTAs now scroll to the form. Area Checker (id=areas) — locality input with instant yes/coming-soon/not-yet answers against 15 served + 6 coming-soon Goan localities; results link to booking form or WhatsApp waitlist/request.
- 2026-08-23 (v4): Backend: POST /api/bookings (public, saves to MongoDB), GET /api/blocked-slots?date= (public), admin-key-protected (X-Admin-Key, compare_digest) GET /api/admin/bookings, GET/POST/DELETE /api/admin/blocked-slots. Owner dashboard at /admin (key-gated): bookings list + blocked slot manager (whole-day or per-slot, dedupe 409). Booking form disables blocked slot chips live and blocks fully-booked days. Booking form now requires car type (Hatchback/Sedan/Compact SUV/Large SUV) with per-type price estimate shown, and mandatory water + electricity Yes/No — No on either blocks the booking. FAQ water/electricity answer updated to match. Design upgrade: lenis momentum scrolling with anchor interception, framer-motion kinetic hero (masked line-by-line reveal, parallax + mouse-tilt 3D video card), editorial outlined-text marquee, staggered reveals on packages/steps, manifesto chapter numerals restyled. Car-type prices are ESTIMATES pending owner confirmation.
- 2026-08-23 (v5): Merged water + electricity into a single required "Water & electricity available?" Yes/No (utilities_available field) — No blocks the booking. Testimonials/Reviews section removed entirely (business not launched yet, no real reviews) along with its nav link.
- 2026-08-23 (v6): How It Works ("Three steps. Zero hassle.") section and its nav link removed. Booking form now requires a map pin: Leaflet/OpenStreetMap map (no API key) with tap-to-pin, draggable marker, and "Use my current location" (browser geolocation). Pin is saved with the booking (lat/lng) and included in the WhatsApp message as a Google Maps link (https://maps.google.com/?q=lat,lng) — structured for the owner's planned WhatsApp chatbot. Admin dashboard booking rows link to the pinned location.
- 2026-08-23 (v7): Address search added above the map (Nominatim geocoding, Goa-biased, no API key) — customer types their address/area, hits "Find on map", pin drops automatically; tap/drag fine-tuning and current-location button retained.

## Verified
- Page loads, all sections render, package accordion expands, backend /api/ healthy
- v2: subscriptions absent from home, present on /monthly; FAQ accordion expands; hero video plays (verified time advancing); logo transparent on glass nav
- v3: package card click pre-selects "RS Signature Wash" in form; empty submit shows validation error; filled submit opens wa.me with full pre-filled message (verified decoded text); area checker: Miramar → served, Porvorim → coming soon, unknown → not yet (all verified)

## Backlog
- P0: Replace placeholder testimonial quotes with real customer quotes
- P1: More real photos/videos of crew at work, Google Maps coverage area
- P2: Booking form with slot picker (beyond WhatsApp), multilingual (Konkani/English), Instagram/social links

## Next Tasks
1. Replace stock imagery with real Relay photos when provided
2. Add customer testimonials section
3. Add FAQ section
