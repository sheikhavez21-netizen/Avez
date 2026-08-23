import { useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Navbar } from "@/components/landing/Navbar";
import { Subscriptions } from "@/components/landing/Subscriptions";
import { BookingCTA } from "@/components/landing/BookingCTA";
import { Footer } from "@/components/landing/Footer";
import { MobileCTA } from "@/components/landing/MobileCTA";

export default function MonthlyPlans() {
  useReveal();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white text-zinc-900 pb-20 md:pb-0" data-testid="monthly-plans-page">
      <Navbar />
      <div className="pt-16">
        <Subscriptions />
      </div>
      <BookingCTA />
      <div className="flag-strip" />
      <Footer />
      <MobileCTA />
    </div>
  );
}
