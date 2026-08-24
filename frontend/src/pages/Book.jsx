import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, MessageCircle, BadgeCheck } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { PACKAGES, VEHICLES, TIME_SLOTS, PRICE_TYPE_MAP, waLink } from "../data/content";
import { getVehicle, setVehicle, getSession } from "../utils/auth";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STEPS = ["Car", "Service", "Slot", "Location", "Confirm"];

const fieldCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 placeholder:font-normal focus:outline-none focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 transition-colors disabled:bg-zinc-50 disabled:text-zinc-400";

const PKG_CODES = { Sport: "SPORT-01", GT: "GT-02", RS: "RS-03", Ceramic: "CT-04" };

const Progress = ({ step }) => (
  <div className="flex items-center mb-10" data-testid="book-progress">
    {STEPS.map((s, i) => (
      <div key={s} className="flex items-center flex-1 last:flex-none">
        <div className="flex flex-col gap-1.5">
          <span className={`text-[10px] font-bold tracking-[0.15em] ${i + 1 <= step ? "text-[#FF5A00]" : "text-zinc-300"}`}>
            0{i + 1}
          </span>
          <span className={`text-xs font-bold uppercase tracking-wider hidden sm:block ${i + 1 <= step ? "text-zinc-900" : "text-zinc-300"}`}>
            {s}
          </span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={`h-0.5 flex-1 mx-3 rounded ${i + 1 < step ? "bg-[#FF5A00]" : "bg-zinc-200"}`} />
        )}
      </div>
    ))}
  </div>
);

