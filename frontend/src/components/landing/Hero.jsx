import { CalendarCheck, ArrowRight, Clock, ShieldCheck, Users, MessageCircle } from "lucide-react";
import { waLink, IMAGES } from "../../data/content";

const BADGES = [
  { icon: Clock, title: "Save Time", sub: "No driving. No waiting." },
  { icon: ShieldCheck, title: "Safe Products", sub: "Professionally selected & car-safe" },
  { icon: Users, title: "Trusted Crew", sub: "Trained, verified & equipped" },
  { icon: MessageCircle, title: "Book in 2 Minutes", sub: "On WhatsApp. That's it." },
];

export const Hero = () => (
  <section id="top" data-testid="hero-section" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
    <div
      className="absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "linear-gradient(#f4f4f5 1px, transparent 1px), linear-gradient(90deg, #f4f4f5 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />
    <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-[#FF5A00]/10 blur-3xl -z-10" />
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
      <div className="reveal">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-5">
          Doorstep Premium Car Care · Goa
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.95]">
          Your Driveway.
          <br />
          <span className="text-[#FF5A00]">Our Pit Crew.</span>
        </h1>
        <p className="mt-6 text-base lg:text-lg text-zinc-600 leading-relaxed max-w-md">
          Premium car care, brought to you. You stay where you are — we handle the car.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={waLink("Hi Relay! I want to book a car wash")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-book-button"
            className="inline-flex items-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-8 py-4 transition-colors active:scale-95"
          >
            <CalendarCheck size={18} />
            Book Your Pit Stop
          </a>
          <a
            href="#packages"
            data-testid="hero-packages-button"
            className="inline-flex items-center gap-2 bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 font-bold rounded-full px-8 py-4 transition-colors active:scale-95"
          >
            View Packages
            <ArrowRight size={16} />
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6" data-testid="hero-trust-badges">
          {BADGES.map((b) => (
            <div key={b.title} className="flex flex-col gap-2">
              <b.icon size={22} className="text-[#FF5A00]" strokeWidth={2} />
              <p className="text-sm font-bold text-zinc-900">{b.title}</p>
              <span className="text-xs text-zinc-500 leading-snug">{b.sub}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="reveal relative">
        <div className="rounded-3xl overflow-hidden border border-zinc-200 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
          <img
            src={IMAGES.hero}
            alt="Premium clean car"
            className="w-full h-[320px] sm:h-[440px] object-cover"
            data-testid="hero-image"
          />
        </div>
        <div className="absolute -bottom-5 -left-5 bg-white border border-zinc-200 rounded-2xl px-5 py-4 shadow-lg flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A00] animate-pulse" />
          <p className="text-sm font-bold text-zinc-900">
            Serving Panjim <span className="text-zinc-500 font-medium">· More zones soon</span>
          </p>
        </div>
      </div>
    </div>
  </section>
);
