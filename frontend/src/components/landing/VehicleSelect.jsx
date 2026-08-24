import { useMemo, useRef, useState } from "react";
import { Search, ArrowLeft, ArrowRight, Pencil, Check } from "lucide-react";
import { VEHICLES, VEHICLE_TYPES, POPULAR_BRANDS } from "../../data/content";
import { setVehicle } from "../../utils/auth";

const initials = (brand) => {
  const words = brand.split(" ");
  if (words.length === 1) return brand.slice(0, 3).toUpperCase();
  return words.map((w) => w[0]).join("").slice(0, 2).toUpperCase();
};

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const STEPS = ["Car", "Package", "Slot", "Confirm"];

const Progress = ({ active }) => (
  <div className="flex items-center gap-2 sm:gap-3 mb-8" data-testid="vehicle-progress">
    {STEPS.map((s, i) => (
      <div key={s} className="flex items-center gap-2 sm:gap-3">
        <span
          className={`text-xs font-bold uppercase tracking-wider ${
            i === active ? "text-[#FF5A00]" : "text-zinc-300"
          }`}
        >
          0{i + 1} {s}
        </span>
        {i < STEPS.length - 1 && <span className="text-zinc-300 text-xs">→</span>}
      </div>
    ))}
  </div>
);

export const VehicleSelect = () => {
  const [step, setStep] = useState("brand");
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [vtype, setVtype] = useState("");
  const [query, setQuery] = useState("");
  const sectionRef = useRef(null);
  const touched = useRef(false);

  const goTo = (s) => {
    if (touched.current) sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    touched.current = true;
    setStep(s);
  };

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (q.length < 2) return null;
    const out = [];
    VEHICLES.forEach((b) => {
      if (b.brand.toLowerCase().includes(q)) out.push({ brand: b.brand });
      b.models.forEach((md) => {
        if (md.name !== "Other" && (md.name.toLowerCase().includes(q) || `${b.brand} ${md.name}`.toLowerCase().includes(q))) {
          out.push({ brand: b.brand, model: md });
        }
      });
    });
    return out.slice(0, 8);
  }, [q]);

  const pickBrand = (b) => {
    setBrand(VEHICLES.find((v) => v.brand === b));
    setModel(null);
    setVtype("");
    setQuery("");
    goTo("model");
  };

  const pickResult = (r) => {
    const b = VEHICLES.find((v) => v.brand === r.brand);
    setBrand(b);
    setQuery("");
    if (r.model) {
      setModel(r.model);
      setVtype(r.model.vehicleType);
      goTo("type");
    } else {
      setModel(null);
      goTo("model");
    }
  };

  const pickModel = (md) => {
    setModel(md);
    setVtype(md.vehicleType);
    goTo("type");
  };

  const confirmAndContinue = () => {
    setVehicle({ make: brand.brand, model: model.name, vehicleType: vtype });
    document.querySelector("#packages")?.scrollIntoView({ behavior: "smooth" });
  };

  const BrandCard = ({ name, compact }) => (
    <button
      type="button"
      onClick={() => pickBrand(name)}
      data-testid={`vehicle-brand-${slug(name)}`}
      className={`group flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl ${compact ? "p-3" : "p-4"} text-left hover:border-[#FF5A00]/50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 active:scale-95`}
    >
      <span className="w-9 h-9 shrink-0 rounded-xl bg-zinc-100 group-hover:bg-[#FF5A00] flex items-center justify-center font-display text-xs font-black text-zinc-700 group-hover:text-white transition-colors">
        {initials(name)}
      </span>
      <span className="text-sm font-bold text-zinc-900 leading-tight">{name}</span>
    </button>
  );

  return (
    <section id="select-car" ref={sectionRef} data-testid="vehicle-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Progress active={step === "confirm" ? 1 : 0} />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-3">Let's start with your car.</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900">
          {step === "brand" && "Select your car"}
          {step === "model" && "Select your model"}
          {step === "type" && "What type of vehicle is it?"}
          {step === "confirm" && "Your car"}
        </h2>
        <p className="mt-3 text-base text-zinc-600">
          {step === "brand" && "Tell us what you're driving — we'll use your vehicle details to recommend the right care."}
          {step === "model" && brand?.brand}
          {step === "type" && `${brand?.brand} ${model?.name}`}
          {step === "confirm" && "Looks right? Continue to choose your package."}
        </p>

        {step !== "brand" && (
          <button
            type="button"
            onClick={() => goTo(step === "confirm" ? "type" : step === "type" ? "model" : "brand")}
            data-testid="vehicle-back-button"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 hover:text-[#FF5A00] transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        )}

        {step === "brand" && (
          <div className="mt-8">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search brand or model — e.g. BMW X5"
                data-testid="vehicle-search-input"
                className="w-full rounded-full border border-zinc-200 bg-white pl-11 pr-4 py-3.5 text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 placeholder:font-normal focus:outline-none focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 transition-colors"
              />
            </div>
            {results ? (
              <div className="mt-5 max-w-md flex flex-col gap-2" data-testid="vehicle-search-results">
                {results.length === 0 && <p className="text-sm text-zinc-500 py-2">No matches — try a brand name or pick from the list below.</p>}
                {results.map((r, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => pickResult(r)}
                    data-testid={`vehicle-result-${i}`}
                    className="flex items-center gap-3 bg-white border border-zinc-200 rounded-xl px-4 py-3 text-left hover:border-[#FF5A00]/50 transition-colors"
                  >
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-zinc-100 flex items-center justify-center font-display text-[10px] font-black text-zinc-700">
                      {initials(r.brand)}
                    </span>
                    <span className="text-sm font-bold text-zinc-900">{r.model ? `${r.brand} ${r.model.name}` : r.brand}</span>
                    {r.model && <span className="text-xs text-zinc-400">{r.model.vehicleType}</span>}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <p className="mt-8 mb-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Popular brands</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {POPULAR_BRANDS.map((b) => (
                    <BrandCard key={b} name={b} />
                  ))}
                </div>
                <p className="mt-8 mb-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">All brands</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {VEHICLES.map((b) => (
                    <BrandCard key={b.brand} name={b.brand} compact />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {step === "model" && brand && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {brand.models.map((md) => (
              <button
                key={md.name}
                type="button"
                onClick={() => pickModel(md)}
                data-testid={`vehicle-model-${slug(md.name)}`}
                className="group bg-white border border-zinc-200 rounded-2xl p-4 text-left hover:border-[#FF5A00]/50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 active:scale-95"
              >
                <p className="text-sm font-bold text-zinc-900 group-hover:text-[#FF5A00] transition-colors">
                  {md.name === "Other" ? `Other ${brand.brand}` : md.name}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">{md.vehicleType}</p>
              </button>
            ))}
          </div>
        )}

        {step === "type" && (
          <div className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              {VEHICLE_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setVtype(t)}
                  data-testid={`vehicle-type-${slug(t)}`}
                  className={`rounded-2xl border p-4 text-sm font-bold transition-all duration-200 active:scale-95 ${
                    vtype === t
                      ? "border-[#FF5A00] bg-[#FFF0E5] text-[#FF5A00]"
                      : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo("confirm")}
              disabled={!vtype}
              data-testid="vehicle-continue-button"
              className="mt-6 inline-flex items-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-8 py-4 transition-colors active:scale-95 disabled:opacity-40"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === "confirm" && brand && model && (
          <div className="mt-8 max-w-md" data-testid="vehicle-confirm-card">
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
              <span className="w-14 h-14 shrink-0 rounded-2xl bg-[#FF5A00] flex items-center justify-center font-display text-base font-black text-white">
                {initials(brand.brand)}
              </span>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Your car</p>
                <p className="font-display text-xl font-extrabold tracking-tight text-zinc-900">
                  {brand.brand} {model.name}
                </p>
                <p className="text-sm text-zinc-500">{vtype}</p>
              </div>
              <button
                type="button"
                onClick={() => goTo("brand")}
                data-testid="vehicle-change-button"
                className="inline-flex items-center gap-1 text-xs font-bold text-zinc-500 hover:text-[#FF5A00] transition-colors shrink-0"
              >
                <Pencil size={12} />
                Change car
              </button>
            </div>
            <button
              type="button"
              onClick={confirmAndContinue}
              data-testid="vehicle-to-packages-button"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-8 py-4 transition-colors active:scale-95"
            >
              <Check size={17} />
              Continue to packages →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
