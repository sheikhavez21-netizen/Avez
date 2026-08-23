export const WA_NUMBER = "919665980103";
export const PHONE_DISPLAY = "+91 96659 80103";
export const PHONE_TEL = "tel:+919665980103";

export const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export const PACKAGES = [
  {
    code: "Sport",
    name: "Sport Wash",
    type: "Quick Exterior Wash Only",
    result: "The quick exterior reset.",
    price: "₹449",
    time: "30–40 mins",
    key: ["Snow Foam Hand Wash", "Tyre & Rim Cleaning", "Microfiber Drying"],
    more: ["Exterior Pre-wash", "Safe Hand Wash", "Tyre Dressing", "Exterior Glass Cleaning"],
  },
  {
    code: "GT",
    name: "GT Wash",
    type: "Exterior & Interior Cleaning",
    result: "The complete exterior + interior refresh.",
    price: "₹699",
    time: "60–75 mins",
    popular: true,
    key: ["Everything in Sport Wash", "Interior Vacuuming (Seats, Floor, Boot)", "Dashboard, Console & AC Vent Detailing"],
    more: ["Exterior Foam Wash (Coloured Foam)", "Interior Cleaning with Antibacterial Cleaner", "Interior Wipe with Microfiber", "Tyre Dressing & Exterior Polish", "Air Freshener", "Floor Mats Vacuumed & Cleaned"],
  },
  {
    code: "RS",
    name: "RS Signature Wash",
    type: "Interior & Exterior Detailing",
    result: "For the car that needs a full reset.",
    price: "₹1,299",
    time: "2.5–3 hrs",
    key: ["Everything in GT Wash", "Paint Decontamination", "Interior Deep Cleaning"],
    more: ["Interior Vacuuming (Deep Clean)", "Leather Conditioning", "Trim Restoration & Dressing", "Premium Fragrance Treatment"],
  },
  {
    code: "Ceramic",
    name: "Ceramic Turbo Wash",
    type: "Premium maintenance for ceramic & PPF vehicles.",
    result: "Safely refreshes and boosts hydrophobic performance of protected vehicles.",
    price: "₹999",
    time: "90–120 mins",
    key: ["Everything in GT Wash", "Ceramic Maintenance (Spray / Sealant)", "Hydrophobic Boost"],
    more: ["Enhanced Gloss & Shine", "Interior Protection (Dashboard, Trims)", "Tyre & Plastic Protection"],
  },
];

export const SUBSCRIPTIONS = [
  {
    tier: "Bronze",
    washes: "2 Washes / Month",
    price: "₹899",
    savings: "Save 10% on regular pricing",
    includes: ["1 Sport Wash", "1 GT Wash", "Priority Booking", "10% Savings"],
  },
  {
    tier: "Silver",
    washes: "4 Washes / Month",
    price: "₹1,699",
    savings: "Save 15% on regular pricing",
    includes: ["2 GT Wash", "1 RS Signature Wash", "1 Sport Wash", "Priority Booking", "15% Savings"],
  },
  {
    tier: "Gold",
    washes: "6 Washes / Month",
    price: "₹2,499",
    savings: "Save 20% on regular pricing",
    best: true,
    includes: ["3 GT Wash", "2 Sport Wash", "1 RS Signature Wash", "Priority Booking", "Ceramic Turbo at Member Pricing", "20% Savings"],
  },
  {
    tier: "Platinum",
    washes: "8 Washes / Month",
    price: "₹3,299",
    savings: "Save 25% on regular pricing",
    includes: ["4 GT Wash", "2 Sport Wash", "2 RS Signature Wash", "Priority Booking", "Ceramic Turbo at Member Pricing", "25% Savings"],
  },
];

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1624880056652-c7993c99190f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxwcmVtaXVtJTIwY2xlYW4lMjBjYXIlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzg3NDgzNTA0fDA&ixlib=rb-4.1.0&q=85",
  susegad: "https://images.unsplash.com/photo-1681679328683-c4d4ef25b90c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwyfHxnb2ElMjBwYWxtJTIwdHJlZXMlMjBzdW5saWdodHxlbnwwfHx8fDE3ODc0ODM1MDR8MA&ixlib=rb-4.1.0&q=85",
  detailing: "https://images.unsplash.com/photo-1694678505383-676d78ea3b96?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwzfHxjYXIlMjBkZXRhaWxpbmclMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc4NzQ4MzUwNHww&ixlib=rb-4.1.0&q=85",
};
