import { useEffect, useState } from "react";
import { Clock, Check, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { PACKAGES, PRICE_TYPE_MAP } from "../../data/content";
import { getVehicle } from "../../utils/auth";

const PKG_CODES = { Sport: "SPORT-01", GT: "GT-02", RS: "RS-03", Ceramic: "CT-04" };

export const Packages = () => {
  const [vehicle, setVehicleState] = useState(getVehicle());
  useEffect(() => {
    const h = () => setVehicleState(getVehicle());
    window.addEventListener("relay:vehicle-changed", h);
    return () => window.removeEventListener("relay:vehicle-changed", h);
  }, []);

  return (
    <section id="packages" data-testid="packages-section" className="py-24 sm:py-32 bg-[#F4F4F5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4 reveal">Our Packages</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 reveal">
          Choose your pit stop.
        </h2>
        {vehicle && (
          <p className="mt-3 text-sm font-semibold text-zinc-500 reveal" data-testid="packages-vehicle-note">
            Prices shown for your {vehicle.make} {vehicle.model}
          </p>
        )}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.map((p, i) => (
            <div
              key={p.code}
              data-testid={`package-card-${p.code.toLowerCase()}`}
              style={{ transitionDelay: `${i * 90}ms` }}
              className={`reveal relative flex flex-col bg-white rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                p.popular
                  ? "border-2 border-[#FF5A00] shadow-[0_8px_30px_rgba(255,90,0,0.12)]"
                  : "border border-zinc-200 shadow-sm hover:shadow-md"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-6 bg-[#FF5A00] text-white text-xs font-bold rounded-full px-3 py-1">
                  Most Popular
                </span>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF5A00]">{p.code}</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-300">{PKG_CODES[p.code]}</span>
              </div>
              <h3 className="font-display mt-2 text-2xl font-bold tracking-tight text-zinc-900">{p.name}</h3>
              <p className="mt-1 text-xs font-semibold text-zinc-500">{p.type}</p>
              <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{p.result}</p>
              {vehicle ? (
                <div className="mt-4 flex items-baseline gap-2" data-testid={`package-price-${p.code.toLowerCase()}`}>
                  <span className="font-display text-4xl font-black text-zinc-900">
                    ₹{(p.prices[PRICE_TYPE_MAP[vehicle.vehicleType] || "Compact SUV"]).toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-zinc-500">for your {vehicle.model}</span>
                </div>
              ) : (
                <a
                  href="/login"
                  data-testid={`package-price-hint-${p.code.toLowerCase()}`}
                  className="mt-4 text-xs font-bold text-zinc-400 hover:text-[#FF5A00] transition-colors"
                >
                  Log in &amp; add your car to see your price →
                </a>
              )}
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
                <Clock size={13} className="text-[#FF5A00]" />
                EST. {p.time}
              </div>
              <div className="my-5 border-t border-zinc-100" />
              <ul className="flex flex-col gap-2.5">
                {p.key.map((k) => (
                  <li key={k} className="flex gap-2 text-sm text-zinc-700">
                    <Check size={15} className="text-[#FF5A00] shrink-0 mt-0.5" />
                    {k}
                  </li>
                ))}
              </ul>
              <Accordion type="single" collapsible className="mt-3">
                <AccordionItem value="more" className="border-none">
                  <AccordionTrigger
                    data-testid={`package-inclusions-toggle-${p.code.toLowerCase()}`}
                    className="py-2 text-xs font-bold text-zinc-500 hover:text-[#FF5A00] hover:no-underline [&>svg]:hidden"
                  >
                    <span className="inline-flex items-center gap-1">
                      View all inclusions <ChevronDown size={13} />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-2 pb-1">
                      {p.more.map((m) => (
                        <li key={m} className="flex gap-2 text-xs text-zinc-600">
                          <Check size={13} className="text-[#FF5A00] shrink-0 mt-0.5" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <a
                href={`/book?pkg=${encodeURIComponent(p.name)}`}
                data-testid={`package-book-${p.code.toLowerCase()}`}
                className={`mt-auto pt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-colors active:scale-95 ${
                  p.popular
                    ? "bg-[#FF5A00] text-white hover:bg-[#E04F00]"
                    : "bg-zinc-900 text-white hover:bg-[#FF5A00]"
                }`}
              >
                Book Your Pit Stop →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
