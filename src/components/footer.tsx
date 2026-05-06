import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[var(--espresso)] text-[var(--stone-light)]">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-[var(--purple)] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                <ellipse cx="20" cy="26" rx="9" ry="5" fill="white" opacity="0.9"/>
                <rect x="11" y="21" width="18" height="8" rx="2" fill="white" opacity="0.9"/>
                <path d="M29 23 Q33 23 33 26 Q33 29 29 29" stroke="white" strokeWidth="1.5" fill="none" opacity="0.8"/>
                <path d="M15 18 Q16 15 15 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
                <path d="M20 17 Q21 14 20 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
                <path d="M25 18 Q26 15 25 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
              </svg>
            </div>
            <span className="font-display text-lg text-white">Coffee Cure Cafe</span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--stone-light)]/70 mb-5">
            Your local specialty coffee spot in Largs North. Fresh food, great coffee, good vibes.
          </p>
          {/* Social links */}
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/coffeecurecafe"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--purple)] flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://www.instagram.com/coffeecurecafeadl"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--purple)] flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-white font-medium mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--teal)]" />
            Trading Hours
          </h4>
          <ul className="text-sm space-y-1.5 text-[var(--stone-light)]/70">
            <li className="flex justify-between"><span>Mon – Tue</span><span>6:30am – 2:00pm</span></li>
            <li className="flex justify-between"><span>Wednesday</span><span className="text-[var(--teal)]">Closed</span></li>
            <li className="flex justify-between"><span>Thu – Fri</span><span>6:30am – 2:00pm</span></li>
            <li className="flex justify-between"><span>Sat – Sun</span><span>7:30am – 12:00pm</span></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-medium mb-4">Find Us</h4>
          <ul className="text-sm space-y-3 text-[var(--stone-light)]/70">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-[var(--teal)] shrink-0" />
              <span>Shop 2/595a Military Rd,<br />Largs North SA 5016</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--teal)] shrink-0" />
              <a href="tel:+61882485000" className="hover:text-white transition-colors">(08) 8248 5000</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--teal)] shrink-0" />
              <a href="mailto:coffeecurecafe@gmail.com" className="hover:text-white transition-colors">coffeecurecafe@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-[var(--stone-light)]/40">
        © {new Date().getFullYear()} Coffee Cure Cafe. All rights reserved.
      </div>
    </footer>
  );
}