export default function Book() {
  const [params] = useSearchParams();
  const session = getSession();
  const stored = getVehicle();
  const [step, setStep] = useState(1);
  const [make, setMake] = useState(stored?.make || "");
  const [model, setModel] = useState(stored?.model || "");
  const [regNo, setRegNo] = useState("");
  const [pkg, setPkg] = useState(params.get("pkg") || "");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [area, setArea] = useState("");
  const [building, setBuilding] = useState("");
  const [payment, setPayment] = useState("cash");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const models = make ? VEHICLES.find((b) => b.brand === make)?.models || [] : [];
  const vType = model ? models.find((m) => m.name === model)?.vehicleType : null;
  const priceKey = vType ? PRICE_TYPE_MAP[vType] || "Compact SUV" : null;
  const selectedPkg = PACKAGES.find((p) => p.name === pkg);
  const today = new Date().toISOString().split("T")[0];
  const niceDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })
    : "";

  const next = () => {
    setError("");
    if (step === 1 && (!make || !model)) return setError("Select your car make and model.");
    if (step === 2 && !pkg) return setError("Choose your pit stop package.");
    if (step === 3 && (!date || !slot)) return setError("Pick a date and a time slot.");
    if (step === 4 && (!area.trim() || !building.trim())) return setError("Tell us the area and the building or landmark.");
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirm = async () => {
    setError("");
    setLoading(true);
    const payload = {
      name: null,
      phone: session?.phone || null,
      package_name: pkg,
      make,
      model,
      reg_no: regNo.trim() || null,
      date,
      slot,
      location: `${building.trim()}, ${area.trim()}`,
      payment_method: payment,
    };
    try {
      const r = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.detail || "Couldn't confirm — try again.");
      setVehicle({ make, model, vehicleType: vType || "Other" });
      setBookingId(data.id);
      setStep(6);
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const shortId = bookingId ? `RL-${bookingId.slice(0, 6).toUpperCase()}` : "";

  return (
    <div className="min-h-screen bg-[#F4F4F5]" data-testid="book-page">
      <Navbar />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-28 pb-24">
        {step <= 5 && (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-3">Book your pit stop</p>
            <Progress step={step} />
          </>
        )}

        {step === 1 && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-7 sm:p-9" data-testid="book-step-car">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">What are you driving?</h1>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Make <span className="text-[#FF5A00]">*</span></label>
                <select value={make} onChange={(e) => { setMake(e.target.value); setModel(""); }} data-testid="book-make-select" className={fieldCls}>
                  <option value="" disabled>Select make</option>
                  {VEHICLES.map((b) => (<option key={b.brand} value={b.brand}>{b.brand}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Model <span className="text-[#FF5A00]">*</span></label>
                <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!make} data-testid="book-model-select" className={fieldCls}>
                  <option value="" disabled>{make ? "Select model" : "Pick make first"}</option>
                  {models.map((m) => (<option key={m.name} value={m.name}>{m.name}</option>))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Registration number (optional)</label>
                <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value.toUpperCase())} placeholder="GA 01 AB 1234" data-testid="book-reg-input" className={fieldCls} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div data-testid="book-step-service">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 mb-6">Choose your pit stop</h1>
            <div className="grid sm:grid-cols-2 gap-4">
              {PACKAGES.map((p) => (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => setPkg(p.name)}
                  data-testid={`book-pkg-${p.code.toLowerCase()}`}
                  className={`text-left bg-white rounded-2xl border-2 p-6 transition-all duration-200 active:scale-95 ${
                    pkg === p.name ? "border-[#FF5A00] shadow-[0_8px_30px_rgba(255,90,0,0.12)]" : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400">{PKG_CODES[p.code]}</span>
                    {pkg === p.name && <Check size={16} className="text-[#FF5A00]" />}
                  </div>
                  <p className="font-display mt-2 text-xl font-bold text-zinc-900">{p.name}</p>
                  <p className="text-xs text-zinc-500 mt-1">{p.type} · Est. {p.time}</p>
                  {priceKey && (
                    <p className="mt-3 font-display text-2xl font-black text-zinc-900">
                      ₹{p.prices[priceKey].toLocaleString("en-IN")}
                      <span className="text-xs font-semibold text-zinc-400 ml-1.5">for your {model}</span>
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-7 sm:p-9" data-testid="book-step-slot">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">Choose your slot</h1>
            <div className="mt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Date</label>
              <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} data-testid="book-date-input" className={fieldCls} />
            </div>
            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Time slot</label>
              <div className="flex flex-wrap gap-2.5">
                {TIME_SLOTS.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    data-testid={`book-slot-${i + 1}`}
                    className={`rounded-full px-5 py-3 text-sm font-bold transition-colors active:scale-95 ${
                      slot === s ? "bg-[#FF5A00] text-white" : "bg-zinc-100 text-zinc-700 hover:bg-[#FFF0E5] hover:text-[#FF5A00]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-7 sm:p-9" data-testid="book-step-location">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">Where's your car?</h1>
            <div className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Area / locality <span className="text-[#FF5A00]">*</span></label>
                <input type="text" value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g. Miramar, Panjim" data-testid="book-area-input" className={fieldCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Building / street / landmark <span className="text-[#FF5A00]">*</span></label>
                <input type="text" value={building} onChange={(e) => setBuilding(e.target.value)} placeholder="e.g. Citi Residency, Block B parking" data-testid="book-building-input" className={fieldCls} />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-7 sm:p-9" data-testid="book-step-confirm">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">Confirm your pit stop</h1>
            <div className="mt-6 divide-y divide-zinc-100 text-sm">
              {[
                ["Car", `${make} ${model}${regNo ? ` · ${regNo}` : ""}`],
                ["Service", selectedPkg ? `${selectedPkg.name}${priceKey ? ` · ₹${selectedPkg.prices[priceKey].toLocaleString("en-IN")}` : ""}` : ""],
                ["Slot", `${niceDate} · ${slot}`],
                ["Location", `${building}, ${area}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{k}</span>
                  <span className="font-bold text-zinc-900 text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Payment</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { v: "cash", h: "Cash", p: "Pay after you inspect the car" },
                  { v: "upi", h: "UPI", p: "We share our UPI ID on WhatsApp after the wash" },
                ].map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setPayment(o.v)}
                    data-testid={`book-payment-${o.v}`}
                    className={`text-left rounded-2xl border-2 p-4 transition-colors ${
                      payment === o.v ? "border-[#FF5A00] bg-[#FFF0E5]" : "border-zinc-200 bg-white hover:border-zinc-300"
                    }`}
                  >
                    <p className="text-sm font-bold text-zinc-900">{o.h}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{o.p}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 sm:p-10 text-center" data-testid="book-success">
            <div className="w-14 h-14 rounded-full bg-[#FF5A00] mx-auto flex items-center justify-center">
              <BadgeCheck size={28} className="text-white" />
            </div>
            <h1 className="font-display mt-6 text-3xl font-extrabold tracking-tight text-zinc-900">Pit stop confirmed.</h1>
            <p className="mt-2 text-sm text-zinc-500">Booking ID</p>
            <p className="font-display text-2xl font-black tracking-widest text-[#FF5A00]" data-testid="book-success-id">{shortId}</p>
            <div className="mt-6 text-sm text-zinc-600 space-y-1">
              <p className="font-bold text-zinc-900">{pkg}</p>
              <p>{make} {model}{regNo ? ` · ${regNo}` : ""}</p>
              <p>{niceDate} · {slot}</p>
              <p>{building}, {area}</p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`/track?id=${bookingId}`}
                data-testid="book-track-button"
                className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-[#FF5A00] text-white font-bold rounded-full px-7 py-3.5 transition-colors active:scale-95"
              >
                Track My Pit Stop
              </a>
              <a
                href={waLink(`Hi Relay! Booking ${shortId} — ${pkg} for my ${make} ${model} on ${niceDate}, ${slot} at ${building}, ${area}`)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="book-whatsapp-button"
                className="inline-flex items-center justify-center gap-2 border border-zinc-300 hover:border-[#FF5A00] text-zinc-800 font-bold rounded-full px-7 py-3.5 transition-colors active:scale-95"
              >
                <MessageCircle size={16} />
                Send to WhatsApp
              </a>
            </div>
          </div>
        )}

        {error && <p data-testid="book-error" className="mt-4 text-sm font-semibold text-red-600">{error}</p>}

        {step <= 5 && (
          <div className="mt-7 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => { setError(""); setStep(step - 1); }}
                data-testid="book-back-button"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 hover:text-[#FF5A00] transition-colors"
              >
                <ArrowLeft size={15} />
                Back
              </button>
            ) : <span />}
            {step < 5 ? (
              <button
                type="button"
                onClick={next}
                data-testid="book-next-button"
                className="inline-flex items-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-8 py-4 transition-colors active:scale-95"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={confirm}
                disabled={loading}
                data-testid="book-confirm-button"
                className="inline-flex items-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-8 py-4 transition-colors active:scale-95 disabled:opacity-60"
              >
                <Check size={17} />
                {loading ? "Confirming…" : "Confirm Pit Stop"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
