"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" } as const,
  transition: { duration: 0.65, ease: "easeOut" },
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[var(--espresso)] py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[var(--purple)] text-xs tracking-[0.2em] uppercase font-medium mb-4">
            Who we are
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4">Our Story</h1>
          <p className="text-[var(--stone-light)]/60 max-w-md mx-auto">
            A neighbourhood cafe built on good coffee, fresh food, and familiar faces.
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <p className="text-[var(--purple)] text-xs tracking-[0.18em] uppercase font-medium mb-5">
              Largs North, SA
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--espresso)] leading-snug mb-6">
              More than just your morning coffee.
            </h2>
            <p className="text-[var(--muted)] leading-relaxed mb-5">
              Coffee Cure Cafe was born from a simple idea: that a great local cafe can be the best part of someone&apos;s day. Tucked into Military Road in Largs North, we&apos;ve built a space that feels like home — warm, unhurried, and welcoming.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-5">
              We take our coffee seriously. Every cup is made to order, whether it&apos;s a simple long black, a velvety flat white, or a cold pressed juice for the warmer months. Our food is just as considered — fresh rolls and wraps made to your liking, alongside a cabinet full of house-baked treats that change with the day.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              We&apos;re open six days a week and closed Wednesdays — so come find us any other morning and let us be part of your routine.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="relative h-[420px] rounded-xl overflow-hidden"
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

      {/* Values */}
      <section className="bg-[var(--stone-light)]/30 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-display text-4xl text-[var(--espresso)] mb-4">What matters to us</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality first",
                desc: "We don't cut corners. Every coffee is pulled with care, every roll is made fresh, every treat is made in-house.",
              },
              {
                title: "Community",
                desc: "We're a neighbourhood cafe. We love getting to know our regulars and being a reliable part of Largs North's mornings.",
              },
              {
                title: "Warmth",
                desc: "Walk in as a stranger, leave as a regular. We're here to make your day a little better, one cup at a time.",
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-white border border-[var(--border)] rounded-xl p-8"
              >
                <h3 className="font-display text-2xl text-[var(--espresso)] mb-3">{v.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--cream)] text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-display text-4xl text-[var(--espresso)] mb-5">
            Come in and say hi
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-sm mx-auto">
            We&apos;re at Shop 2/595a Military Rd, Largs North. See you tomorrow morning.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--purple)] hover:bg-[var(--purple)]/90 text-white text-sm font-medium tracking-wide rounded transition-all hover:scale-[1.02]"
          >
            Find Us
          </Link>
        </motion.div>
      </section>
    </>
  );
}
