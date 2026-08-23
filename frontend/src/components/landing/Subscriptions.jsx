import { Check, CalendarClock, RefreshCcw, Star, Headphones } from "lucide-react";
import { SUBSCRIPTIONS, waLink } from "../../data/content";

const PERKS = [
  { icon: CalendarClock, h: "Flexible Rescheduling", p: "Change your wash date anytime — no penalties, no questions." },
  { icon: RefreshCcw, h: "Roll-over Unused Washes", p: "Didn't use all your washes? They carry forward to next month." },
  { icon: Star, h: "Exclusive Member Offers", p: "Early access to new services, seasonal offers, and loyalty rewards." },
  { icon: Headphones, h: "Dedicated Support", p: "Real person. Real help. Your coordinator is one WhatsApp away." },
];

export const Subscriptions = () => (
  <section id="subscriptions" data-testid="subscriptions-section" className="py-24 sm:py-32">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4 reveal">Relay Club</p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 reveal">
        Monthly care.
        <br />
        Maximum savings.
      </h2>
      <p className="mt-5 max-w-xl text-base lg:text-lg text-zinc-600 leading-relaxed reveal">
        Regular care. Priority booking. Your car stays spotless — every single month — without thinking about it.
      </p>
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBSCRIPTIONS.map((s) => (
          <div
            key={s.tier}
            data-testid={`subscription-card-${s.tier.toLowerCase()}`}
            className={`reveal relative flex flex-col bg-white rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
              s.best
                ? "border-2 border-[#FF5A00] shadow-[0_8px_30px_rgba(255,90,0,0.12)]"
                : "border border-zinc-200 shadow-sm hover:shadow-md"
            }`}
          >
            {s.best && (
              <span className="absolute -top-3.5 left-6 bg-[#FF5A00] text-white text-xs font-bold rounded-full px-3 py-1">
                Best Value
              </span>
            )}
            <span className="font-display text-xl font-bold text-zinc-900">{s.tier}</span>
            <span className="mt-1 text-xs font-semibold text-zinc-500">{s.washes}</span>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-3xl font-black text-zinc-900">{s.price}</span>
              <span className="text-xs text-zinc-500">/mo</span>
            </div>
            <span className="mt-2 inline-flex w-fit text-xs font-bold text-[#FF5A00] bg-[#FFF0E5] rounded-full px-3 py-1">
              {s.savings}
            </span>
            <div className="my-5 border-t border-zinc-100" />
            <ul className="flex flex-col gap-2.5 mb-6">
              {s.includes.map((i) => (
                <li key={i} className="flex gap-2 text-sm text-zinc-700">
                  <Check size={15} className="text-[#FF5A00] shrink-0 mt-0.5" />
                  {i}
                </li>
              ))}
            </ul>
            <a
              href={waLink(`Hi Relay! I want to subscribe to the ${s.tier} Plan`)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`subscription-join-${s.tier.toLowerCase()}`}
              className={`mt-auto inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-colors active:scale-95 ${
                s.best
                  ? "bg-[#FF5A00] text-white hover:bg-[#E04F00]"
                  : "bg-zinc-900 text-white hover:bg-[#FF5A00]"
              }`}
            >
              Join {s.tier} →
            </a>
          </div>
        ))}
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PERKS.map((p) => (
          <div key={p.h} className="reveal flex gap-4 bg-[#F4F4F5] rounded-2xl p-5">
            <div className="w-9 h-9 shrink-0 rounded-full bg-white border border-zinc-200 flex items-center justify-center">
              <p.icon size={16} className="text-[#FF5A00]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900">{p.h}</h4>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">{p.p}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
