"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, ExternalLink, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#about",    label: "About"    },
  { href: "#services", label: "Services" },
  { href: "#hours",    label: "Hours"    },
  { href: "#find-us",  label: "Find Us"  },
];

function smoothScroll(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.65, ease: "easeOut" },
};

const HOURS = [
  { day: "Monday",    time: "6:30am – 2:00pm", closed: false },
  { day: "Tuesday",   time: "6:30am – 2:00pm", closed: false },
  { day: "Wednesday", time: "Closed",           closed: true  },
  { day: "Thursday",  time: "6:30am – 2:00pm", closed: false },
  { day: "Friday",    time: "6:30am – 2:00pm", closed: false },
  { day: "Saturday",  time: "7:30am – 12:00pm", closed: false },
  { day: "Sunday",    time: "7:30am – 12:00pm", closed: false },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const heroH = heroRef.current?.offsetHeight ?? window.innerHeight;
      setScrolled(window.scrollY > heroH * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    smoothScroll(href);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          DROPDOWN NAV — fixed, only visible after hero scrolls away
      ═══════════════════════════════════════════════════════════════════ */}
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
              {/* Logo + name */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3"
              >
                <Image src="/logo.png" alt="Coffee Cure Cafe" width={42} height={42} className="rounded-full" />
                <span
                  style={{ fontFamily: "var(--font-pacifico), cursive" }}
                  className="hidden sm:block text-[var(--purple)] text-base leading-tight"
                >
                  Coffee Cure Cafe
                </span>
              </button>

              {/* Desktop links */}
              <nav className="hidden md:flex items-center gap-7">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className="text-sm font-medium text-[var(--muted)] hover:text-[var(--purple)] transition-colors cursor-pointer"
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

              {/* Mobile toggle */}
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 49 }}
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
          HERO — nav lives INSIDE here as absolute, scrolls away with hero
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85&auto=format&fit=crop"
          alt="Coffee beans and espresso"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1A3D]/80 via-[#2D1A3D]/55 to-[#2D1A3D]/80" />

        {/* ── Hero nav — absolute inside hero, scrolls away with it ─────── */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-end">
            {/* Desktop nav links only — no logo, no Order Online (those are in the hero CTAs) */}
            <nav className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer drop-shadow"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Mobile hamburger on hero */}
            <button
              className="md:hidden text-white drop-shadow"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ── Hero content ─────────────────────────────────────────────── */}
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
          {/* Big logo only */}
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

          {/* CTAs — bold, no emojis */}
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
              className="flex items-center justify-center px-9 py-4 bg-[var(--teal)] hover:bg-[var(--teal-dark)] text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.04] active:scale-[0.98]"
            >
              Order Online
            </a>
            <button
              onClick={() => smoothScroll("#find-us")}
              className="flex items-center justify-center px-9 py-4 bg-white/15 hover:bg-white/25 border-2 border-white/60 hover:border-white text-white text-base font-bold rounded-2xl backdrop-blur-sm transition-all hover:scale-[1.04] active:scale-[0.98]"
            >
              Find Us
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto">

          {/* Cafe story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center mb-24">
            <motion.div {...fadeUp}>
              <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-bold mb-4">About Us</p>
              <h2
                style={{ fontFamily: "var(--font-pacifico), cursive" }}
                className="text-4xl md:text-5xl text-[var(--purple)] leading-tight mb-6"
              >
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
                className="object-cover"
                style={{ objectPosition: "center 25%" }}
              />
            </motion.div>
            <motion.div {...fadeUp} className="order-1 md:order-2">
              <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-bold mb-4">Meet the owner</p>
              <h2
                style={{ fontFamily: "var(--font-pacifico), cursive" }}
                className="text-4xl text-[var(--purple)] leading-tight mb-6"
              >
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
                Come say hi! I&apos;d love to make you my go-to order: a macadamia milk latte.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-24 px-6 bg-[var(--cream)]">
        <div className="max-w-3xl mx-auto">

          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-bold mb-3">More reasons to love us</p>
            <h2
              style={{ fontFamily: "var(--font-pacifico), cursive" }}
              className="text-4xl md:text-5xl text-[var(--purple)] mb-4"
            >
              Our Services
            </h2>
          </motion.div>

          <div className="flex flex-col gap-12">
            {/* Loyalty Rewards */}
            <motion.div {...fadeUp} className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--purple)] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <div>
                <h3
                  style={{ fontFamily: "var(--font-pacifico), cursive" }}
                  className="text-2xl text-[var(--purple)] mb-2"
                >
                  Loyalty Rewards Card
                </h3>
                <p className="text-[var(--muted)] leading-relaxed">
                  Every coffee gets you one step closer to a free one. Pick up your loyalty card in-store and collect a stamp with every purchase. Fill your card, earn a free coffee — no app, no fuss.
                </p>
              </div>
            </motion.div>

            <div className="border-t border-[var(--border)]" />

            {/* Custom Merch */}
            <motion.div {...fadeUp} className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--teal)] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
              </div>
              <div>
                <h3
                  style={{ fontFamily: "var(--font-pacifico), cursive" }}
                  className="text-2xl text-[var(--purple)] mb-2"
                >
                  Custom Merch
                </h3>
                <p className="text-[var(--muted)] leading-relaxed">
                  Take a little piece of the cafe home. We stock custom-branded tees, tote bags, and more — limited runs, available in-store at the counter. Makes a great gift for the coffee lover in your life.
                </p>
              </div>
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
            <h2
              style={{ fontFamily: "var(--font-pacifico), cursive" }}
              className="text-4xl md:text-5xl text-white mb-3"
            >
              Opening Hours
            </h2>
            <p className="text-white/40 text-sm">Open six days a week — closed Wednesdays.</p>
          </motion.div>

          <motion.div {...fadeUp}>
            {HOURS.map((h, i) => (
              <div
                key={h.day}
                className={`flex items-center justify-between py-5 ${i !== HOURS.length - 1 ? "border-b border-white/10" : ""}`}
              >
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
          FIND US
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="find-us" className="py-24 px-6 bg-[var(--lavender-light)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--teal)] text-xs tracking-[0.22em] uppercase font-bold mb-3">Come visit</p>
            <h2
              style={{ fontFamily: "var(--font-pacifico), cursive" }}
              className="text-4xl md:text-5xl text-[var(--purple)] mb-4"
            >
              Find Us
            </h2>
            <p className="text-[var(--muted)] max-w-sm mx-auto">
              Easy to find on Military Road in Largs North — parking out front.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
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
                <a
                  href="tel:+61882485000"
                  className="flex items-center gap-2 text-[var(--warm-gray)] hover:text-[var(--purple)] transition-colors font-medium"
                >
                  <Phone className="w-4 h-4 text-[var(--purple)] shrink-0" />
                  (08) 8248 5000
                </a>
              </div>

              <div>
                <p className="text-[var(--teal)] text-xs uppercase tracking-widest font-bold mb-2">Email</p>
                <a
                  href="mailto:coffeecurecafe@gmail.com"
                  className="flex items-center gap-2 text-[var(--warm-gray)] hover:text-[var(--purple)] transition-colors font-medium"
                >
                  <Mail className="w-4 h-4 text-[var(--purple)] shrink-0" />
                  coffeecurecafe@gmail.com
                </a>
              </div>

              <div>
                <p className="text-[var(--teal)] text-xs uppercase tracking-widest font-bold mb-3">Follow Us</p>
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
