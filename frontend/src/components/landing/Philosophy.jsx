const Em = ({ children }) => (
  <span className="font-display italic font-extrabold text-[#FF5A00]">{children}</span>
);

const Pillar = ({ n, title, children }) => (
  <div className="flex gap-5 sm:gap-7 group">
    <span className="font-display italic text-4xl sm:text-6xl font-black text-zinc-200 group-hover:text-[#FF5A00] transition-colors duration-500 leading-none shrink-0 select-none">
      {n}
    </span>
    <div>
      <h4 className="text-lg font-bold tracking-tight text-zinc-900">{title}</h4>
      <div className="mt-2 space-y-2.5 text-sm sm:text-[15px] text-zinc-600 leading-relaxed max-w-md">
        {children}
      </div>
    </div>
  </div>
);

export const Philosophy = () => (
  <section id="philosophy" data-testid="philosophy-section" className="py-24 sm:py-32 bg-[#F4F4F5]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
        <div className="reveal">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-5">The Relay Philosophy</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            This is Goa.
            <br />
            We do things differently.
          </h2>
          <div className="mt-7 space-y-4 text-base lg:text-lg text-zinc-600 leading-relaxed max-w-lg">
            <p>
              In Goa, <strong className="text-zinc-900">Susegad</strong> is a way of life — contentment, ease, and the quiet joy of not rushing.
            </p>
            <p>
              But your car still needs cleaning, and you shouldn't have to spend your weekend driving to a wash centre and waiting in a queue.
            </p>
            <p>
              <strong className="text-zinc-900">That's why we built Relay.</strong> Book in two minutes. We ride to you. You handle the Susegad — we handle the car.
            </p>
          </div>
          <div className="mt-9 relative rounded-3xl overflow-hidden border border-zinc-200" data-testid="philosophy-visual">
            <img
              src="/assets/philosophy.jpg"
              alt="Snow foam being applied during a Relay wash"
              className="w-full h-72 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <p className="absolute bottom-5 left-6 right-6 font-display italic font-black uppercase text-white text-2xl sm:text-3xl leading-[1.05] tracking-tight">
              A proper wash
              <br />
              makes all the
              <br />
              difference.
            </p>
          </div>
        </div>
        <div className="reveal flex flex-col gap-10 sm:gap-12 lg:pt-20">
          <Pillar n="01" title="Your time is yours">
            <p>We believe Susegad isn't a word. It's an emotion. It's the feeling of having nowhere to rush to. Of taking your time. Of enjoying your day.</p>
            <p>No driving to a wash centre. No queues. No wasted Saturday mornings. We come to you — your driveway or your apartment parking.</p>
            <p>Got a wedding to attend? Plans for the weekend? No time to wash the car? <Em>Just Relay it.</Em></p>
          </Pillar>
          <Pillar n="02" title="Products that respect your car">
            <p>Your car deserves more than a bucket of soap and a pressure washer.</p>
            <p>We use European car-care products, lab-tested for performance and quality, carefully selected for safe and proper vehicle care. From everyday cars to vehicles protected with PPF and ceramic coatings, we choose products and methods that respect the finish we're working on.</p>
            <p className="font-semibold text-zinc-800">Because a clean car shouldn't come at the cost of its finish.</p>
          </Pillar>
          <Pillar n="03" title="A crew you can trust">
            <p className="font-semibold text-zinc-800">Trained Captains. Dedicated care.</p>
            <p>Every Relay Captain is trained, verified and equipped with the right tools and products. We follow a consistent process and proper wash methodology — because your car deserves more than someone simply showing up with a pressure washer.</p>
            <p>Your car is more than just a machine. We understand.</p>
          </Pillar>
          <Pillar n="04" title="Book in 2 minutes">
            <p>
              WhatsApp us. Pick a slot. Share your location.{" "}
              <span className="font-semibold text-zinc-800">No app. No account. No complicated forms.</span> Done.
            </p>
            <p><Em>Just Relay it.</Em></p>
          </Pillar>
        </div>
      </div>
      <blockquote className="reveal mt-16 sm:mt-20 border-l-4 border-[#FF5A00] pl-6 max-w-xl" data-testid="philosophy-quote">
        <p className="font-display italic text-xl sm:text-2xl font-bold text-zinc-900">"Relax. We'll take care of the car."</p>
        <span className="mt-2 block text-sm text-zinc-500">— The Relay Promise</span>
      </blockquote>
    </div>
  </section>
);
