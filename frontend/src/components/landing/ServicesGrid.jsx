import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "../../data/content";

export const ServicesGrid = () => {
  const pick = (pkg) => {
    window.dispatchEvent(new CustomEvent("relay:select-package", { detail: pkg }));
    document.querySelector("#book-slot")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" data-testid="services-section" className="py-24 sm:py-32 bg-[#F4F4F5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4 reveal">Our Services</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 reveal">
          What does your car
          <br />
          need today?
        </h2>
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => pick(s.pkg)}
              data-testid={`service-card-${i + 1}`}
              style={{ transitionDelay: `${i * 90}ms` }}
              className="reveal group relative rounded-3xl overflow-hidden border border-zinc-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left"
            >
              <div className="h-44 sm:h-56 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-5 flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-[#FF5A00] transition-colors">{s.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{s.desc}</p>
                </div>
                <div className="w-8 h-8 shrink-0 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-[#FF5A00] transition-colors">
                  <ArrowUpRight size={15} className="text-zinc-600 group-hover:text-white transition-colors" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
