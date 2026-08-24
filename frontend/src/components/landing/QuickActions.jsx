import { CalendarCheck, Sparkles, MessageCircle } from "lucide-react";

const TILES = [
  { icon: CalendarCheck, title: "Book a Wash", sub: "Pick a slot in 2 minutes", href: "/book", testid: "quick-book" },
  { icon: Sparkles, title: "View Packages", sub: "From quick resets to full details", href: "#packages", testid: "quick-packages" },
  { icon: MessageCircle, title: "Track My Pit Stop", sub: "Follow your crew live", href: "/track", testid: "quick-track" },
];

export const QuickActions = () => (
  <section data-testid="quick-actions-section" className="py-14 sm:py-20 border-b border-zinc-100">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-6 reveal">What would you like to do today?</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {TILES.map((t, i) => (
          <a
            key={t.title}
            href={t.href}
            target={t.external ? "_blank" : undefined}
            rel={t.external ? "noopener noreferrer" : undefined}
            data-testid={t.testid}
            style={{ transitionDelay: `${i * 80}ms` }}
            className="reveal group flex items-center gap-4 bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#FF5A00]/40 transition-all duration-300"
          >
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#FFF0E5] flex items-center justify-center group-hover:bg-[#FF5A00] transition-colors">
              <t.icon size={22} className="text-[#FF5A00] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-base font-bold text-zinc-900">{t.title}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{t.sub}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
