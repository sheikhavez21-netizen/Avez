import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Philosophy } from "@/components/landing/Philosophy";
import { Packages } from "@/components/landing/Packages";
import { BookingForm } from "@/components/landing/BookingForm";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyRelay } from "@/components/landing/WhyRelay";
import { Testimonials } from "@/components/landing/Testimonials";
import { AreaChecker } from "@/components/landing/AreaChecker";
import { FAQ } from "@/components/landing/FAQ";
import { BookingCTA } from "@/components/landing/BookingCTA";
import { Footer } from "@/components/landing/Footer";
import { MobileCTA } from "@/components/landing/MobileCTA";
import MonthlyPlans from "@/pages/MonthlyPlans";

const Home = () => {
  useReveal();
  return (
    <div className="bg-white text-zinc-900 pb-20 md:pb-0" data-testid="home-page">
      <Navbar />
      <Hero />
      <div className="flag-strip" />
      <Philosophy />
      <Packages />
      <BookingForm />
      <HowItWorks />
      <WhyRelay />
      <Testimonials />
      <AreaChecker />
      <FAQ />
      <BookingCTA />
      <div className="flag-strip" />
      <Footer />
      <MobileCTA />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/monthly" element={<MonthlyPlans />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
