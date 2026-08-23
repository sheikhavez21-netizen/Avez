import { Users, Droplets, Clock } from "lucide-react";
import { IMAGES } from "../../data/content";

const STANDARDS = [
  { icon: Users, h: "Trained & Verified Crew", p: "Every Relay washer is trained on our process, verified, and equipped with the right tools — not an ad-hoc crew with a bucket." },
  { icon: Droplets, h: "Premium-Grade Products", p: "Professional car-care products, selected for safe and effective results — including for PPF and ceramic-coated vehicles." },
  { icon: Clock, h: "Doorstep, On Your Time", p: "No queues, no wash-bay waiting. We come to your driveway, office or building, on a slot that works for you." },
];

export const WhyRelay = () => (
  <section id="why" data-testid="why-section" className="py-24 sm:py-32 bg-[#F4F4F5]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div className="reveal">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4">The Relay Standard</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900">
            Be Susegad.
            <br />
            Just Relay It.
          </h2>
          <p className="mt-5 text-base lg:text-lg text-zinc-600 leading-relaxed">
            In Goa, the best things happen without rushing. The fish curry simmers slowly. The sunset takes its time. And a proper car wash should come to you — not the other way around.
          </p>
          <div className="mt-8 rounded-2xl overflow-hidden border border-zinc-200">
            <img src={IMAGES.detailing} alt="Relay crew detailing a car" className="w-full h-64 object-cover" data-testid="why-image" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {STANDARDS.map((s) => (
            <div
              key={s.h}
              data-testid={`standard-${s.h.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="reveal flex gap-5 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 shrink-0 rounded-full bg-[#FFF0E5] flex items-center justify-center">
                <s.icon size={20} className="text-[#FF5A00]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">{s.h}</h3>
                <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{s.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
