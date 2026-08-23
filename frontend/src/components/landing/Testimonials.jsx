import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../data/content";

export const Testimonials = () => (
  <section id="reviews" data-testid="testimonials-section" className="py-24 sm:py-32">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4 reveal">Customer Reviews</p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 reveal">
        Panjim loves Relay.
      </h2>
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            data-testid={`testimonial-card-${i + 1}`}
            className="reveal flex flex-col bg-white border border-zinc-200 rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <Quote size={24} className="text-[#FF5A00]/30" fill="currentColor" strokeWidth={0} />
            <blockquote className="mt-4 text-sm text-zinc-700 leading-relaxed flex-1">"{t.quote}"</blockquote>
            <figcaption className="mt-6 pt-5 border-t border-zinc-100">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} className="text-[#FF5A00]" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm font-bold text-zinc-900">{t.name}</p>
              <p className="text-xs text-zinc-500">{t.area} · {t.plan}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
