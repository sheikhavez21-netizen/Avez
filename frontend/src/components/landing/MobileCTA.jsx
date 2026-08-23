import { MessageCircle } from "lucide-react";
import { waLink } from "../../data/content";

export const MobileCTA = () => (
  <div data-testid="mobile-sticky-cta" className="md:hidden fixed bottom-0 inset-x-0 z-50 p-3 bg-white/90 backdrop-blur-xl border-t border-zinc-200">
    <a
      href={waLink("Hi Relay! I want to book a car wash")}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="mobile-sticky-book-button"
      className="flex items-center justify-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-6 py-3.5 transition-colors active:scale-95"
    >
      <MessageCircle size={17} />
      Book Your Pit Stop
    </a>
  </div>
);
