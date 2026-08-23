import { useState } from "react";
import { MapPin, Search, CheckCircle2, Clock, XCircle } from "lucide-react";
import { SERVICE_AREAS, COMING_SOON_AREAS, waLink } from "../../data/content";

const normalize = (s) => s.toLowerCase().trim();

const matches = (q, area) => {
  const name = normalize(area.name);
  if (!q || q.length < 3) return false;
  return name.includes(q) || q.includes(name) || area.aliases.some((a) => q.includes(a) || a.includes(q));
};

export const AreaChecker = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const check = () => {
    const q = normalize(query);
    if (q.length < 3) {
      setResult({ type: "empty" });
      return;
    }
    const served = SERVICE_AREAS.find((a) => matches(q, a));
    if (served) return setResult({ type: "yes", name: served.name });
    const soon = COMING_SOON_AREAS.find((a) => matches(q, a));
    if (soon) return setResult({ type: "soon", name: soon.name });
    setResult({ type: "no", name: query.trim() });
  };

  return (
    <section id="areas" data-testid="area-checker-section" className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="reveal bg-[#F4F4F5] rounded-3xl p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4">Coverage</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Do we serve your area?
          </h2>
          <p className="mt-3 text-base text-zinc-600 leading-relaxed">
            Type your locality and get an instant answer. We're live across Panjim and expanding fast.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && check()}
                placeholder="e.g. Miramar, Dona Paula, Taleigao"
                data-testid="area-input"
                className="w-full rounded-full border border-zinc-200 bg-white pl-11 pr-4 py-3.5 text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 placeholder:font-normal focus:outline-none focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={check}
              data-testid="area-check-button"
              className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-[#FF5A00] text-white font-bold rounded-full px-7 py-3.5 transition-colors active:scale-95"
            >
              <Search size={16} />
              Check
            </button>
          </div>
          {result && (
            <div data-testid="area-result" className="mt-6">
              {result.type === "yes" && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-emerald-200 rounded-2xl p-5">
                  <CheckCircle2 size={26} className="text-emerald-500 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-zinc-900">Yes! We serve {result.name}.</p>
                    <p className="text-xs text-zinc-600 mt-0.5">Pick a slot and we'll ride over — no advance needed.</p>
                  </div>
                  <a
                    href="#book-slot"
                    data-testid="area-result-book-button"
                    className="inline-flex items-center justify-center bg-[#FF5A00] hover:bg-[#E04F00] text-white text-sm font-bold rounded-full px-5 py-2.5 transition-colors active:scale-95"
                  >
                    Book a Slot
                  </a>
                </div>
              )}
              {result.type === "soon" && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-[#FF5A00]/30 rounded-2xl p-5">
                  <Clock size={26} className="text-[#FF5A00] shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-zinc-900">Coming soon to {result.name}!</p>
                    <p className="text-xs text-zinc-600 mt-0.5">Join the priority list — you'll be first in line when we launch there.</p>
                  </div>
                  <a
                    href={waLink(`Hi Relay! Please add me to the priority list for ${result.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="area-result-waitlist-button"
                    className="inline-flex items-center justify-center bg-zinc-900 hover:bg-[#FF5A00] text-white text-sm font-bold rounded-full px-5 py-2.5 transition-colors active:scale-95"
                  >
                    Join Priority List
                  </a>
                </div>
              )}
              {result.type === "no" && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-zinc-200 rounded-2xl p-5">
                  <XCircle size={26} className="text-zinc-400 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-zinc-900">We're not in {result.name} yet.</p>
                    <p className="text-xs text-zinc-600 mt-0.5">Tell us where you are — demand decides where we ride next.</p>
                  </div>
                  <a
                    href={waLink(`Hi Relay! Do you serve ${result.name}? I'd love to book when you do`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="area-result-request-button"
                    className="inline-flex items-center justify-center bg-zinc-900 hover:bg-[#FF5A00] text-white text-sm font-bold rounded-full px-5 py-2.5 transition-colors active:scale-95"
                  >
                    Request My Area
                  </a>
                </div>
              )}
              {result.type === "empty" && (
                <p className="text-sm font-semibold text-red-600">Type at least 3 letters of your locality.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
