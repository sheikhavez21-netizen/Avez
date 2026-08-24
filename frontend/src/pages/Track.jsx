import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Check } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STATUS_STEPS = [
  "Pit Stop Confirmed",
  "Crew Assigned",
  "Pit Crew On The Way",
  "Arrived",
  "Service In Progress",
  "Pit Stop Complete",
];

const ETA = {
  0: "Confirming your slot with the crew",
  1: "Crew assignment in progress",
  2: "Crew is rolling — arrival within your slot window",
  3: "Crew is at your location",
  4: "Your car is being detailed",
  5: "Done. Inspect your car and pay",
};

export default function Track() {
  const [params] = useSearchParams();
  const [input, setInput] = useState(params.get("id") || "");
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBooking = async (id) => {
    const clean = id.trim().replace(/^RL-/i, "");
    if (!clean) return;
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`${API}/bookings/${clean}`);
      const data = await r.json();
      if (!r.ok) throw new Error(data.detail || "Booking not found");
      setBooking(data);
    } catch (e) {
      setError("We couldn't find that booking. Check the ID and try again.");
      setBooking(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    const id = params.get("id");
    if (id) fetchBooking(id);
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const currentIndex = booking ? (booking.date > today ? 1 : booking.date === today ? 2 : 5) : 0;

  return (
    <div className="min-h-screen bg-[#F4F4F5]" data-testid="track-page">
      <Navbar />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-28 pb-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-3">Relay // Pit Crew</p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">Track my pit stop</h1>
        {!booking && (
          <div className="mt-8 bg-white border border-zinc-200 rounded-3xl p-7">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Booking ID</label>
            <div className="flex gap-2.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchBooking(input)}
                placeholder="RL-XXXXXX"
                data-testid="track-id-input"
                className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm font-semibold uppercase focus:outline-none focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 transition-colors"
              />
              <button
                onClick={() => fetchBooking(input)}
                disabled={loading}
                data-testid="track-search-button"
                className="inline-flex items-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-6 py-3 transition-colors active:scale-95 disabled:opacity-60"
              >
                <Search size={16} />
                {loading ? "…" : "Track"}
              </button>
            </div>
            {error && <p data-testid="track-error" className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
          </div>
        )}

        {booking && (
          <div data-testid="track-result">
            <div className="mt-8 bg-white border border-zinc-200 rounded-3xl p-7">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400">BOOKING</span>
                <span className="font-display font-black tracking-widest text-[#FF5A00]">RL-{booking.id.slice(0, 6).toUpperCase()}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400">SERVICE</p>
                  <p className="font-bold text-zinc-900 mt-0.5">{booking.package_name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400">VEHICLE</p>
                  <p className="font-bold text-zinc-900 mt-0.5">{booking.make} {booking.model}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400">SLOT</p>
                  <p className="font-bold text-zinc-900 mt-0.5">{booking.date} · {booking.slot}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400">LOCATION</p>
                  <p className="font-bold text-zinc-900 mt-0.5">{booking.location}</p>
                </div>
              </div>
              <div className="mt-5 bg-[#FFF0E5] rounded-xl px-4 py-3">
                <p className="text-xs font-bold text-[#FF5A00]" data-testid="track-eta">
                  ETA — {ETA[currentIndex]}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-white border border-zinc-200 rounded-3xl p-7">
              {STATUS_STEPS.map((s, i) => {
                const done = i < currentIndex;
                const current = i === currentIndex;
                return (
                  <div key={s} className="flex gap-4" data-testid={`track-step-${i + 1}`}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          done
                            ? "bg-[#FF5A00] text-white"
                            : current
                              ? "bg-white border-2 border-[#FF5A00]"
                              : "bg-zinc-100"
                        }`}
                      >
                        {done ? (
                          <Check size={14} />
                        ) : current ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A00] animate-pulse" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-zinc-300" />
                        )}
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div className={`w-0.5 flex-1 my-1 ${done ? "bg-[#FF5A00]" : "bg-zinc-200"}`} style={{ minHeight: 28 }} />
                      )}
                    </div>
                    <div className="pb-7">
                      <p className={`text-sm font-bold uppercase tracking-wide ${current ? "text-[#FF5A00]" : done ? "text-zinc-900" : "text-zinc-300"}`}>
                        {s}
                      </p>
                      {current && <p className="text-xs text-zinc-500 mt-0.5">{ETA[i]}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => { setBooking(null); setInput(""); }}
              data-testid="track-another-button"
              className="mt-5 text-sm font-bold text-zinc-500 hover:text-[#FF5A00] transition-colors"
            >
              ← Track another booking
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
