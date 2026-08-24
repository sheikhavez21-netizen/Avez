const STANDARDS = [
  {
    h: "Trained & Verified Crew",
    p: "Every Relay Captain is trained on our process and verified — not an ad-hoc crew with a bucket and a pressure washer.",
  },
  {
    h: "Premium-Grade Products",
    p: "European car-care products, lab-tested for performance — safe on regular paint, PPF and ceramic coatings alike.",
  },
  {
    h: "Proper Equipment",
    p: "The right tools for the job, carried to your doorstep on every single visit.",
  },
  {
    h: "Consistent Process",
    p: "The same wash methodology every time, so the result never depends on who shows up.",
  },
  {
    h: "Doorstep, On Your Time",
    p: "No queues, no wash-bay waiting. Your driveway, your slot.",
  },
];

export const Philosophy = () => (
  <section id="philosophy" data-testid="philosophy-section" className="py-24 sm:py-32 bg-[#F4F4F5]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
        <div className="reveal">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-5">The Relay Philosophy</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            This is Goa.
            <br />
            We do things differently.
          </h2>
          <div className="mt-7 space-y-4 text-base lg:text-lg text-zinc-600 leading-relaxed max-w-lg">
            <p>
              In Goa, <strong className="text-zinc-900">Susegad</strong> is a way of life — contentment, ease, and the quiet joy of not rushing.
            </p>
            <p>
              But your car still needs cleaning, and you shouldn't have to spend your weekend driving to a wash centre and waiting in a queue.
            </p>
            <p>
              <strong className="text-zinc-900">That's why we built Relay.</strong> Book in two minutes. We ride to you. You handle the Susegad — we handle the car.
            </p>
          </div>
        </div>
        <div className="reveal lg:pt-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">The Relay Standard</p>
          <div className="flex flex-col gap-10">
            {STANDARDS.map((s) => (
              <div key={s.h} className="group" data-testid={`standard-${s.h.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                <div className="w-8 h-0.5 bg-[#FF5A00] mb-4 group-hover:w-14 transition-all duration-500" />
                <h4 className="text-lg font-bold tracking-tight text-zinc-900">{s.h}</h4>
                <p className="mt-2 text-sm sm:text-[15px] text-zinc-600 leading-relaxed max-w-md">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <blockquote className="reveal mt-16 sm:mt-20 border-l-4 border-[#FF5A00] pl-6 max-w-xl" data-testid="philosophy-quote">
        <p className="font-display italic text-xl sm:text-2xl font-bold text-zinc-900">"Relax. We'll take care of the car."</p>
        <span className="mt-2 block text-sm text-zinc-500">— The Relay Promise</span>
      </blockquote>
    </div>
  </section>
);
