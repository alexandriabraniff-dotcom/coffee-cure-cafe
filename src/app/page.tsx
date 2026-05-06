"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Clock, MapPin, Coffee, UtensilsCrossed, Heart } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.65, ease: "easeOut" },
};

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
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--espresso)]/60 via-[var(--espresso)]/40 to-[var(--espresso)]/70" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--terracotta)] text-sm tracking-[0.2em] uppercase mb-4 font-medium"
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
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 text-white text-sm font-medium tracking-wide rounded transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              View Our Menu
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 hover:border-white text-white text-sm font-medium tracking-wide rounded transition-all hover:bg-white/10"
            >
              Find Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hours strip */}
      <section className="bg-[var(--espresso)] text-white py-5">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-center">
          <span className="flex items-center gap-2 text-[var(--stone-light)]/70">
            <Clock className="w-4 h-4 text-[var(--terracotta)]" />
            Mon–Tue &amp; Thu–Fri: <strong className="text-white ml-1">6:30am – 2pm</strong>
          </span>
          <span className="hidden sm:block text-white/20">|</span>
          <span className="flex items-center gap-2 text-[var(--stone-light)]/70">
            Sat–Sun: <strong className="text-white ml-1">7:30am – 12pm</strong>
          </span>
          <span className="hidden sm:block text-white/20">|</span>
          <span className="text-[var(--terracotta)]">Closed Wednesdays</span>
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
                className="bg-[var(--stone-light)]/40 rounded-xl p-8 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-[var(--terracotta)]" />
                </div>
                <h3 className="font-display text-2xl text-[var(--espresso)] mb-3">{item.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split image section */}
      <section className="bg-[var(--stone-light)]/30">
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
            <p className="text-[var(--terracotta)] text-xs tracking-[0.18em] uppercase font-medium mb-4">
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
              className="inline-flex items-center gap-2 text-[var(--terracotta)] text-sm font-medium hover:gap-3 transition-all"
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
                <span className="text-xs text-[var(--terracotta)] font-medium tracking-wide uppercase">{item.tag}</span>
                <h4 className="font-display text-xl text-[var(--espresso)]">{item.name}</h4>
                <p className="text-[var(--muted)] text-sm mt-auto pt-2 font-medium">{item.price}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--espresso)] hover:bg-[var(--espresso)]/90 text-[var(--cream)] text-sm font-medium tracking-wide rounded transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Location CTA */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1800&q=85&auto=format&fit=crop"
          alt="Cafe table with coffee and morning light"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--espresso)]/75" />
        <motion.div {...fadeUp} className="relative z-10 text-center px-6 max-w-xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-5">
            Come say hello
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            We&apos;re open six days a week at Shop 2/595a Military Rd, Largs North.<br />
            Pop in and let us make your morning a little better.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm mb-8">
            <MapPin className="w-4 h-4 text-[var(--terracotta)]" />
            Shop 2/595a Military Rd, Largs North SA 5016
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 text-white text-sm font-medium tracking-wide rounded transition-all hover:scale-[1.02]"
          >
            Get Directions
          </Link>
        </motion.div>
      </section>
    </>
  );
}
