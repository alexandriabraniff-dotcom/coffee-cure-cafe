import Link from "next/link";
import { Coffee, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--espresso)] text-[var(--stone-light)]">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="w-5 h-5 text-[var(--terracotta)]" />
            <span className="font-display text-lg text-white">Coffee Cure Cafe</span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--stone-light)]/70">
            Your local specialty coffee spot in Largs North. Fresh food, great coffee, good vibes.
          </p>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-white font-medium mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--terracotta)]" />
            Trading Hours
          </h4>
          <ul className="text-sm space-y-1.5 text-[var(--stone-light)]/70">
            <li className="flex justify-between"><span>Mon – Tue</span><span>6:30am – 2:00pm</span></li>
            <li className="flex justify-between"><span>Wednesday</span><span className="text-[var(--terracotta)]">Closed</span></li>
            <li className="flex justify-between"><span>Thu – Fri</span><span>6:30am – 2:00pm</span></li>
            <li className="flex justify-between"><span>Sat – Sun</span><span>7:30am – 12:00pm</span></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-medium mb-4">Find Us</h4>
          <ul className="text-sm space-y-3 text-[var(--stone-light)]/70">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-[var(--terracotta)] shrink-0" />
              <span>Shop 2/595a Military Rd,<br />Largs North SA 5016</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--terracotta)] shrink-0" />
              <a href="tel:+61882485000" className="hover:text-white transition-colors">(08) 8248 5000</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--terracotta)] shrink-0" />
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
