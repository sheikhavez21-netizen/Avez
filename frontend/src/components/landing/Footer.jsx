import { MessageCircle, Phone, MapPin } from "lucide-react";
import { waLink, PHONE_DISPLAY, PHONE_TEL } from "../../data/content";

export const Footer = () => (
  <footer data-testid="footer" className="bg-white">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-3 gap-12">
      <div>
        <img src="/assets/relay-logo.png" alt="Relay Premium Car Care" className="h-9 w-auto" data-testid="footer-logo" />
        <p className="mt-5 text-sm text-zinc-600 leading-relaxed max-w-xs">
          Doorstep premium car care. You stay where you are — we handle the car.
        </p>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-5">Currently Serving</h4>
        <div className="flex flex-wrap gap-3">
          <span data-testid="coverage-panjim" className="inline-flex items-center gap-1.5 bg-[#FFF0E5] text-[#FF5A00] text-sm font-bold rounded-full px-4 py-2">
            <MapPin size={14} />
            Panjim
          </span>
          <span className="inline-flex items-center text-sm font-semibold text-zinc-500 border border-dashed border-zinc-300 rounded-full px-4 py-2">
            + More zones soon
          </span>
        </div>
        <p className="mt-3 text-xs text-zinc-500">Expanding across Goa</p>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-5">Contact</h4>
        <div className="flex flex-col gap-3">
          <a
            href={waLink("Hi Relay!")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-whatsapp-link"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-[#FF5A00] transition-colors"
          >
            <MessageCircle size={16} className="text-[#FF5A00]" />
            WhatsApp us
          </a>
          <a
            href={PHONE_TEL}
            data-testid="footer-phone-link"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-[#FF5A00] transition-colors"
          >
            <Phone size={16} className="text-[#FF5A00]" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-zinc-500">
        <span>© {new Date().getFullYear()} Relay Premium Car Care. All rights reserved.</span>
        <span className="font-semibold text-zinc-600">Be Susegad. Just Relay It.</span>
      </div>
    </div>
  </footer>
);
