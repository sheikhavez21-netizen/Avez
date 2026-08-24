import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, LogOut, ArrowRight } from "lucide-react";
import { VEHICLES } from "../data/content";
import { getSession, setVehicle, clearSession, clearVehicle } from "../utils/auth";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fieldCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 transition-colors disabled:bg-zinc-50 disabled:text-zinc-400";

export default function Account() {
  const navigate = useNavigate();
  const [session] = useState(getSession());
  const [name, setName] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [vtype, setVtype] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }
    fetch(`${API}/profile`, { headers: { Authorization: `Bearer ${session.token}` } })
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
  }, []);

  if (!session) return null;

  const models = make ? VEHICLES.find((b) => b.brand === make)?.models || [] : [];

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
    <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center px-5 py-10" data-testid="account-page">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
        <a href="/" className="inline-block">
          <img src="/assets/relay-logo.png" alt="Relay Premium Car Care" className="h-8 w-auto mb-8" />
        </a>
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-zinc-900">Your garage</h1>
          <span className="text-xs font-bold text-zinc-500">{session.phone}</span>
        </div>
        <p className="mt-1 text-sm text-zinc-500">Tell us your car once — we'll show the right price on every wash.</p>
        <div className="mt-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rohan"
              data-testid="account-name-input"
              className={fieldCls}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Car make <span className="text-[#FF5A00]">*</span>
            </label>
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                setModel("");
                setVtype("");
              }}
              data-testid="account-make-select"
              className={fieldCls}
            >
              <option value="" disabled>Select make</option>
              {VEHICLES.map((b) => (
                <option key={b.brand} value={b.brand}>{b.brand}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Car model <span className="text-[#FF5A00]">*</span>
            </label>
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
              {models.map((m) => (
                <option key={m.name} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>
          {status && (
            <p
              data-testid="account-status"
              className={`text-sm font-semibold rounded-xl px-4 py-3 ${
                status.type === "ok" ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"
              }`}
            >
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
          <a
            href="/#packages"
            data-testid="account-packages-link"
            className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-zinc-600 hover:text-[#FF5A00] transition-colors"
          >
            See packages with your prices
            <ArrowRight size={14} />
          </a>
          <button
            onClick={logout}
            data-testid="account-logout-button"
            className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-zinc-400 hover:text-red-600 transition-colors"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
