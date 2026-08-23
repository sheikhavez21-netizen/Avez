import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { waLink } from "../../data/content";

export const MobileCTA = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
  <div data-testid="mobile-sticky-cta" className="md:hidden fixed bottom-0 inset-x-0 z-50 p-3 bg-white/90 backdrop-blur-xl border-t border-zinc-200">
    <a
      href={isHome ? "#book-slot" : waLink("Hi Relay! I want to book a car wash")}
      target={isHome ? undefined : "_blank"}
      rel={isHome ? undefined : "noopener noreferrer"}
      data-testid="mobile-sticky-book-button"
      className="flex items-center justify-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-6 py-3.5 transition-colors active:scale-95"
    >
      <MessageCircle size={17} />
      Book Your Pit Stop
    </a>
  </div>
  );
};
