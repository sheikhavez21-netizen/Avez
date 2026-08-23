import { MessageCircle, Phone } from "lucide-react";
import { waLink, PHONE_DISPLAY, PHONE_TEL } from "../../data/content";

export const BookingCTA = () => (
  <section id="book" data-testid="booking-cta-section" className="py-24 sm:py-32 bg-zinc-950 relative overflow-hidden">
    <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#FF5A00]/20 blur-3xl" />
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center relative">
      <div className="reveal">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Ready for
          <br />
          your pit stop?
        </h2>
        <p className="mt-5 text-base lg:text-lg text-zinc-400 leading-relaxed max-w-md">
          Message us on WhatsApp. Tell us your package and location. We'll handle everything else. Susegad Asa.
        </p>
      </div>
      <div className="reveal flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
        <a
          href={waLink("Hi Relay! I want to book a car wash")}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="cta-whatsapp-button"
          className="inline-flex items-center justify-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-8 py-4 transition-colors active:scale-95"
        >
          <MessageCircle size={18} />
          Book Your Pit Stop
        </a>
        <a
          href={PHONE_TEL}
          data-testid="cta-call-link"
          className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-white font-bold rounded-full px-8 py-4 transition-colors active:scale-95"
        >
          <Phone size={16} />
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  </section>
);
