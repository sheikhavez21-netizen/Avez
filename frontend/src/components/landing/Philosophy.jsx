import { IMAGES } from "../../data/content";

const PILLARS = [
  { n: "01", h: "Your time is yours", p: "No driving to a wash centre. No waiting. No wasted Saturday mornings. We come to your driveway, your parking spot, your building lobby." },
  { n: "02", h: "Products that respect your car", p: "Professional-grade car-care products, selected for safe and proper vehicle care — including PPF and ceramic-coated finishes." },
  { n: "03", h: "A crew you can trust", p: "Every Relay washer is trained, verified and equipped with the right tools. Proper equipment. Consistent standards." },
  { n: "04", h: "Book in 2 minutes", p: "WhatsApp us, pick a slot, share your location. No apps, no accounts, no forms. Done." },
];

export const Philosophy = () => (
  <section id="philosophy" data-testid="philosophy-section" className="py-24 sm:py-32 bg-[#F4F4F5]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14">
      <div className="reveal">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-5">The Relay Philosophy</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
          This is Goa.
          <br />
          We do things differently.
        </h2>
        <p className="mt-6 text-base lg:text-lg text-zinc-600 leading-relaxed">
          In Goa, <strong className="text-zinc-900">Susegad</strong> is a way of life — contentment, ease, and the quiet joy of not rushing. But your car still needs cleaning, and you shouldn't spend your weekend in a queue at a noisy wash bay.
        </p>
        <p className="mt-4 text-base lg:text-lg text-zinc-600 leading-relaxed">
          <strong className="text-zinc-900">That's why we built Relay.</strong> Book in two minutes. We ride to you. You handle the Susegad — we handle the car.
        </p>
        <div className="mt-8 rounded-2xl overflow-hidden border border-zinc-200">
          <img src={IMAGES.susegad} alt="Relay snow foam wash in action" className="w-full h-56 object-cover" data-testid="philosophy-image" />
        </div>
        <blockquote className="mt-8 border-l-4 border-[#FF5A00] pl-5">
          <p className="text-lg font-semibold text-zinc-900">"Relax. We'll take care of the car."</p>
          <span className="text-sm text-zinc-500">— The Relay Promise</span>
        </blockquote>
      </div>
      <div className="reveal flex flex-col gap-8 lg:pt-16">
        {PILLARS.map((p) => (
          <div key={p.n} className="flex gap-6 group">
            <span className="font-display italic text-5xl font-black text-zinc-200 group-hover:text-[#FF5A00] transition-colors leading-none">
              {p.n}
            </span>
            <div>
              <h4 className="text-lg font-bold text-zinc-900">{p.h}</h4>
              <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{p.p}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
