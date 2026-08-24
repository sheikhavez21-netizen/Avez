import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, LogOut, Car, CalendarClock, History } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { VEHICLES } from "../data/content";
import { getSession, setVehicle, clearSession, clearVehicle } from "../utils/auth";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fieldCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 transition-colors disabled:bg-zinc-50 disabled:text-zinc-400";

const BookingRow = ({ b, testid, trackable }) => (
  <li data-testid={testid} className="border border-zinc-100 rounded-2xl p-4 flex items-center justify-between gap-3">
    <div>
      <p className="text-sm font-bold text-zinc-900">{b.package_name}</p>
      <p className="text-xs text-zinc-500 mt-0.5">{b.date} · {b.slot} · {b.location}</p>
      <p className="text-xs font-bold text-[#FF5A00] mt-1 tracking-widest">RL-{b.id.slice(0, 6).toUpperCase()}</p>
    </div>
    {trackable && (
      <a
        href={`/track?id=${b.id}`}
        data-testid={`${testid}-track`}
        className="shrink-0 inline-flex items-center bg-zinc-900 hover:bg-[#FF5A00] text-white text-xs font-bold rounded-full px-4 py-2 transition-colors"
      >
        Track
      </a>
    )}
  </li>
);

export default function Account() {
  const navigate = useNavigate();
  const [session] = useState(getSession());
  const [name, setName] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [vtype, setVtype] = useState("");
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }
    const headers = { Authorization: `Bearer ${session.token}` };
    fetch(`${API}/profile`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => {
        if (p) {
          setName(p.name || "");
          if (p.make) {
            setMake(p.make);
            setModel(p.model || "");
            setVtype(p.vehicleType || "");
          }
        }
      })
      .catch(() => {});
    fetch(`${API}/my/bookings`, { headers })
      .then((r) => (r.ok ? r.json() : []))
      .then(setBookings)
      .catch(() => {});
  }, []);

  if (!session) return null;

  const models = make ? VEHICLES.find((b) => b.brand === make)?.models || [] : [];
  const today = new Date().toISOString().split("T")[0];
  const upcoming = bookings.filter((b) => b.date >= today);
  const past = bookings.filter((b) => b.date < today);

  const save = async () => {
    if (!make || !model) return setStatus({ type: "error", text: "Select your car make and model." });
    setLoading(true);
    setStatus(null);
    try {
      const r = await fetch(`${API}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.token}` },
        body: JSON.stringify({ name: name.trim() || null, make, model, vehicle_type: vtype || "Other" }),
      });
      if (!r.ok) throw new Error("Couldn't save — try again.");
      setVehicle({ make, model, vehicleType: vtype || "Other" });
      window.dispatchEvent(new CustomEvent("relay:vehicle-changed"));
      setStatus({ type: "ok", text: "Saved. Your prices now show on every package." });
    } catch (e) {
      setStatus({ type: "error", text: e.message });
    }
    setLoading(false);
  };

  const logout = () => {
    clearSession();
    clearVehicle();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5]" data-testid="account-page">
      <Navbar />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-28 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-1">My Relay</p>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900">
              {name ? `Hi, ${name}` : "Your garage"}
            </h1>
          </div>
          <button
            onClick={logout}
            data-testid="account-logout-button"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-400 hover:text-red-600 transition-colors"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-zinc-200 rounded-3xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <CalendarClock size={16} className="text-[#FF5A00]" />
                <h2 className="font-display text-lg font-bold text-zinc-900">Upcoming Pit Stops</h2>
              </div>
              {upcoming.length === 0 ? (
                <p className="text-sm text-zinc-400" data-testid="upcoming-empty">
                  Nothing scheduled. <a href="/book" className="font-bold text-[#FF5A00]">Book a pit stop →</a>
                </p>
              ) : (
                <ul className="flex flex-col gap-3" data-testid="upcoming-list">
                  {upcoming.map((b, i) => (
                    <BookingRow key={b.id} b={b} testid={`upcoming-${i + 1}`} trackable />
                  ))}
                </ul>
              )}
            </div>
            <div className="bg-white border border-zinc-200 rounded-3xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <History size={16} className="text-[#FF5A00]" />
                <h2 className="font-display text-lg font-bold text-zinc-900">Past Pit Stops</h2>
              </div>
              {past.length === 0 ? (
                <p className="text-sm text-zinc-400" data-testid="past-empty">Your service history will live here.</p>
              ) : (
                <ul className="flex flex-col gap-3" data-testid="past-list">
                  {past.map((b, i) => (
                    <BookingRow key={b.id} b={b} testid={`past-${i + 1}`} />
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-7">
            <div className="flex items-center gap-2 mb-1">
              <Car size={16} className="text-[#FF5A00]" />
              <h2 className="font-display text-lg font-bold text-zinc-900">My Vehicle</h2>
            </div>
            <p className="text-xs text-zinc-500 mb-5">Tell us your car once — the right price shows on every package.</p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Your name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rohan" data-testid="account-name-input" className={fieldCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Car make <span className="text-[#FF5A00]">*</span></label>
                <select
                  value={make}
                  onChange={(e) => { setMake(e.target.value); setModel(""); setVtype(""); }}
                  data-testid="account-make-select"
                  className={fieldCls}
                >
                  <option value="" disabled>Select make</option>
                  {VEHICLES.map((b) => (<option key={b.brand} value={b.brand}>{b.brand}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Car model <span className="text-[#FF5A00]">*</span></label>
                <select
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    const m = models.find((x) => x.name === e.target.value);
                    if (m) setVtype(m.vehicleType);
                  }}
                  disabled={!make}
                  data-testid="account-model-select"
                  className={fieldCls}
                >
                  <option value="" disabled>{make ? "Select model" : "Pick make first"}</option>
                  {models.map((m) => (<option key={m.name} value={m.name}>{m.name}</option>))}
                </select>
              </div>
              {status && (
                <p data-testid="account-status" className={`text-sm font-semibold rounded-xl px-4 py-3 ${status.type === "ok" ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"}`}>
                  {status.text}
                </p>
              )}
              <button
                onClick={save}
                disabled={loading}
                data-testid="account-save-button"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-6 py-4 transition-colors active:scale-95 disabled:opacity-60"
              >
                <Save size={16} />
                {loading ? "Saving…" : "Save my car"}
              </button>
              <a href="/#packages" data-testid="account-packages-link" className="text-center text-sm font-bold text-zinc-600 hover:text-[#FF5A00] transition-colors">
                See packages with your prices →
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
