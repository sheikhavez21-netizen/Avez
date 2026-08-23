import { useEffect, useState } from "react";
import { CalendarCheck, MessageCircle, Droplets, Crosshair, MapPin, Search } from "lucide-react";
import { PACKAGES, CAR_TYPES, TIME_SLOTS, waLink } from "../../data/content";
import { PinMap } from "./PinMap";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fieldCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 placeholder:font-normal focus:outline-none focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 transition-colors";

export const BookingForm = () => {
  const [pkg, setPkg] = useState(PACKAGES[1].name);
  const [carType, setCarType] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [location, setLocation] = useState("");
  const [pin, setPin] = useState(null);
  const [addrQuery, setAddrQuery] = useState("");
  const [addrStatus, setAddrStatus] = useState("");
  const [name, setName] = useState("");
  const [utilities, setUtilities] = useState(null);
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState([]);

  useEffect(() => {
    const handler = (e) => setPkg(e.detail);
    window.addEventListener("relay:select-package", handler);
    return () => window.removeEventListener("relay:select-package", handler);
  }, []);

  useEffect(() => {
    if (!date) return setBlocked([]);
    fetch(`${API}/blocked-slots?date=${date}`)
      .then((r) => r.json())
      .then(setBlocked)
      .catch(() => setBlocked([]));
  }, [date]);

  const dayBlocked = blocked.some((b) => !b.slot);
  const isBlocked = (s) => dayBlocked || blocked.some((b) => b.slot === s);

  useEffect(() => {
    if (slot && isBlocked(slot)) setSlot("");
  }, [blocked]);

  const today = new Date().toISOString().split("T")[0];

  const searchAddress = async () => {
    const q = addrQuery.trim();
    if (q.length < 3) return;
    setAddrStatus("searching");
    try {
      const r = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(`${q}, Goa`)}`
      );
      const data = await r.json();
      if (data.length) {
        setPin({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
        setAddrStatus("");
      } else {
        setAddrStatus("notfound");
      }
    } catch {
      setAddrStatus("notfound");
    }
  };

  const locateMe = () => {
    if (!navigator.geolocation) {
      setError("Location access isn't available on this device — type your address or tap the map to pin manually.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setPin({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setError("Couldn't get your current location — type your address or tap the map to pin it manually.")
    );
  };

  const submit = async () => {
    if (!carType || !date || !slot || !location.trim()) {
      setError("Please pick your car type, a date, a time slot and tell us where the car is.");
      return;
    }
    if (isBlocked(slot)) {
      setError("That slot just got booked — pick another time.");
      return;
    }
    if (!pin) {
      setError("Please search your address or pin your location on the map so our crew can find you.");
      return;
    }
    if (utilities === null) {
      setError("Please confirm whether water and electricity are available at the location.");
      return;
    }
    if (!utilities) {
      setError("We need both water and electricity at the location to proceed — we can't complete this booking without them.");
      return;
    }
    setError("");
    const niceDate = new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const mapsLink = `https://maps.google.com/?q=${pin.lat.toFixed(6)},${pin.lng.toFixed(6)}`;
    try {
      await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || null,
          package_name: pkg,
          car_type: carType,
          date,
          slot,
          location: location.trim(),
          utilities_available: utilities,
          lat: pin.lat,
          lng: pin.lng,
        }),
      });
    } catch {}
    const lines = [
      "Hi Relay! I'd like to book a wash.",
      "",
      `Package: ${pkg}`,
      `Car type: ${carType}`,
      `Date: ${niceDate}`,
      `Time slot: ${slot}`,
      `Location: ${location.trim()}`,
      `Maps pin: ${mapsLink}`,
      `Water & electricity: Yes`,
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
            Choose your package, car type, date and time. Type your address, we'll drop the pin — drag it to your exact parking spot.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {["No advance — pay after you inspect the car", "Free rescheduling over WhatsApp", "Water & power needed at your location", "Same crew, same standard, every time"].map((t) => (
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
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Car type <span className="text-[#FF5A00]">*</span>
                </label>
                <select
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                  data-testid="booking-car-type-select"
                  className={fieldCls}
                >
                  <option value="" disabled>Select your car type</option>
                  {CAR_TYPES.map((c) => (
                    <option key={c} value={c}>{c}</option>
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
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Building / street / landmark</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Citi Residency, near Miramar Circle"
                  data-testid="booking-location-input"
                  className={fieldCls}
                />
              </div>
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500">
                    <MapPin size={13} className="text-[#FF5A00]" />
                    Pin your location <span className="text-[#FF5A00]">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={locateMe}
                    data-testid="booking-use-location-button"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5A00] hover:text-[#E04F00] transition-colors"
                  >
                    <Crosshair size={13} />
                    Use my current location
                  </button>
                </div>
                <div className="flex gap-2.5 mb-3">
                  <div className="relative flex-1">
                    <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={addrQuery}
                      onChange={(e) => setAddrQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && searchAddress()}
                      placeholder="Type your address or area, e.g. Miramar"
                      data-testid="booking-address-input"
                      className={`${fieldCls} pl-10 rounded-full`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={searchAddress}
                    disabled={addrStatus === "searching"}
                    data-testid="booking-address-search-button"
                    className="shrink-0 inline-flex items-center gap-2 bg-zinc-900 hover:bg-[#FF5A00] text-white text-sm font-bold rounded-full px-5 py-3 transition-colors active:scale-95 disabled:opacity-50"
                  >
                    {addrStatus === "searching" ? "Searching…" : "Find on map"}
                  </button>
                </div>
                {addrStatus === "notfound" && (
                  <p data-testid="booking-address-notfound" className="mb-3 text-xs font-semibold text-red-600">
                    Couldn't find that address — try a nearby landmark or tap the map directly.
                  </p>
                )}
                <div data-testid="booking-map">
                  <PinMap pin={pin} onPin={setPin} />
                </div>
                {pin ? (
                  <p data-testid="booking-pin-status" className="mt-2 text-xs font-semibold text-emerald-600">
                    Pinned at {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)} — drag the pin or tap the map to adjust.
                  </p>
                ) : (
                  <p data-testid="booking-pin-hint" className="mt-2 text-xs text-zinc-500">
                    Search your address above, or tap the map to drop a pin where the car will be.
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Time slot</label>
              <div className="flex flex-wrap gap-2.5">
                {TIME_SLOTS.map((s, i) => {
                  const blockedSlot = date && isBlocked(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={blockedSlot}
                      onClick={() => setSlot(s)}
                      data-testid={`booking-slot-${i + 1}`}
                      className={`rounded-full px-4 py-2.5 text-sm font-bold transition-colors active:scale-95 ${
                        blockedSlot
                          ? "bg-zinc-100 text-zinc-300 line-through cursor-not-allowed"
                          : slot === s
                            ? "bg-[#FF5A00] text-white"
                            : "bg-zinc-100 text-zinc-700 hover:bg-[#FFF0E5] hover:text-[#FF5A00]"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {dayBlocked && date && (
                <p data-testid="booking-day-blocked-note" className="mt-3 text-xs font-semibold text-[#FF5A00]">
                  This day is fully booked — please pick another date.
                </p>
              )}
            </div>
            <div className="mt-6">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                <Droplets size={13} className="text-[#FF5A00]" />
                Water &amp; electricity available? <span className="text-[#FF5A00]">*</span>
              </label>
              <div className="flex gap-2.5 max-w-xs">
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => setUtilities(v)}
                    data-testid={`booking-utilities-${v ? "yes" : "no"}`}
                    className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition-colors active:scale-95 ${
                      utilities === v
                        ? v
                          ? "bg-emerald-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    {v ? "Yes" : "No"}
                  </button>
                ))}
              </div>
              {utilities === false && (
                <p data-testid="booking-utility-warning" className="mt-3 text-xs font-semibold text-red-600 bg-red-50 rounded-xl px-4 py-3">
                  Our equipment needs a water tap and a power outlet at the location. Without both, we can't proceed with a doorstep booking.
                </p>
              )}
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
