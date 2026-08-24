import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Lenis from "lenis";
import { useReveal } from "@/hooks/useReveal";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Philosophy } from "@/components/landing/Philosophy";
import { Packages } from "@/components/landing/Packages";
import { BookingForm } from "@/components/landing/BookingForm";
import { AreaChecker } from "@/components/landing/AreaChecker";
import { FAQ } from "@/components/landing/FAQ";
import { BookingCTA } from "@/components/landing/BookingCTA";
import { Footer } from "@/components/landing/Footer";
import { MobileCTA } from "@/components/landing/MobileCTA";
import Admin from "@/pages/Admin";

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15 });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -64 });
      }
    };
    document.addEventListener("click", onClick);
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) lenis.scrollTo(el, { offset: -64, immediate: true });
      }, 300);
    }
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);
};

const Home = () => {
  useReveal();
  return (
    <div className="bg-white text-zinc-900 pb-20 md:pb-0" data-testid="home-page">
      <Navbar />
      <Hero />
      <div className="flag-strip" />
      <Philosophy />
      <Marquee />
      <Packages />
      <BookingForm />
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
  useLenis();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
