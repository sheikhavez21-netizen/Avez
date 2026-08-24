import { waLink } from "../../data/content";

export const RelayClub = () => (
  <section id="club" data-testid="club-section" className="py-24 sm:py-32 bg-zinc-950 relative overflow-hidden">
    <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#FF5A00]/15 blur-3xl" />
    <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4 reveal">Relay Club</p>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Routine car care,
            <br />
            without the routine.
          </h2>
          <p className="mt-5 text-base lg:text-lg text-zinc-400 leading-relaxed max-w-md">
            Membership is on the way — monthly washes, priority slots and RS credits for regulars. Your car stays spotless without you thinking about it.
          </p>
        </div>
        <div className="reveal flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
          <div className="flex flex-wrap gap-2.5">
            {["Monthly washes", "Priority slots", "RS credits", "Member pricing"].map((t) => (
              <span key={t} className="text-xs font-bold text-zinc-300 border border-zinc-700 rounded-full px-4 py-2">
                {t}
              </span>
            ))}
          </div>
          <a
            href={waLink("Hi Relay! Add me to the Relay Club waitlist")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="club-waitlist-button"
            className="inline-flex items-center justify-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-8 py-4 transition-colors active:scale-95 w-fit"
          >
            Join the waitlist →
          </a>
        </div>
      </div>
    </div>
  </section>
);
