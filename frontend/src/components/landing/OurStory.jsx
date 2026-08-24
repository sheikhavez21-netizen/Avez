export const OurStory = () => (
  <section id="story" data-testid="story-section" className="py-24 sm:py-32 bg-[#F4F4F5]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">
        <div className="reveal lg:sticky lg:top-28 self-start">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-5">Our Story</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            "We thought car care could be easier."
          </h2>
          <div className="mt-10 rounded-3xl overflow-hidden border border-zinc-200">
            <img
              src="/assets/wash-1.jpg"
              alt="Relay pit crew at work — snow foam on a wheel"
              className="w-full h-64 sm:h-80 object-cover"
              data-testid="story-image"
            />
          </div>
        </div>
        <div className="reveal">
          <div className="w-8 h-0.5 bg-[#FF5A00] mb-8" />
          <div className="space-y-5 text-base lg:text-lg text-zinc-600 leading-relaxed max-w-xl">
            <p>
              We love our cars. But taking care of them often means giving up half a day — driving to a wash centre, waiting for your turn, and working your schedule around the car.
            </p>
            <p>
              In Goa, where life is meant to be a little more relaxed, that never quite made sense to us.
            </p>
            <p>
              So we thought: why should you take the car to the wash? Why can't the wash come to you?
            </p>
            <p className="font-semibold text-zinc-900">That's how Relay started.</p>
            <p>We built Relay around a simple idea:</p>
            <blockquote className="border-l-4 border-[#FF5A00] pl-5 py-1">
              <p className="font-display italic text-xl font-bold text-zinc-900">
                "Your car deserves proper care. Your time deserves better."
              </p>
            </blockquote>
            <p>
              So we bring the Pit Crew to your driveway, parking spot, office or building. We use the right equipment, professional car-care products and a consistent process — so you don't have to compromise between convenience and quality.
            </p>
            <p className="font-semibold text-zinc-900">You keep the Susegad. We take care of the car.</p>
            <p>We're starting in Goa, one neighbourhood and one community at a time.</p>
            <p>
              And we're building Relay to be more than a car wash — a better way to care for your car.
            </p>
          </div>
        </div>
      </div>
      <div className="reveal mt-24 sm:mt-32 text-center" data-testid="story-closing">
        <div className="w-8 h-0.5 bg-[#FF5A00] mx-auto mb-10" />
        <p className="font-display uppercase italic font-black tracking-tighter leading-[0.92] text-zinc-900 text-5xl sm:text-7xl lg:text-8xl">
          Your Driveway.
          <br />
          <span className="text-[#FF5A00]">Our Pit Crew.</span>
        </p>
      </div>
    </div>
  </section>
);
