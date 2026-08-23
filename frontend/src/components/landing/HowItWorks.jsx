import { MessageCircle, MapPin, BadgeCheck } from "lucide-react";

const STEPS = [
  { n: "01", icon: MessageCircle, h: "Book Your Pit Stop", p: "Book through WhatsApp — choose your package, share your location, pick a time. Done in under 2 minutes, no app, no sign-up." },
  { n: "02", icon: MapPin, h: "We Ride to You", p: "Our trained crew arrives with the required equipment and products. You don't move an inch." },
  { n: "03", icon: BadgeCheck, h: "We Clean. You Relax.", p: "Inspect the finished car and pay. No advance, no surprises. That's the Relay promise." },
];

export const HowItWorks = () => (
  <section id="how" data-testid="how-section" className="py-24 sm:py-32 bg-[#F4F4F5]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4 reveal">The Process</p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 reveal">
        Three steps.
        <br />
        Zero hassle.
      </h2>
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            data-testid={`how-step-${i + 1}`}
            className={`reveal bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${i === 1 ? "md:mt-8" : ""}`}
          >
            <div className="flex items-center justify-between">
              <s.icon size={28} className="text-[#FF5A00]" strokeWidth={2} />
              <span className="font-display text-4xl font-black text-zinc-100">{s.n}</span>
            </div>
            <h3 className="mt-6 text-xl font-bold text-zinc-900">{s.h}</h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{s.p}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
