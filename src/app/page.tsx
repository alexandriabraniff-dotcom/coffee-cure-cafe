"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, Clock, ExternalLink, Menu, X } from "lucide-react";

// ─── Logo SVG (faithful recreation) ─────────────────────────────────────────
function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="50" fill="#7133B2" />
      {/* Steam swirls */}
      <path d="M28 58 Q18 48 22 38 Q26 28 20 20" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M36 54 Q30 42 34 32 Q38 22 34 14" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M50 52 Q46 40 50 30 Q54 20 50 12" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M64 54 Q70 42 66 32 Q62 22 66 14" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M72 58 Q82 48 78 38 Q74 28 80 20" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      {/* Cup */}
      <ellipse cx="50" cy="76" rx="18" ry="5" fill="white" opacity="0.9"/>
      <path d="M32 66 Q32 82 50 82 Q68 82 68 66" fill="white" opacity="0.9"/>
      <ellipse cx="50" cy="66" rx="18" ry="5" fill="white"/>
      {/* Latte art */}
      <ellipse cx="50" cy="66" rx="13" ry="3.5" fill="#7133B2" opacity="0.5"/>
      <path d="M44 66 Q50 62 56 66" stroke="white" strokeWidth="1" fill="none" opacity="0.6"/>
      {/* Handle */}
      <path d="M68 70 Q78 70 78 76 Q78 82 68 82" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Coffee beans */}
      <ellipse cx="24" cy="34" rx="3.5" ry="2" fill="white" opacity="0.7" transform="rotate(-30 24 34)"/>
      <ellipse cx="76" cy="34" rx="3.5" ry="2" fill="white" opacity="0.7" transform="rotate(30 76 34)"/>
      <ellipse cx="20" cy="50" rx="3" ry="1.8" fill="white" opacity="0.7"/>
      <ellipse cx="80" cy="50" rx="3" ry="1.8" fill="white" opacity="0.7"/>
      {/* Text */}
      <text x="50" y="30" textAnchor="middle" fill="#3DC4B0" fontSize="13" fontWeight="700" fontFamily="Georgia, serif" letterSpacing="0.5">Coffee Cure</text>
    </svg>
  );
}

// ─── Nav links ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#about",    label: "About"    },
  { href: "#hours",    label: "Hours"    },
  { href: "#services", label: "Services" },
  { href: "#find-us",  label: "Find Us"  },
];

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Fade-up animation helper ─────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.65, ease: "easeOut" },
};

