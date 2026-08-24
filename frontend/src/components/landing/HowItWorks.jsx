import { MessageCircle, MapPin, BadgeCheck } from "lucide-react";

const STEPS = [
  { icon: MessageCircle, h: "Book Your Pit Stop", p: "Pick your package, share your location, choose a slot — on the site or WhatsApp. Under two minutes, no app." },
  { icon: MapPin, h: "We Ride to You", p: "A trained, verified crew arrives with the right equipment and products. You don't move an inch." },
  { icon: BadgeCheck, h: "We Clean. You Relax.", p: "Inspect the finished car, then pay. No advance, no surprises. That's the Relay promise." },
];

export const HowItWorks = () => (
  <section id="how" data-testid="how-section" className="py-24 sm:py-32">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4 reveal">How It Works</p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 reveal">
        Three steps. Zero hassle.
      </h2>
      <div className="mt-14 relative">
        <div className="hidden md:block absolute top-6 left-6 right-6 h-0.5 bg-zinc-200" />
        <div className="hidden md:block absolute top-6 left-6 h-0.5 bg-[#FF5A00] w-1/3" />
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {STEPS.map((s, i) => (
            <div key={s.h} data-testid={`how-step-${i + 1}`} style={{ transitionDelay: `${i * 110}ms` }} className="reveal relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-[#FF5A00] flex items-center justify-center relative z-10">
                  <s.icon size={20} className="text-[#FF5A00]" strokeWidth={2} />
                </div>
                <span className="font-display text-sm font-black tracking-[0.2em] text-zinc-300">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-zinc-900">{s.h}</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed max-w-xs">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
