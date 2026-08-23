import { Tag } from "lucide-react";
import { waLink } from "../../data/content";

export const OfferBanner = () => (
  <div data-testid="offer-banner" className="bg-[#FF5A00] text-white">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-2.5 flex items-center justify-center gap-2 text-center">
      <Tag size={13} className="shrink-0" />
      <p className="text-xs sm:text-sm font-bold tracking-wide">
        LAUNCH OFFER — ₹100 off your first wash. Mention code <span className="underline underline-offset-2">RELAY100</span> when you book.
      </p>
      <a
        href={waLink("Hi Relay! I want to book a wash with the RELAY100 launch offer")}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="offer-claim-link"
        className="hidden sm:inline-flex shrink-0 text-xs font-black bg-white text-[#FF5A00] rounded-full px-3 py-1 hover:bg-zinc-100 transition-colors"
      >
        Claim
      </a>
    </div>
  </div>
);
