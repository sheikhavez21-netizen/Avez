const ITEMS = [
  "Snow Foam Hand Wash",
  "Doorstep Detailing",
  "PPF & Ceramic Safe",
  "Trained Pit Crew",
  "Book In 2 Minutes",
  "Panjim · Goa",
];

export const Marquee = () => (
  <div className="overflow-hidden py-10 border-y border-zinc-200 bg-white select-none" data-testid="marquee" aria-hidden="true">
    <div className="marquee-track flex items-center whitespace-nowrap">
      {[...ITEMS, ...ITEMS].map((t, i) => (
        <span key={i} className="flex items-center">
          <span
            className="font-display text-4xl sm:text-5xl font-black uppercase italic tracking-tight text-transparent px-6"
            style={{ WebkitTextStroke: "1.5px #FF5A00" }}
          >
            {t}
          </span>
          <span className="w-3 h-3 bg-[#FF5A00] rotate-45 inline-block shrink-0" />
        </span>
      ))}
    </div>
  </div>
);
