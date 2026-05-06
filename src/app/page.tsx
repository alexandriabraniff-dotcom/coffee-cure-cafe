"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Clock, MapPin, Coffee, UtensilsCrossed, Heart, Phone, Mail, Facebook, Instagram, ExternalLink } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.65, ease: "easeOut" },
};

const hours = [
  { day: "Monday",    time: "6:30am – 2:00pm", closed: false },
  { day: "Tuesday",   time: "6:30am – 2:00pm", closed: false },
  { day: "Wednesday", time: "Closed",           closed: true  },
  { day: "Thursday",  time: "6:30am – 2:00pm", closed: false },
  { day: "Friday",    time: "6:30am – 2:00pm", closed: false },
  { day: "Saturday",  time: "7:30am – 12:00pm", closed: false },
  { day: "Sunday",    time: "7:30am – 12:00pm", closed: false },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1800&q=85&auto=format&fit=crop"
          alt="Cozy cafe interior with warm lighting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--espresso)]/65 via-[var(--espresso)]/45 to-[var(--espresso)]/75" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--purple-light)] text-sm tracking-[0.2em] uppercase mb-4 font-medium"
          >
            Largs North, Adelaide
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight mb-6"
          >
            Your daily cure,
            <br />one cup at a time.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/75 text-lg mb-8 leading-relaxed"
          >
            Specialty coffee, fresh breakfast & lunch, and house-made treats —
            <br className="hidden md:block" /> served with a warm smile every morning.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--purple)] hover:bg-[var(--purple-dark)] text-white text-sm font-medium tracking-wide rounded transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              View Our Menu
            </Link>
            <Link
              href="#find-us"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 hover:border-white text-white text-sm font-medium tracking-wide rounded transition-all hover:bg-white/10"
            >
              Find Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hours strip */}
      <section className="bg-[var(--purple)] text-white py-5">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-center">
          <span className="flex items-center gap-2 text-white/80">
            <Clock className="w-4 h-4 text-white/60" />
            Mon–Tue &amp; Thu–Fri: <strong className="text-white ml-1">6:30am – 2pm</strong>
          </span>
          <span className="hidden sm:block text-white/30">|</span>
          <span className="text-white/80">
            Sat–Sun: <strong className="text-white ml-1">7:30am – 12pm</strong>
          </span>
          <span className="hidden sm:block text-white/30">|</span>
          <span className="text-white/60 italic">Closed Wednesdays</span>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-24 px-6 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-[var(--espresso)] mb-4">
              Good food. Great coffee.
            </h2>
            <p className="text-[var(--muted)] max-w-md mx-auto leading-relaxed">
              Everything on our menu is made with care — from our specialty brews to our house-baked pastries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Coffee,
                title: "Specialty Coffee",
                desc: "Expertly pulled espresso, silky flat whites, long blacks, chais, and more — every cup made to order.",
              },
              {
                icon: UtensilsCrossed,
                title: "Fresh Food",
                desc: "Turkish rolls, bagels, wraps, sourdough toast, and fruit toast — all fresh and made to your order.",
              },
              {
                icon: Heart,
                title: "House-Made Treats",
                desc: "House-made sausage rolls, savoury muffins, scones with cream, cakes, bliss balls, and croissants.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
                className="bg-[var(--purple-muted)] rounded-xl p-8 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--purple)]/15 flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-[var(--purple)]" />
                </div>
                <h3 className="font-display text-2xl text-[var(--espresso)] mb-3">{item.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split image section */}
      <section className="bg-[var(--stone-light)]/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="relative h-72 md:h-full min-h-[400px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85&auto=format&fit=crop"
              alt="Cup of specialty coffee"
              fill
              className="object-cover"
            />
          </div>
          <motion.div {...fadeUp} className="px-10 py-16 md:py-20">
            <p className="text-[var(--purple)] text-xs tracking-[0.18em] uppercase font-medium mb-4">
              Your neighbourhood cafe
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--espresso)] leading-snug mb-6">
              A little corner worth coming back to.
            </h2>
            <p className="text-[var(--muted)] leading-relaxed mb-6">
              Tucked away in Largs North on Military Road, Coffee Cure is the kind of place where the barista knows your order and the food is always fresh. Whether you&apos;re grabbing a quick flat white before work or sitting in for a long brunch, we&apos;ve got you covered.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[var(--purple)] text-sm font-medium hover:gap-3 transition-all"
            >
              Our story →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Menu highlight */}
      <section className="py-24 px-6 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl text-[var(--espresso)] mb-4">
              What&apos;s on the menu
            </h2>
            <p className="text-[var(--muted)] max-w-sm mx-auto">
              A little taste of what we serve every morning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { name: "Flat White", price: "$7.00", tag: "Coffee" },
              { name: "Turkish Roll", price: "$15.00", tag: "Lunch" },
              { name: "House Sausage Roll", price: "$8.00", tag: "Cabinet" },
              { name: "Smoothie", price: "$11.50", tag: "Drinks" },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-[var(--border)] rounded-xl p-6 flex flex-col gap-2"
              >
                <span className="text-xs text-[var(--purple)] font-medium tracking-wide uppercase">{item.tag}</span>
                <h4 className="font-display text-xl text-[var(--espresso)]">{item.name}</h4>
                <p className="text-[var(--muted)] text-sm mt-auto pt-2 font-medium">{item.price}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--espresso)] hover:bg-[var(--espresso)]/85 text-[var(--cream)] text-sm font-medium tracking-wide rounded transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── OPENING HOURS ── */}
      <section className="py-24 px-6 bg-[var(--espresso)]">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-[var(--purple-light)] text-xs tracking-[0.2em] uppercase font-medium mb-3">
              When to visit
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Opening Hours
            </h2>
            <p className="text-white/50 text-sm">
              We&apos;re open six days a week. Come find us.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
          >
            {hours.map((h, i) => (
              <div
                key={h.day}
                className={`flex items-center justify-between px-8 py-4 ${
                  i !== hours.length - 1 ? "border-b border-white/10" : ""
                } ${h.closed ? "opacity-50" : ""}`}
              >
                <span className="text-white font-medium">{h.day}</span>
                <span className={`text-sm font-medium ${h.closed ? "text-[var(--purple-light)] italic" : "text-white/70"}`}>
                  {h.time}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.p
            {...fadeUp}
            className="text-center text-white/40 text-xs mt-6"
          >
            Hours may vary on public holidays. Call us on (08) 8248 5000 to confirm.
          </motion.p>
        </div>
      </section>

      {/* ── FIND US ── */}
      <section id="find-us" className="py-24 px-6 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--purple)] text-xs tracking-[0.2em] uppercase font-medium mb-3">
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
                title="Coffee Cure Cafe map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.9!2d138.4784!3d-34.8214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0c3e0a1234567%3A0x0!2s595a+Military+Rd%2C+Largs+North+SA+5016!5e0!3m2!1sen!2sau!4v1"
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* Details */}
            <motion.div {...fadeUp} className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[var(--purple)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[var(--purple)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium mb-1">Address</p>
                  <p className="text-[var(--warm-gray)] font-medium">Shop 2/595a Military Rd<br />Largs North SA 5016</p>
                  <a
                    href="https://maps.google.com/?q=595a+Military+Rd,+Largs+North+SA+5016"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--purple)] text-sm mt-2 hover:underline font-medium"
                  >
                    Get directions <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[var(--purple)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-[var(--purple)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium mb-1">Phone</p>
                  <a href="tel:+61882485000" className="text-[var(--warm-gray)] font-medium hover:text-[var(--purple)] transition-colors">
                    (08) 8248 5000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[var(--purple)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-[var(--purple)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium mb-1">Email</p>
                  <a href="mailto:coffeecurecafe@gmail.com" className="text-[var(--warm-gray)] font-medium hover:text-[var(--purple)] transition-colors">
                    coffeecurecafe@gmail.com
                  </a>
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium mb-3">Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/coffeecurecafe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 bg-[var(--purple-muted)] hover:bg-[var(--purple)] text-[var(--purple)] hover:text-white rounded-lg transition-all text-sm font-medium group"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/coffeecurecafeadl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 bg-[var(--purple-muted)] hover:bg-[var(--purple)] text-[var(--purple)] hover:text-white rounded-lg transition-all text-sm font-medium"
                  >
                    <Instagram className="w-4 h-4" />
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
