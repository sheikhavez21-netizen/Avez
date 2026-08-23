import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { waLink } from "../../data/content";

const LINKS = [
  { label: "Packages", href: "#packages" },
  { label: "Monthly Plans", href: "#subscriptions" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "How It Works", href: "#how" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header data-testid="navbar" className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center">
          <img src="/assets/relay-logo.png" alt="Relay Premium Car Care" className="h-8 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-semibold text-zinc-600 hover:text-[#FF5A00] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={waLink("Hi Relay! I want to book a car wash")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-book-button"
            className="hidden sm:inline-flex items-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white text-sm font-bold rounded-full px-5 py-2.5 transition-colors active:scale-95"
          >
            <MessageCircle size={15} strokeWidth={2.2} />
            Book Now
          </a>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-zinc-700"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div data-testid="nav-mobile-menu" className="md:hidden border-t border-zinc-100 bg-white px-5 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-zinc-700"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink("Hi Relay! I want to book a car wash")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-mobile-book-button"
            className="inline-flex items-center justify-center gap-2 bg-[#FF5A00] text-white text-sm font-bold rounded-full px-5 py-3"
          >
            <MessageCircle size={15} />
            Book Now
          </a>
        </div>
      )}
    </header>
  );
};
