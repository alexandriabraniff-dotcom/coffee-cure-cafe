"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[var(--cream)] border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Purple circle logo approximating their brand mark */}
          <div className="w-10 h-10 rounded-full bg-[var(--purple)] flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
              {/* Coffee cup with steam swirls */}
              <ellipse cx="20" cy="26" rx="9" ry="5" fill="white" opacity="0.9"/>
              <rect x="11" y="21" width="18" height="8" rx="2" fill="white" opacity="0.9"/>
              <path d="M29 23 Q33 23 33 26 Q33 29 29 29" stroke="white" strokeWidth="1.5" fill="none" opacity="0.8"/>
              <path d="M15 18 Q16 15 15 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
              <path d="M20 17 Q21 14 20 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
              <path d="M25 18 Q26 15 25 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
            </svg>
          </div>
          <div className="leading-none">
            <span className="font-display text-lg text-[var(--espresso)] block">Coffee Cure</span>
            <span className="text-[0.6rem] tracking-[0.15em] text-[var(--purple)] uppercase font-medium">Cafe</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors hover:text-[var(--purple)] ${
                pathname === link.href
                  ? "text-[var(--purple)] font-medium"
                  : "text-[var(--muted)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[var(--espresso)]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--cream)] border-b border-[var(--border)] overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-base transition-colors hover:text-[var(--purple)] ${
                    pathname === link.href
                      ? "text-[var(--purple)] font-medium"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
