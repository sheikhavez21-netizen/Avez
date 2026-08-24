import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, CalendarCheck, LogIn, LogOut, User } from "lucide-react";
import { getSession, clearSession } from "../../utils/auth";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Packages", href: "#packages" },
  { label: "How It Works", href: "#how" },
  { label: "Our Story", href: "/about" },
  { label: "Relay Club", href: "#club" },
  { label: "Track My Pit Stop", href: "/track" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(getSession());
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";
  const resolve = (href) => (href.startsWith("#") && !isHome ? `/${href}` : href);

  const logout = () => {
    clearSession();
    setSession(null);
    setOpen(false);
    navigate("/");
  };

  return (
    <header data-testid="navbar" className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href={isHome ? "#top" : "/"} data-testid="nav-logo" className="flex items-center">
          <img src="/assets/relay-logo.png" alt="Relay Premium Car Care" className="h-8 w-auto" />
        </a>
        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={resolve(l.href)}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-semibold text-zinc-600 hover:text-[#FF5A00] transition-colors whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden xl:inline-flex text-[10px] font-bold tracking-[0.2em] text-zinc-400" data-testid="nav-location">
            PANJIM · GOA
          </span>
          {session ? (
            <span className="hidden sm:inline-flex items-center gap-2" data-testid="nav-session">
              <a href="/account" data-testid="nav-account-link" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-[#FFF0E5] rounded-full px-3.5 py-2 transition-colors">
                <User size={13} className="text-[#FF5A00]" />
                My Relay
              </a>
              <button
                onClick={logout}
                data-testid="nav-logout-button"
                className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </span>
          ) : (
            <a
              href="/login"
              data-testid="nav-login-button"
              className="hidden sm:inline-flex items-center gap-1.5 border border-zinc-300 hover:border-[#FF5A00] hover:text-[#FF5A00] text-zinc-700 text-sm font-bold rounded-full px-4 py-2 transition-colors"
            >
              <LogIn size={14} />
              My Relay
            </a>
          )}
          <a
            href="/book"
            data-testid="nav-book-button"
            className="hidden sm:inline-flex items-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white text-sm font-bold rounded-full px-5 py-2.5 transition-colors active:scale-95"
          >
            <CalendarCheck size={15} strokeWidth={2.2} />
            Book Now
          </a>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-zinc-700"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div data-testid="nav-mobile-menu" className="lg:hidden border-t border-zinc-100 bg-white px-5 py-5 flex flex-col gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={resolve(l.href)}
              onClick={() => setOpen(false)}
              className="text-base font-bold text-zinc-800 py-3 border-b border-zinc-50 active:text-[#FF5A00]"
            >
              {l.label}
            </a>
          ))}
          {session ? (
            <a
              href="/account"
              onClick={() => setOpen(false)}
              data-testid="nav-mobile-account-link"
              className="text-base font-bold text-zinc-800 py-3 border-b border-zinc-50 active:text-[#FF5A00]"
            >
              My Relay ({session.phone})
            </a>
          ) : (
            <a
              href="/login"
              onClick={() => setOpen(false)}
              data-testid="nav-mobile-login-button"
              className="text-base font-bold text-zinc-800 py-3 border-b border-zinc-50 active:text-[#FF5A00]"
            >
              Login with mobile number
            </a>
          )}
          <a
            href="/book"
            data-testid="nav-mobile-book-button"
            className="mt-4 inline-flex items-center justify-center gap-2 bg-[#FF5A00] text-white text-base font-bold rounded-full px-5 py-4 active:scale-95 transition-transform"
          >
            <CalendarCheck size={15} />
            Book Your Pit Stop
          </a>
        </div>
      )}
    </header>
  );
};
