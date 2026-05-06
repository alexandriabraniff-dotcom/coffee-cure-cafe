"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, ExternalLink, Menu, X } from "lucide-react";

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ size = 44 }: { size?: number }) {
  // Uses /logo.png if present, otherwise falls back to SVG
  return (
    <div style={{ width: size, height: size }} className="relative shrink-0">
      <Image
        src="/logo.png"
        alt="Coffee Cure Cafe logo"
        fill
        className="object-contain rounded-full"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    </div>
  );
}

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

  const NavContent = ({ light }: { light: boolean }) => (
    <>
      <nav className="hidden md:flex items-center gap-7">
        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNav(link.href)}
            className={`text-sm font-medium tracking-wide transition-colors ${
              light
                ? "text-white/85 hover:text-white"
                : "text-[var(--muted)] hover:text-[var(--purple)]"
            }`}
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
      <button
        className={`md:hidden ${light ? "text-white" : "text-[var(--espresso)]"}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </>
  );

  return (
    <>
      {/* ── HERO NAV — fixed, stays at top, never moves ───────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Logo size={50} />
          </button>
          <NavContent light />
        </div>
      </div>

      {/* ── STICKY DROPDOWN — slides in after hero ────────────────────────── */}
      <AnimatePresence>
        {scrolled && (
          <motion.header
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            exit={{ y: -80 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-[var(--cream)] border-b border-[var(--border)] shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3"
              >
                <Logo size={38} />
                <div className="hidden sm:block leading-none">
                  <span className="font-display text-base text-[var(--espresso)] block">Coffee Cure</span>
                  <span className="text-[0.6rem] tracking-[0.15em] text-[var(--teal)] uppercase font-semibold">Cafe</span>
                </div>
              </button>
              <NavContent light={false} />
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────────── */}
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
                onClick={() => handleNav(link.href)}
                className="text-white text-2xl font-display text-left border-b border-white/10 pb-4"
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

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1800&q=85&auto=format&fit=crop"
          alt="Cozy cafe interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/72" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight mb-6 drop-shadow-lg"
          >
            Your daily cure,
            <br />one cup at a time.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38 }}
            className="text-white/70 text-lg leading-relaxed"
          >
            Specialty coffee, fresh breakfast & lunch, and house-made treats —
            <br className="hidden md:block" /> served with a warm smile every morning.
          </motion.p>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/35 text-[0.65rem] tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-px h-7 bg-white/25 rounded-full"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-28 px-6 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-semibold mb-5">
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
          <motion.div {...fadeUp} className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=85&auto=format&fit=crop"
              alt="Warm cafe interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HOURS
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="hours" className="py-28 px-6 bg-[var(--espresso)]">
        <div className="max-w-xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-semibold mb-3">
              When to visit
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-3">Opening Hours</h2>
            <p className="text-white/40 text-sm">Open six days a week — closed Wednesdays.</p>
          </motion.div>

          <motion.div {...fadeUp} className="space-y-0">
            {HOURS.map((h, i) => (
              <div
                key={h.day}
                className={`flex items-center justify-between py-5 ${
                  i !== HOURS.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <span className={`text-base font-medium ${h.closed ? "text-white/35" : "text-white"}`}>
                  {h.day}
                </span>
                <span className={`text-sm ${h.closed ? "text-[var(--teal)] italic" : "text-white/55"}`}>
                  {h.time}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.p {...fadeUp} className="text-center text-white/25 text-xs mt-8">
            Hours may vary on public holidays — call (08) 8248 5000 to confirm.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-28 px-6 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-semibold mb-3">
              What we offer
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--espresso)] mb-4">Our Services</h2>
            <p className="text-[var(--muted)] max-w-md mx-auto leading-relaxed">
              From your first espresso to your last sip — everything made fresh, every morning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-12">
            {[
              {
                title: "Specialty Coffee",
                desc: "Expertly pulled espresso, silky flat whites, long blacks, chais, mochas — every cup made to order.",
                items: ["Espresso & Long Black", "Flat White & Latte", "Chai & Mocha", "Iced Coffee & Smoothies"],
              },
              {
                title: "Fresh Food",
                desc: "Turkish rolls, bagels, wraps, sourdough and fruit toast — all fresh and made to your liking.",
                items: ["Turkish Rolls & Bagels", "Wraps & Toasties", "Sourdough Toast", "Kids Meal Deal"],
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
                <div className="w-10 h-10 rounded-full bg-[var(--purple)]/10 flex items-center justify-center mb-5">
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

          <motion.div {...fadeUp} className="text-center">
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

      {/* ══════════════════════════════════════════════════════════════════════
          FIND US
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="find-us" className="py-28 px-6 bg-[var(--stone-light)]/40">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-semibold mb-3">
              Come visit
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--espresso)] mb-4">Find Us</h2>
            <p className="text-[var(--muted)] max-w-sm mx-auto">
              We&apos;re easy to find on Military Road in Largs North.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            {/* Map */}
            <motion.div {...fadeUp} className="rounded-2xl overflow-hidden shadow-sm">
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

            {/* Details — clean, no boxes */}
            <motion.div {...fadeUp} className="space-y-8 pt-2">

              {/* Address — clicking opens Google Maps */}
              <div>
                <p className="text-xs text-[var(--teal)] uppercase tracking-widest font-semibold mb-2">Address</p>
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

              {/* Phone */}
              <div>
                <p className="text-xs text-[var(--teal)] uppercase tracking-widest font-semibold mb-2">Phone</p>
                <a
                  href="tel:+61882485000"
                  className="flex items-center gap-2 text-[var(--warm-gray)] hover:text-[var(--purple)] transition-colors font-medium"
                >
                  <Phone className="w-4 h-4 text-[var(--purple)] shrink-0" />
                  (08) 8248 5000
                </a>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs text-[var(--teal)] uppercase tracking-widest font-semibold mb-2">Email</p>
                <a
                  href="mailto:coffeecurecafe@gmail.com"
                  className="flex items-center gap-2 text-[var(--warm-gray)] hover:text-[var(--purple)] transition-colors font-medium"
                >
                  <Mail className="w-4 h-4 text-[var(--purple)] shrink-0" />
                  coffeecurecafe@gmail.com
                </a>
              </div>

              {/* Social media */}
              <div>
                <p className="text-xs text-[var(--teal)] uppercase tracking-widest font-semibold mb-4">Follow Us</p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.facebook.com/coffeecurecafe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[var(--warm-gray)] hover:text-[var(--purple)] transition-colors font-medium"
                  >
                    <svg className="w-5 h-5 text-[var(--purple)] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    facebook.com/coffeecurecafe
                  </a>
                  <a
                    href="https://www.instagram.com/coffeecurecafeadl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[var(--warm-gray)] hover:text-[var(--purple)] transition-colors font-medium"
                  >
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
