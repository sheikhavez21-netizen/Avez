import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { CAR_MAKES, waLink } from "../../data/content";

const fieldCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 transition-colors disabled:bg-zinc-50 disabled:text-zinc-400";

export const BookingModal = () => {
  const [open, setOpen] = useState(false);
  const [pkg, setPkg] = useState(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = (e) => {
      setPkg(e.detail?.pkg || null);
      setMake("");
      setModel("");
      setError("");
      setOpen(true);
    };
    window.addEventListener("relay:open-booking", handler);
    return () => window.removeEventListener("relay:open-booking", handler);
  }, []);

  const models = make ? CAR_MAKES[make] || [] : [];

  const proceed = () => {
    if (!make || !model) return setError("Select your car make and model first.");
    const lines = [
      pkg ? `Hi Relay! I want to book ${pkg}.` : "Hi Relay! I want to book a car wash.",
      `Car: ${make} ${model}`,
    ];
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-3xl" data-testid="booking-modal">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-extrabold tracking-tight">
            {pkg ? `Book ${pkg}` : "Book your wash"}
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500">
            Tell us your car — we'll take it from there on WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Select make <span className="text-[#FF5A00]">*</span>
            </label>
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                setModel("");
              }}
              data-testid="modal-make-select"
              className={fieldCls}
            >
              <option value="" disabled>Select make</option>
              {Object.keys(CAR_MAKES).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Select model <span className="text-[#FF5A00]">*</span>
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!make}
              data-testid="modal-model-select"
              className={fieldCls}
            >
              <option value="" disabled>{make ? "Select model" : "Pick make first"}</option>
              {models.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          {error && <p data-testid="modal-error" className="text-sm font-semibold text-red-600">{error}</p>}
          <button
            onClick={proceed}
            data-testid="modal-continue-button"
            className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-6 py-4 transition-colors active:scale-95"
          >
            <MessageCircle size={17} />
            Continue on WhatsApp
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
