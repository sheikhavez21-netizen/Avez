import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { MessageCircle } from "lucide-react";
import { FAQS, waLink } from "../../data/content";

export const FAQ = () => (
  <section id="faq" data-testid="faq-section" className="py-24 sm:py-32 bg-[#F4F4F5]">
    <div className="max-w-3xl mx-auto px-5 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-4 reveal">FAQ</p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 reveal">
        Questions, answered.
      </h2>
      <Accordion type="single" collapsible className="mt-12 reveal" data-testid="faq-accordion">
        {FAQS.map((f, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="bg-white border border-zinc-200 rounded-2xl px-6 mb-3 shadow-sm"
          >
            <AccordionTrigger
              data-testid={`faq-question-${i + 1}`}
              className="text-left text-base font-bold text-zinc-900 hover:text-[#FF5A00] hover:no-underline py-5"
            >
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-zinc-600 leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="mt-8 text-sm text-zinc-600 reveal">
        Still unsure?{" "}
        <a
          href={waLink("Hi Relay! I have a question")}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="faq-whatsapp-link"
          className="inline-flex items-center gap-1 font-bold text-[#FF5A00] hover:text-[#E04F00] transition-colors"
        >
          <MessageCircle size={14} />
          Ask us on WhatsApp
        </a>
      </p>
    </div>
  </section>
);
