import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { CalendarCheck, ArrowRight, Clock, ShieldCheck, Users, MessageCircle } from "lucide-react";
import { IMAGES, VIDEO, VIDEO_WEBM } from "../../data/content";

const EASE = [0.22, 1, 0.36, 1];

const lineReveal = {
  hidden: { y: "115%" },
  show: (i) => ({ y: "0%", transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.14 } }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (d) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: d } }),
};

const BADGES = [
  { icon: Clock, title: "Save Time", sub: "No driving. No waiting." },
  { icon: ShieldCheck, title: "Safe Products", sub: "Professionally selected & car-safe" },
  { icon: Users, title: "Trusted Crew", sub: "Trained, verified & equipped" },
  { icon: MessageCircle, title: "Book in 2 Minutes", sub: "On WhatsApp. That's it." },
];

export const Hero = () => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [48, -48]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 14 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 14 });

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const onMouseMove = (e) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      data-testid="hero-section"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(#f4f4f5 1px, transparent 1px), linear-gradient(90deg, #f4f4f5 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-[#FF5A00]/10 blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.p
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="show"
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00] mb-5"
          >
            Doorstep Premium Car Care · Goa
          </motion.p>
          <h1 className="font-display uppercase italic font-black tracking-tighter text-zinc-900 leading-[0.92] text-6xl sm:text-7xl lg:text-8xl">
            <span className="block overflow-hidden pb-1">
              <motion.span className="block" variants={lineReveal} custom={0} initial="hidden" animate="show">
                Your Driveway.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span className="block text-[#FF5A00]" variants={lineReveal} custom={1} initial="hidden" animate="show">
                Our Pit Crew.
              </motion.span>
            </span>
          </h1>
          <motion.p
            variants={fadeUp}
            custom={0.55}
            initial="hidden"
            animate="show"
            className="mt-6 text-base lg:text-lg text-zinc-600 leading-relaxed max-w-md"
          >
            Premium car care, brought to you. You stay where you are — we handle the car.
          </motion.p>
          <motion.div variants={fadeUp} custom={0.7} initial="hidden" animate="show" className="mt-8 flex flex-wrap gap-4">
            <motion.a
              href="#book-slot"
              data-testid="hero-book-button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-8 py-4 transition-colors"
            >
              <CalendarCheck size={18} />
              Book Your Pit Stop
            </motion.a>
            <motion.a
              href="#packages"
              data-testid="hero-packages-button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 font-bold rounded-full px-8 py-4 transition-colors"
            >
              View Packages
              <ArrowRight size={16} />
            </motion.a>
          </motion.div>
          <motion.div
            variants={fadeUp}
            custom={0.85}
            initial="hidden"
            animate="show"
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
            data-testid="hero-trust-badges"
          >
            {BADGES.map((b) => (
              <div key={b.title} className="flex flex-col gap-2 group">
                <b.icon size={22} className="text-[#FF5A00] transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={2} />
                <p className="text-sm font-bold text-zinc-900">{b.title}</p>
                <span className="text-xs text-zinc-500 leading-snug">{b.sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <div ref={cardRef} style={{ perspective: 1000 }}>
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.35 }}
            style={{ y: parallaxY, rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden border border-zinc-200 shadow-[0_32px_80px_rgba(0,0,0,0.14)] max-w-sm mx-auto">
              <video
                ref={videoRef}
                poster={IMAGES.heroPoster}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[380px] sm:h-[520px] object-cover"
                data-testid="hero-video"
              >
                <source src={VIDEO_WEBM} type="video/webm" />
                <source src={VIDEO} type="video/mp4" />
              </video>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white border border-zinc-200 rounded-2xl px-5 py-4 shadow-lg flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A00] animate-pulse" />
              <p className="text-sm font-bold text-zinc-900">
                Serving Panjim <span className="text-zinc-500 font-medium">· More zones soon</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
