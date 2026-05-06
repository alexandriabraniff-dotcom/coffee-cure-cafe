"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, ExternalLink, Menu, X } from "lucide-react";

// ─── Nav links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#about",    label: "About"    },
  { href: "#hours",    label: "Hours"    },
  { href: "#services", label: "Services" },
  { href: "#find-us",  label: "Find Us"  },
];

function smoothScroll(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Fade-up helper ───────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.65, ease: "easeOut" },
};

// ─── Hours ────────────────────────────────────────────────────────────────────
const HOURS = [
  { day: "Monday",    time: "6:30am – 2:00pm", closed: false },
  { day: "Tuesday",   time: "6:30am – 2:00pm", closed: false },
  { day: "Wednesday", time: "Closed",           closed: true  },
  { day: "Thursday",  time: "6:30am – 2:00pm", closed: false },
  { day: "Friday",    time: "6:30am – 2:00pm", closed: false },
  { day: "Saturday",  time: "7:30am – 12:00pm", closed: false },
  { day: "Sunday",    time: "7:30am – 12:00pm", closed: false },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
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

  const handleNav = (href: string) => {
    setMobileOpen(false);
    smoothScroll(href);
  };

  // Shared desktop nav links + CTA
  const DesktopLinks = ({ light }: { light: boolean }) => (
    <nav className="hidden md:flex items-center gap-7">
      {NAV_LINKS.map((link) => (
        <button
          key={link.href}
          onClick={() => handleNav(link.href)}
          className={`text-sm font-medium tracking-wide transition-colors cursor-pointer ${
            light ? "text-white/85 hover:text-white" : "text-[var(--muted)] hover:text-[var(--purple)]"
          }`}
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
  );

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO NAV — uses inline style to guarantee fixed position
      ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40 }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="shrink-0">
            <Image src="/logo.png" alt="Coffee Cure Cafe" width={58} height={58} className="rounded-full shadow-md" />
          </button>
          <DesktopLinks light />
          <button
            className="md:hidden text-white drop-shadow"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── DROPDOWN NAV — slides in after hero ─────────────────────────── */}
      <AnimatePresence>
        {scrolled && (
          <motion.header
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            exit={{ y: -80 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
            className="bg-[var(--cream)] border-b border-[var(--border)] shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3"
              >
                <Image src="/logo.png" alt="Coffee Cure Cafe" width={42} height={42} className="rounded-full" />
                <span style={{ fontFamily: "var(--font-pacifico), cursive" }} className="hidden sm:block text-[var(--purple)] text-base leading-tight">
                  Coffee Cure Cafe
                </span>
              </button>
              <DesktopLinks light={false} />
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

      {/* ── MOBILE DRAWER ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 45 }}
            className="bg-[var(--espresso)] pt-20 pb-8 px-8 flex flex-col gap-5 md:hidden shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{ fontFamily: "var(--font-pacifico), cursive" }}
                className="text-white text-2xl text-left border-b border-white/10 pb-4"
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

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85&auto=format&fit=crop"
          alt="Coffee beans and espresso"
          fill
          className="object-cover"
          priority
        />
        {/* Rich purple-tinted overlay for brand feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1A3D]/80 via-[#2D1A3D]/55 to-[#2D1A3D]/80" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
          {/* Big logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-7"
          >
            <Image
              src="/logo.png"
              alt="Coffee Cure Cafe"
              width={160}
              height={160}
              className="rounded-full shadow-2xl ring-4 ring-white/20"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            style={{ fontFamily: "var(--font-pacifico), cursive" }}
            className="text-4xl md:text-6xl text-white leading-tight mb-4 drop-shadow-lg"
          >
            Your daily cure,<br />one cup at a time.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="text-white/70 text-base md:text-lg leading-relaxed mb-10"
          >
            Specialty coffee, fresh food & house-made treats —
            <br className="hidden md:block" /> served with a warm smile every morning.
          </motion.p>

          {/* HERO CTAs — bold and eye-catching */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <a
              href="https://www.ubereats.com/au/store/coffee-cure-cafe/yBcrVYe5TzW9yVG4ve1raQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--teal)] hover:bg-[var(--teal-dark)] text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.04] active:scale-[0.98]"
            >
              🛒 Order Online
            </a>
            <button
              onClick={() => smoothScroll("#find-us")}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/15 hover:bg-white/25 border-2 border-white/60 hover:border-white text-white text-base font-bold rounded-2xl backdrop-blur-sm transition-all hover:scale-[1.04] active:scale-[0.98]"
            >
              📍 Find Us
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto">

          {/* Top: text + cafe photo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center mb-20">
            <motion.div {...fadeUp}>
              <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-bold mb-4">
                About Us
              </p>
              <h2 style={{ fontFamily: "var(--font-pacifico), cursive" }}
                className="text-4xl md:text-5xl text-[var(--purple)] leading-tight mb-6">
                A little corner worth coming back to.
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-4">
                Coffee Cure Cafe is your local specialty coffee spot tucked into Military Road in Largs North. We&apos;re the kind of place where the barista knows your order, the food is always fresh, and there&apos;s a warm welcome waiting every time you walk through the door.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                Whether you&apos;re grabbing a quick flat white before work or settling in for a long weekend brunch, we&apos;ve got you covered six days a week and have been proudly serving the Largs North community ever since.
              </p>
            </motion.div>
            <motion.div {...fadeUp} className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=85&auto=format&fit=crop"
                alt="Coffee Cure Cafe interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Meet Teresa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <motion.div {...fadeUp} className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl order-2 md:order-1">
              <Image
                src="/owner.jpg"
                alt="Teresa — owner of Coffee Cure Cafe"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </motion.div>
            <motion.div {...fadeUp} className="order-1 md:order-2">
              <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-bold mb-4">
                Meet the owner
              </p>
              <h2 style={{ fontFamily: "var(--font-pacifico), cursive" }}
                className="text-4xl text-[var(--purple)] leading-tight mb-6">
                Meet Teresa
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-4">
                Hi, I&apos;m Teresa — the owner of Coffee Cure Cafe. I&apos;ve been running the cafe since 2023, and it&apos;s been such a joy to be part of this community.
              </p>
              <p className="text-[var(--muted)] leading-relaxed mb-4">
                With a lifelong background in hospitality, opening my own cafe felt like a natural next step. I get to do what I love every day: making amazing coffee, creating delicious fresh food, and getting to know the wonderful customers who walk through our doors.
              </p>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                That&apos;s what makes me happiest — the people, the coffee, and the little moments that make Coffee Cure Cafe feel like home.
              </p>
              <p className="text-[var(--purple)] font-semibold italic">
                Come say hi! I&apos;d love to make you my go-to order: a macadamia milk latte. ☕
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOURS
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="hours" className="py-24 px-6 bg-[var(--espresso)]">
        <div className="max-w-xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-bold mb-3">When to visit</p>
            <h2 style={{ fontFamily: "var(--font-pacifico), cursive" }}
              className="text-4xl md:text-5xl text-white mb-3">
              Opening Hours
            </h2>
            <p className="text-white/40 text-sm">Open six days a week — closed Wednesdays.</p>
          </motion.div>

          <motion.div {...fadeUp}>
            {HOURS.map((h, i) => (
              <div key={h.day}
                className={`flex items-center justify-between py-5 ${i !== HOURS.length - 1 ? "border-b border-white/10" : ""}`}>
                <span className={`font-medium text-base ${h.closed ? "text-white/35" : "text-white"}`}>{h.day}</span>
                <span className={`text-sm ${h.closed ? "text-[var(--teal)] italic" : "text-white/55"}`}>{h.time}</span>
              </div>
            ))}
          </motion.div>

          <motion.p {...fadeUp} className="text-center text-white/25 text-xs mt-8">
            Hours may vary on public holidays — call (08) 8248 5000 to confirm.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-24 px-6 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-bold mb-3">What we offer</p>
            <h2 style={{ fontFamily: "var(--font-pacifico), cursive" }}
              className="text-4xl md:text-5xl text-[var(--purple)] mb-4">
              Our Menu
            </h2>
            <p className="text-[var(--muted)] max-w-sm mx-auto">
              Everything made fresh to order — coffee, food, and a little something sweet.
            </p>
          </motion.div>

          {/* Three large visual service panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85&auto=format&fit=crop",
                title: "Coffee & Drinks",
                desc: "Every cup crafted with care — from a simple long black to a silky flat white, iced latte, chai, or a thick shake.",
                items: ["Espresso & Long Black — from $4.80", "Flat White, Latte, Cappuccino — $7.00", "Chai & Mocha — $7.00–$7.50", "Iced Latte — $9.20", "Smoothies — $11.50"],
              },
              {
                image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=85&auto=format&fit=crop",
                title: "Fresh Food",
                desc: "Made to order with good ingredients — Turkish rolls, bagels, wraps, toasties, and toast done your way.",
                items: ["Turkish Roll — $15.00", "Bagel — $15.00", "Wrap — $15.20", "Toasty — $10.00", "Sourdough Toast — $7.80", "Kids Meal Deal — $14.50"],
              },
              {
                image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=85&auto=format&fit=crop",
                title: "Cabinet & Treats",
                desc: "All baked in-house. Grab one with your coffee or take a box home — they don't last long.",
                items: ["Sausage Roll (House Made) — $8.00", "Savoury Muffin — $8.90", "Scones with Cream — $9.70", "House Made Muffins — $7.80", "Cakes & Slices — from $5.20", "Croissant — $11.00"],
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.13 }}
                className="rounded-3xl overflow-hidden shadow-lg group"
              >
                {/* Photo top */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)]/60 to-transparent" />
                  <h3
                    style={{ fontFamily: "var(--font-pacifico), cursive" }}
                    className="absolute bottom-4 left-5 text-white text-2xl drop-shadow"
                  >
                    {card.title}
                  </h3>
                </div>
                {/* Content */}
                <div className="bg-white p-6">
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-5">{card.desc}</p>
                  <ul className="space-y-2">
                    {card.items.map((item) => {
                      const [name, price] = item.split(" — ");
                      return (
                        <li key={item} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-[var(--warm-gray)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] shrink-0" />
                            {name}
                          </span>
                          {price && <span className="text-[var(--purple)] font-semibold tabular-nums shrink-0 ml-2">{price}</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center">
            <a
              href="https://www.ubereats.com/au/store/coffee-cure-cafe/yBcrVYe5TzW9yVG4ve1raQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--teal)] hover:bg-[var(--teal-dark)] text-white font-bold rounded-2xl shadow-lg transition-all hover:scale-[1.03] text-base"
            >
              🛒 Order Online via Uber Eats <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FIND US
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="find-us" className="py-24 px-6 bg-[var(--lavender-light)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-bold mb-3">Come visit</p>
            <h2 style={{ fontFamily: "var(--font-pacifico), cursive" }}
              className="text-4xl md:text-5xl text-[var(--purple)] mb-4">
              Find Us
            </h2>
            <p className="text-[var(--muted)] max-w-sm mx-auto">
              Easy to find on Military Road in Largs North — parking out front.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Map */}
            <motion.div {...fadeUp} className="rounded-3xl overflow-hidden shadow-lg">
              <iframe
                title="Coffee Cure Cafe location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.9!2d138.4784!3d-34.8214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0c3e0a1234567%3A0x0!2s595a+Military+Rd%2C+Largs+North+SA+5016!5e0!3m2!1sen!2sau!4v1"
                width="100%"
                height="380"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* Clean contact details — no boxes */}
            <motion.div {...fadeUp} className="space-y-8 pt-2">
              <div>
                <p className="text-[var(--teal)] text-xs uppercase tracking-widest font-bold mb-2">Address</p>
                <a
                  href="https://maps.google.com/?q=595a+Military+Rd,+Largs+North+SA+5016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--warm-gray)] hover:text-[var(--purple)] transition-colors font-medium"
                >
                  <MapPin className="w-4 h-4 text-[var(--purple)] shrink-0" />
                  Shop 2/595a Military Rd, Largs North SA 5016
                </a>
              </div>

              <div>
                <p className="text-[var(--teal)] text-xs uppercase tracking-widest font-bold mb-2">Phone</p>
                <a href="tel:+61882485000"
                  className="flex items-center gap-2 text-[var(--warm-gray)] hover:text-[var(--purple)] transition-colors font-medium">
                  <Phone className="w-4 h-4 text-[var(--purple)] shrink-0" />
                  (08) 8248 5000
                </a>
              </div>

              <div>
                <p className="text-[var(--teal)] text-xs uppercase tracking-widest font-bold mb-2">Email</p>
                <a href="mailto:coffeecurecafe@gmail.com"
                  className="flex items-center gap-2 text-[var(--warm-gray)] hover:text-[var(--purple)] transition-colors font-medium">
                  <Mail className="w-4 h-4 text-[var(--purple)] shrink-0" />
                  coffeecurecafe@gmail.com
                </a>
              </div>

              <div>
                <p className="text-[var(--teal)] text-xs uppercase tracking-widest font-bold mb-3">Follow Us</p>
                <div className="flex flex-col gap-3">
                  <a href="https://www.facebook.com/coffeecurecafe" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[var(--warm-gray)] hover:text-[var(--purple)] transition-colors font-medium">
                    <svg className="w-5 h-5 text-[var(--purple)] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    facebook.com/coffeecurecafe
                  </a>
                  <a href="https://www.instagram.com/coffeecurecafeadl" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[var(--warm-gray)] hover:text-[var(--purple)] transition-colors font-medium">
                    <svg className="w-5 h-5 text-[var(--purple)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                    @coffeecurecafeadl
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
