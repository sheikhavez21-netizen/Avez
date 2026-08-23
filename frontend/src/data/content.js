export const WA_NUMBER = "919665980103";
export const PHONE_DISPLAY = "+91 96659 80103";
export const PHONE_TEL = "tel:+919665980103";

export const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export const CAR_TYPES = ["Hatchback", "Sedan", "Compact SUV", "Large SUV"];

export const PACKAGES = [
  {
    code: "Sport",
    name: "Sport Wash",
    type: "Quick Exterior Wash Only",
    result: "The quick exterior reset.",
    price: "₹449",
    prices: { Hatchback: 449, Sedan: 499, "Compact SUV": 549, "Large SUV": 599 },
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
    prices: { Hatchback: 699, Sedan: 749, "Compact SUV": 799, "Large SUV": 899 },
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
    prices: { Hatchback: 1299, Sedan: 1399, "Compact SUV": 1499, "Large SUV": 1699 },
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
    prices: { Hatchback: 999, Sedan: 1099, "Compact SUV": 1199, "Large SUV": 1299 },
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

export const VIDEO = "/assets/relay-wash.mp4";
export const VIDEO_WEBM = "/assets/relay-wash.webm";

export const IMAGES = {
  heroPoster: "/assets/wash-1.jpg",
  susegad: "/assets/wash-2.jpg",
  detailing: "/assets/wash-3.jpg",
};

export const TESTIMONIALS = [
  {
    quote: "Booked on WhatsApp at 9am, car was gleaming by lunch. I didn't leave my balcony. This is how car care should work in Goa.",
    name: "Rohan Dessai",
    area: "Panjim",
    plan: "GT Wash customer",
  },
  {
    quote: "My car has ceramic coating and I'm picky about who touches it. The Relay crew knew exactly what they were doing — proper products, no shortcuts.",
    name: "Alisha Fernandes",
    area: "Panjim",
    plan: "Ceramic Turbo customer",
  },
  {
    quote: "I'm on the Gold plan now. Same crew, same standard, every single month. My car hasn't seen a wash bay queue in six months.",
    name: "Vikram Kamat",
    area: "Panjim",
    plan: "Relay Club Gold member",
  },
];

export const FAQS = [
  {
    q: "Are your products safe for ceramic-coated and PPF cars?",
    a: "Yes. We use professional-grade, pH-balanced car-care products specifically selected to be safe on ceramic coatings, PPF and regular paint. The Ceramic Turbo Wash is designed exactly for protected vehicles.",
  },
  {
    q: "Do you need water or electricity from my home?",
    a: "Yes — our equipment needs access to a regular water tap and a power outlet at your location. The booking form will ask you to confirm both before we can proceed.",
  },
  {
    q: "How long does a wash take?",
    a: "Sport Wash takes 30–40 minutes, GT Wash 60–75 minutes, Ceramic Turbo 90–120 minutes, and the RS Signature Wash about 2.5–3 hours. You carry on with your day while we work.",
  },
  {
    q: "How do I book or reschedule?",
    a: "Everything happens on WhatsApp — message us, pick your package, share your location and a time slot. Done in under 2 minutes. Need to reschedule? Just message us again, no penalties.",
  },
  {
    q: "When do I pay?",
    a: "After the wash, once you've inspected the car and you're happy. No advance payment, no hidden charges. That's the Relay promise.",
  },
  {
    q: "Which areas do you cover?",
    a: "We're currently serving Panjim and expanding across Goa. Message us your location on WhatsApp and we'll confirm availability for your area.",
  },
];

export const TIME_SLOTS = ["8–10 AM", "10 AM–12 PM", "12–2 PM", "2–4 PM", "4–6 PM"];

export const SERVICE_AREAS = [
  { name: "Panjim", aliases: ["panjim", "panaji", "panaja"] },
  { name: "Miramar", aliases: ["miramar"] },
  { name: "Dona Paula", aliases: ["dona paula", "donapaula"] },
  { name: "Taleigao", aliases: ["taleigao", "taleigaon"] },
  { name: "Caranzalem", aliases: ["caranzalem"] },
  { name: "Bambolim", aliases: ["bambolim"] },
  { name: "Campal", aliases: ["campal"] },
  { name: "Altinho", aliases: ["altinho"] },
  { name: "Fontainhas", aliases: ["fontainhas", "fontainha"] },
  { name: "St. Inez", aliases: ["st inez", "santa inez", "santinez", "ineze"] },
  { name: "Mala", aliases: ["mala"] },
  { name: "Patto", aliases: ["patto", "pato"] },
  { name: "Ribandar", aliases: ["ribandar"] },
  { name: "Santa Cruz", aliases: ["santa cruz", "santacruz"] },
  { name: "Merces", aliases: ["merces"] },
];

export const COMING_SOON_AREAS = [
  { name: "Porvorim", aliases: ["porvorim"] },
  { name: "Mapusa", aliases: ["mapusa", "mapsa"] },
  { name: "Margao", aliases: ["margao", "madgaon"] },
  { name: "Vasco", aliases: ["vasco", "vasco da gama"] },
  { name: "Calangute", aliases: ["calangute"] },
  { name: "Candolim", aliases: ["candolim"] },
];
