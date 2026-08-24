import { waLink } from "../../data/content";

export const Community = () => (
  <section id="community" data-testid="community-section" className="py-24 sm:py-32 bg-[#F4F4F5]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4 reveal">Relay at your Community</p>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900">
            Dedicated car care
            <br />
            for your community.
          </h2>
          <p className="mt-5 text-base lg:text-lg text-zinc-600 leading-relaxed max-w-lg">
            Relay partners with residential communities and builders to bring a dedicated Pit Crew to your building — fixed days, fixed hours, residents only. One booking link for the whole community.
          </p>
          <a
            href={waLink("Hi Relay! I'd like to bring Relay to my community/building")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="community-interest-button"
            className="mt-7 inline-flex items-center gap-2 bg-zinc-900 hover:bg-[#FF5A00] text-white font-bold rounded-full px-8 py-4 transition-colors active:scale-95"
          >
            Bring Relay to my building →
          </a>
        </div>
        <div className="reveal">
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm max-w-md" data-testid="community-concept-card">
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">Concept preview</span>
            <div className="mt-5 space-y-3">
              <p className="font-display text-2xl font-extrabold tracking-tight text-zinc-900">Palm Residency</p>
              <div className="flex items-center gap-2 text-sm font-bold text-[#FF5A00]">
                <span className="w-2 h-2 rounded-full bg-[#FF5A00]" />
                Relay Pit Crew
              </div>
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase">Day</p>
                  <p className="font-bold text-zinc-900 mt-0.5">Every Saturday</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase">Hours</p>
                  <p className="font-bold text-zinc-900 mt-0.5">9 AM – 5 PM</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              data-testid="community-book-button"
              onClick={() => (window.location.href = "/book")}
              className="mt-6 w-full inline-flex items-center justify-center bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-6 py-3.5 transition-colors active:scale-95"
            >
              Book Your Pit Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