// ─── Hours data ───────────────────────────────────────────────────────────────
const HOURS = [
  { day: "Monday",    time: "6:30am – 2:00pm", closed: false },
  { day: "Tuesday",   time: "6:30am – 2:00pm", closed: false },
  { day: "Wednesday", time: "Closed",           closed: true  },
  { day: "Thursday",  time: "6:30am – 2:00pm", closed: false },
  { day: "Friday",    time: "6:30am – 2:00pm", closed: false },
  { day: "Saturday",  time: "7:30am – 12:00pm", closed: false },
  { day: "Sunday",    time: "7:30am – 12:00pm", closed: false },
];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const heroH = heroRef.current?.offsetHeight ?? window.innerHeight;
      setScrolled(window.scrollY > heroH * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollTo(href);
  };

  return (
    <>
      {/* ── FIXED NAV (hero overlay → sticky dropdown) ────────────────────── */}

      {/* Hero nav — fades out when sticky takes over */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-opacity duration-300 ${
          scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
            <LogoMark size={48} />
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors drop-shadow-sm"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://www.ubereats.com/au/store/coffee-cure-cafe/yBcrVYe5TzW9yVG4ve1raQ"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-[var(--teal)] hover:bg-[var(--teal-dark)] text-white text-sm font-semibold rounded-full transition-all hover:scale-[1.03] shadow-sm"
            >
              Order Online
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white drop-shadow"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sticky nav — drops in from top after scrolling past hero */}
      <AnimatePresence>
        {scrolled && (
          <motion.header
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            exit={{ y: -80 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-[var(--cream)] border-b border-[var(--border)] shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
              {/* Logo */}
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
                <LogoMark size={38} />
                <div className="leading-none hidden sm:block">
                  <span className="font-display text-base text-[var(--espresso)] block">Coffee Cure</span>
                  <span className="text-[0.6rem] tracking-[0.15em] text-[var(--teal)] uppercase font-medium">Cafe</span>
                </div>
              </button>

              {/* Desktop links */}
              <nav className="hidden md:flex items-center gap-7">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-[var(--muted)] hover:text-[var(--purple)] text-sm font-medium tracking-wide transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href="https://www.ubereats.com/au/store/coffee-cure-cafe/yBcrVYe5TzW9yVG4ve1raQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-[var(--teal)] hover:bg-[var(--teal-dark)] text-white text-sm font-semibold rounded-full transition-all hover:scale-[1.03]"
                >
                  Order Online
                </a>
              </nav>

              {/* Mobile hamburger */}
              <button
                className="md:hidden text-[var(--espresso)]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-[45] bg-[var(--espresso)] pt-20 pb-8 px-8 flex flex-col gap-5 md:hidden shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-white text-xl font-display text-left border-b border-white/10 pb-4"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://www.ubereats.com/au/store/coffee-cure-cafe/yBcrVYe5TzW9yVG4ve1raQ"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-6 py-3 bg-[var(--teal)] text-white font-semibold rounded-full text-center"
            >
              Order Online
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1800&q=85&auto=format&fit=crop"
          alt="Cozy cafe interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/70" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[var(--teal)] text-sm tracking-[0.22em] uppercase mb-4 font-semibold drop-shadow"
          >
            Largs North, Adelaide
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight mb-6 drop-shadow-lg"
          >
            Your daily cure,
            <br />one cup at a time.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/75 text-lg mb-10 leading-relaxed"
          >
            Specialty coffee, fresh breakfast & lunch, and house-made treats —
            <br className="hidden md:block" /> served with a warm smile every morning.
          </motion.p>

          {/* Hero CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-6 py-2.5 border border-white/50 hover:border-white text-white text-sm font-medium rounded-full transition-all hover:bg-white/15"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://www.ubereats.com/au/store/coffee-cure-cafe/yBcrVYe5TzW9yVG4ve1raQ"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[var(--teal)] hover:bg-[var(--teal-dark)] text-white text-sm font-semibold rounded-full transition-all hover:scale-[1.03] shadow"
            >
              Order Online
            </a>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-6 bg-white/30 rounded-full"
          />
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-6 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <p className="text-[var(--teal)] text-xs tracking-[0.2em] uppercase font-semibold mb-5">
              Who we are
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--espresso)] leading-snug mb-6">
              A little corner worth coming back to.
            </h2>
            <p className="text-[var(--muted)] leading-relaxed mb-5">
              Coffee Cure Cafe is your local specialty coffee spot tucked into Military Road in Largs North. We&apos;re the kind of place where the barista knows your order and the food is always fresh.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-5">
              Whether you&apos;re grabbing a quick flat white before work or sitting in for a long weekend brunch, we&apos;ve got you covered — six days a week with a warm welcome every time.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Previously known as Stir, we rebranded as Coffee Cure Cafe and have been serving the Largs North community ever since.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=85&auto=format&fit=crop"
              alt="Warm cafe interior"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ── HOURS ─────────────────────────────────────────────────────────────── */}
      <section id="hours" className="py-28 px-6 bg-[var(--espresso)]">
        <div className="max-w-xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-semibold mb-3">
              When to visit
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-3">
              Opening Hours
            </h2>
            <p className="text-white/45 text-sm">
              Open six days a week — closed Wednesdays.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
          >
            {HOURS.map((h, i) => (
              <div
                key={h.day}
                className={`flex items-center justify-between px-8 py-4.5 ${
                  i !== HOURS.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <span className={`font-medium ${h.closed ? "text-white/40" : "text-white"}`}>
                  {h.day}
                </span>
                <span className={`text-sm font-medium ${h.closed ? "text-[var(--teal)] italic" : "text-white/65"}`}>
                  {h.time}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.p {...fadeUp} className="text-center text-white/30 text-xs mt-6">
            Hours may vary on public holidays — call (08) 8248 5000 to confirm.
          </motion.p>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
      <section id="services" className="py-28 px-6 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-semibold mb-3">
              What we offer
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--espresso)] mb-4">
              Our Services
            </h2>
            <p className="text-[var(--muted)] max-w-md mx-auto leading-relaxed">
              From your first espresso to your last sip — everything made fresh, every morning.
            </p>
          </motion.div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-20">
            {[
              {
                title: "Specialty Coffee",
                desc: "Expertly pulled espresso, silky flat whites, long blacks, chais, mochas — every cup made to order.",
                items: ["Espresso & Long Black", "Flat White & Latte", "Chai & Mocha", "Iced Coffee"],
              },
              {
                title: "Fresh Food",
                desc: "Turkish rolls, bagels, wraps, sourdough and fruit toast — all fresh and made to your liking.",
                items: ["Turkish Rolls", "Bagels & Wraps", "Sourdough Toast", "Kids Meal Deal"],
              },
              {
                title: "House-Made Treats",
                desc: "Baked fresh in-house — sausage rolls, muffins, scones, cakes, bliss balls, and croissants.",
                items: ["Sausage Rolls", "Savoury Muffins", "Scones with Cream", "Cakes & Bliss Balls"],
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-white border border-[var(--border)] rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--purple)]/10 flex items-center justify-center mb-5">
                  <div className="w-3 h-3 rounded-full bg-[var(--purple)]" />
                </div>
                <h3 className="font-display text-2xl text-[var(--espresso)] mb-3">{card.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-5">{card.desc}</p>
                <ul className="space-y-2">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--warm-gray)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Menu price highlights */}
          <motion.div {...fadeUp} className="text-center mb-10">
            <h3 className="font-display text-3xl text-[var(--espresso)] mb-2">Popular picks</h3>
            <p className="text-[var(--muted)] text-sm">A taste of what&apos;s on the menu.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Flat White",      price: "$7.00",  tag: "Coffee"  },
              { name: "Iced Latte",      price: "$9.20",  tag: "Cold"    },
              { name: "Turkish Roll",    price: "$15.00", tag: "Food"    },
              { name: "Bagel",           price: "$15.00", tag: "Food"    },
              { name: "Sausage Roll",    price: "$8.00",  tag: "Cabinet" },
              { name: "Smoothie",        price: "$11.50", tag: "Drinks"  },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-[var(--purple-muted)] rounded-xl p-5 flex flex-col gap-1.5 text-center"
              >
                <span className="text-[0.65rem] text-[var(--teal)] font-semibold tracking-wide uppercase">{item.tag}</span>
                <h4 className="font-display text-base text-[var(--espresso)] leading-tight">{item.name}</h4>
                <p className="text-[var(--purple)] text-sm font-semibold mt-auto pt-1">{item.price}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <a
              href="https://www.ubereats.com/au/store/coffee-cure-cafe/yBcrVYe5TzW9yVG4ve1raQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--teal)] hover:bg-[var(--teal-dark)] text-white text-sm font-semibold rounded-full transition-all hover:scale-[1.02]"
            >
              Order Online via Uber Eats <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FIND US ───────────────────────────────────────────────────────────── */}
      <section id="find-us" className="py-28 px-6 bg-[var(--stone-light)]/40">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-semibold mb-3">
              Come visit
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--espresso)] mb-4">
              Find Us
            </h2>
            <p className="text-[var(--muted)] max-w-sm mx-auto">
              We&apos;re easy to find on Military Road in Largs North.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Map */}
            <motion.div
              {...fadeUp}
              className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm"
            >
              <iframe
                title="Coffee Cure Cafe location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.9!2d138.4784!3d-34.8214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0c3e0a1234567%3A0x0!2s595a+Military+Rd%2C+Largs+North+SA+5016!5e0!3m2!1sen!2sau!4v1"
                width="100%"
                height="360"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* Contact details */}
            <motion.div {...fadeUp} className="space-y-7">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  content: (
                    <>
                      <p className="text-[var(--warm-gray)] font-medium">Shop 2/595a Military Rd<br />Largs North SA 5016</p>
                      <a
                        href="https://maps.google.com/?q=595a+Military+Rd,+Largs+North+SA+5016"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[var(--purple)] text-sm mt-2 hover:underline font-medium"
                      >
                        Get directions <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  ),
                },
                {
                  icon: Phone,
                  label: "Phone",
                  content: (
                    <a href="tel:+61882485000" className="text-[var(--warm-gray)] font-medium hover:text-[var(--purple)] transition-colors">
                      (08) 8248 5000
                    </a>
                  ),
                },
                {
                  icon: Mail,
                  label: "Email",
                  content: (
                    <a href="mailto:coffeecurecafe@gmail.com" className="text-[var(--warm-gray)] font-medium hover:text-[var(--purple)] transition-colors">
                      coffeecurecafe@gmail.com
                    </a>
                  ),
                },
                {
                  icon: Clock,
                  label: "Hours",
                  content: (
                    <p className="text-[var(--warm-gray)] font-medium text-sm leading-relaxed">
                      Mon–Tue & Thu–Fri: 6:30am – 2pm<br />
                      Sat–Sun: 7:30am – 12pm<br />
                      <span className="text-[var(--teal)]">Closed Wednesdays</span>
                    </p>
                  ),
                },
              ].map(({ icon: Icon, label, content }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[var(--purple)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[var(--purple)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium mb-1">{label}</p>
                    {content}
                  </div>
                </div>
              ))}

              {/* Social */}
              <div>
                <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium mb-3">Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/coffeecurecafe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-[var(--purple-muted)] hover:bg-[var(--purple)] text-[var(--purple)] hover:text-white rounded-lg transition-all text-sm font-medium"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/coffeecurecafeadl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-[var(--purple-muted)] hover:bg-[var(--purple)] text-[var(--purple)] hover:text-white rounded-lg transition-all text-sm font-medium"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
