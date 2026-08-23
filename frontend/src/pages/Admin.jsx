import { useState } from "react";
import { Lock, Trash2, Plus, RefreshCcw } from "lucide-react";
import { TIME_SLOTS } from "../data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fieldCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 placeholder:font-normal focus:outline-none focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 transition-colors";

export default function Admin() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [reason, setReason] = useState("");

  const req = async (path, init = {}) => {
    const r = await fetch(`${API}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", "X-Admin-Key": key },
    });
    if (!r.ok) {
      const b = await r.json().catch(() => ({}));
      throw new Error(b.detail || `Request failed (${r.status})`);
    }
    return r.status === 204 ? null : r.json();
  };

  const load = async () => {
    const [b, s] = await Promise.all([req("/admin/bookings"), req("/admin/blocked-slots")]);
    setBookings(b);
    setBlocks(s);
  };

  const unlock = async () => {
    setError("");
    try {
      await load();
      setAuthed(true);
    } catch (e) {
      setError(e.message);
    }
  };

  const addBlock = async () => {
    if (!date) return setError("Pick a date to block.");
    setError("");
    try {
      await req("/admin/blocked-slots", {
        method: "POST",
        body: JSON.stringify({ date, slot: slot || null, reason: reason || null }),
      });
      setReason("");
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const removeBlock = async (id) => {
    setError("");
    try {
      await req(`/admin/blocked-slots/${id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center px-5">
        <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
          <img src="/assets/relay-logo.png" alt="Relay Premium Car Care" className="h-8 w-auto mb-8" />
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-zinc-900">Owner Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">Enter your admin key to manage bookings and blocked slots.</p>
          <div className="mt-6 relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && unlock()}
              placeholder="Admin key"
              data-testid="admin-key-input"
              className={`${fieldCls} pl-11`}
            />
          </div>
          {error && <p data-testid="admin-login-error" className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
          <button
            onClick={unlock}
            data-testid="admin-unlock-button"
            className="mt-5 w-full bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-6 py-3.5 transition-colors active:scale-95"
          >
            Unlock Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5]" data-testid="admin-dashboard">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <img src="/assets/relay-logo.png" alt="Relay" className="h-7 w-auto" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00]">Owner Dashboard</span>
          </div>
          <button
            onClick={() => load()}
            data-testid="admin-refresh-button"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#FF5A00] transition-colors"
          >
            <RefreshCcw size={15} />
            Refresh
          </button>
        </div>
        {error && <p data-testid="admin-error" className="mb-6 text-sm font-semibold text-red-600">{error}</p>}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white border border-zinc-200 rounded-3xl p-7">
            <h2 className="font-display text-xl font-bold text-zinc-900 mb-1">Bookings</h2>
            <p className="text-xs text-zinc-500 mb-5">Every form submission lands here as a backup to WhatsApp.</p>
            {bookings.length === 0 ? (
              <p className="text-sm text-zinc-400 py-8" data-testid="admin-bookings-empty">No bookings yet.</p>
            ) : (
              <ul className="flex flex-col gap-3" data-testid="admin-bookings-list">
                {bookings.map((b, i) => (
                  <li key={b.id} data-testid={`booking-row-${i + 1}`} className="border border-zinc-100 rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-zinc-900">{b.package_name}{b.car_type ? ` · ${b.car_type}` : ""}</p>
                      <span className="text-xs font-bold text-[#FF5A00] bg-[#FFF0E5] rounded-full px-3 py-1">{b.date} · {b.slot}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-600">{b.location}</p>
                    <p className="mt-1 text-xs text-zinc-400">
                      {b.name || "No name"}{b.utilities_available !== undefined && b.utilities_available !== null ? ` · Water & Power: ${b.utilities_available ? "Yes" : "No"}` : ""} · {new Date(b.created_at).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white border border-zinc-200 rounded-3xl p-7">
            <h2 className="font-display text-xl font-bold text-zinc-900 mb-1">Blocked Slots</h2>
            <p className="text-xs text-zinc-500 mb-5">Blocked slots can't be picked by customers on the booking form.</p>
            <div className="grid grid-cols-2 gap-3">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} data-testid="admin-block-date-input" className={fieldCls} />
              <select value={slot} onChange={(e) => setSlot(e.target.value)} data-testid="admin-block-slot-select" className={fieldCls}>
                <option value="">Whole day</option>
                {TIME_SLOTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason (optional)"
                data-testid="admin-block-reason-input"
                className={`${fieldCls} col-span-2`}
              />
            </div>
            <button
              onClick={addBlock}
              data-testid="admin-block-submit-button"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-[#FF5A00] text-white font-bold rounded-full px-6 py-3 transition-colors active:scale-95"
            >
              <Plus size={16} />
              Block This Slot
            </button>
            {blocks.length === 0 ? (
              <p className="text-sm text-zinc-400 py-6" data-testid="admin-blocks-empty">Nothing blocked — all slots open.</p>
            ) : (
              <ul className="mt-5 flex flex-col gap-2.5" data-testid="admin-blocks-list">
                {blocks.map((b) => (
                  <li key={b.id} data-testid={`blocked-slot-${b.id}`} className="flex items-center justify-between gap-3 bg-[#F4F4F5] rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-bold text-zinc-900">{b.date} · {b.slot || "Whole day"}</p>
                      {b.reason && <p className="text-xs text-zinc-500">{b.reason}</p>}
                    </div>
                    <button
                      onClick={() => removeBlock(b.id)}
                      data-testid={`blocked-remove-${b.id}`}
                      className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                      aria-label="Remove block"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
