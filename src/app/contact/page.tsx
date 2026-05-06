"use client";

import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" } as const,
  transition: { duration: 0.65, ease: "easeOut" },
};

const hours = [
  { day: "Monday", time: "6:30am – 2:00pm", closed: false },
  { day: "Tuesday", time: "6:30am – 2:00pm", closed: false },
  { day: "Wednesday", time: "Closed", closed: true },
  { day: "Thursday", time: "6:30am – 2:00pm", closed: false },
  { day: "Friday", time: "6:30am – 2:00pm", closed: false },
  { day: "Saturday", time: "7:30am – 12:00pm", closed: false },
  { day: "Sunday", time: "7:30am – 12:00pm", closed: false },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[var(--espresso)] py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[var(--terracotta)] text-xs tracking-[0.2em] uppercase font-medium mb-4">
            We&apos;d love to see you
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4">Find Us</h1>
          <p className="text-[var(--stone-light)]/60 max-w-md mx-auto">
            Drop in for your morning coffee or give us a call.
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-6 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact details */}
          <motion.div {...fadeUp} className="space-y-10">
            <div>
              <h2 className="font-display text-3xl text-[var(--espresso)] mb-6">Get in touch</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[var(--terracotta)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium mb-1">Address</p>
                    <p className="text-[var(--warm-gray)]">Shop 2/595a Military Rd<br />Largs North SA 5016</p>
                    <a
                      href="https://maps.google.com/?q=595a+Military+Rd,+Largs+North+SA+5016"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--terracotta)] text-sm mt-2 hover:underline"
                    >
                      Get directions <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[var(--terracotta)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium mb-1">Phone</p>
                    <a href="tel:+61882485000" className="text-[var(--warm-gray)] hover:text-[var(--terracotta)] transition-colors">
                      (08) 8248 5000
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[var(--terracotta)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium mb-1">Email</p>
                    <a href="mailto:coffeecurecafe@gmail.com" className="text-[var(--warm-gray)] hover:text-[var(--terracotta)] transition-colors">
                      coffeecurecafe@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h2 className="font-display text-3xl text-[var(--espresso)] mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-[var(--terracotta)]" />
                Trading Hours
              </h2>
              <div className="divide-y divide-[var(--border)]">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between py-3 text-sm">
                    <span className="text-[var(--warm-gray)]">{h.day}</span>
                    <span className={h.closed ? "text-[var(--terracotta)]" : "text-[var(--muted)]"}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map embed */}
          <motion.div {...fadeUp} className="flex flex-col gap-6">
            <h2 className="font-display text-3xl text-[var(--espresso)]">Where to find us</h2>
            <div className="rounded-xl overflow-hidden border border-[var(--border)] flex-1 min-h-[380px]">
              <iframe
                title="Coffee Cure Cafe location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.9!2d138.4784!3d-34.8214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0c3e0a1234567%3A0x0!2s595a+Military+Rd%2C+Largs+North+SA+5016!5e0!3m2!1sen!2sau!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "380px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-sm text-[var(--muted)]">
              We&apos;re in the small shopping strip on Military Road. Parking is available out front.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
