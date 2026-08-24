import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useReveal } from "@/hooks/useReveal";

export default function About() {
  useReveal();
  return (
    <div className="bg-white text-zinc-900" data-testid="about-page">
      <Navbar />
      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-5 reveal">Our Story</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-tight reveal">
            "We thought car care could be easier."
          </h1>
          <div className="w-8 h-0.5 bg-[#FF5A00] mt-10 mb-10 reveal" />
          <div className="space-y-5 text-base lg:text-lg text-zinc-600 leading-relaxed reveal">
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
          <div className="reveal mt-24 sm:mt-32 text-center" data-testid="story-closing">
            <div className="w-8 h-0.5 bg-[#FF5A00] mx-auto mb-10" />
            <p className="font-display uppercase italic font-black tracking-tighter leading-[0.92] text-zinc-900 text-5xl sm:text-7xl">
              Your Driveway.
              <br />
              <span className="text-[#FF5A00]">Our Pit Crew.</span>
            </p>
          </div>
        </div>
      </section>
      <div className="flag-strip" />
      <Footer />
    </div>
  );
}
