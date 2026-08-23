import { useEffect, useState } from "react";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { PACKAGES, TIME_SLOTS, waLink } from "../../data/content";

const fieldCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 placeholder:font-normal focus:outline-none focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 transition-colors";

export const BookingForm = () => {
  const [pkg, setPkg] = useState(PACKAGES[1].name);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = (e) => setPkg(e.detail);
    window.addEventListener("relay:select-package", handler);
    return () => window.removeEventListener("relay:select-package", handler);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const submit = () => {
    if (!date || !slot || !location.trim()) {
      setError("Please pick a date, a time slot and tell us where the car is.");
      return;
    }
    setError("");
    const niceDate = new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const lines = [
      "Hi Relay! I'd like to book a wash.",
      "",
      `Package: ${pkg}`,
      `Date: ${niceDate}`,
      `Time slot: ${slot}`,
      `Location: ${location.trim()}`,
    ];
    if (name.trim()) lines.push(`Name: ${name.trim()}`);
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="book-slot" data-testid="booking-form-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-2 reveal">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4">Book a Slot</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900">
            Pick your slot.
            <br />
            We ride over.
          </h2>
          <p className="mt-5 text-base lg:text-lg text-zinc-600 leading-relaxed">
            Choose your package, date and time. We confirm on WhatsApp — no apps, no accounts, no advance payment.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {["No advance — pay after you inspect the car", "Free rescheduling over WhatsApp", "Same crew, same standard, every time"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
                <span className="w-2 h-2 rounded-full bg-[#FF5A00] shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3 reveal">
          <div className="bg-white border border-zinc-200 rounded-3xl p-7 sm:p-9 shadow-[0_16px_50px_rgba(0,0,0,0.06)]">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Your name (optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohan"
                  data-testid="booking-name-input"
                  className={fieldCls}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Package</label>
                <select
                  value={pkg}
                  onChange={(e) => setPkg(e.target.value)}
                  data-testid="booking-package-select"
                  className={fieldCls}
                >
                  {PACKAGES.map((p) => (
                    <option key={p.code} value={p.name}>
                      {p.name} · {p.price} onwards
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  data-testid="booking-date-input"
                  className={fieldCls}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Building / street / landmark"
                  data-testid="booking-location-input"
                  className={fieldCls}
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Time slot</label>
              <div className="flex flex-wrap gap-2.5">
                {TIME_SLOTS.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    data-testid={`booking-slot-${i + 1}`}
                    className={`rounded-full px-4 py-2.5 text-sm font-bold transition-colors active:scale-95 ${
                      slot === s
                        ? "bg-[#FF5A00] text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-[#FFF0E5] hover:text-[#FF5A00]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {error && (
              <p data-testid="booking-error" className="mt-4 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={submit}
              data-testid="booking-submit-button"
              className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-8 py-4 transition-colors active:scale-95"
            >
              <CalendarCheck size={18} />
              Confirm Booking on WhatsApp
            </button>
            <p className="mt-3 text-center text-xs text-zinc-500">
              Opens WhatsApp with your booking pre-filled — just hit send. <MessageCircle size={11} className="inline text-[#FF5A00]" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
