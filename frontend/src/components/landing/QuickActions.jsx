import { CalendarCheck, Sparkles, MessageCircle } from "lucide-react";
import { waLink } from "../../data/content";

const TILES = [
  { icon: CalendarCheck, title: "Book a Wash", sub: "Pick a slot in 2 minutes", href: "#book-slot", testid: "quick-book" },
  { icon: Sparkles, title: "View Packages", sub: "From quick resets to full details", href: "#packages", testid: "quick-packages" },
  { icon: MessageCircle, title: "Chat on WhatsApp", sub: "Questions? We reply fast", href: waLink("Hi Relay! I have a question"), external: true, testid: "quick-whatsapp" },
];

const STATS = [
  { n: "2 min", label: "To book a wash" },
  { n: "15+", label: "Localities covered" },
  { n: "5", label: "Slots every day" },
  { n: "100%", label: "Doorstep service" },
];

export const QuickActions = () => (
  <section data-testid="quick-actions-section" className="py-14 sm:py-20 border-b border-zinc-100">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-6 reveal">What would you like to do today?</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {TILES.map((t) => (
          <a
            key={t.title}
            href={t.href}
            target={t.external ? "_blank" : undefined}
            rel={t.external ? "noopener noreferrer" : undefined}
            data-testid={t.testid}
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
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 reveal" data-testid="stats-bar">
        {STATS.map((s) => (
          <div key={s.label} className="border-l-2 border-[#FF5A00] pl-4">
            <p className="font-display text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">{s.n}</p>
            <p className="text-xs font-semibold text-zinc-500 mt-1 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
