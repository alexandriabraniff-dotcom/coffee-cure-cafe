import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--espresso)] text-white/70">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Image src="/logo.png" alt="Coffee Cure Cafe" width={52} height={52} className="rounded-full" />
            <span style={{ fontFamily: "var(--font-pacifico), cursive" }} className="text-white text-lg leading-tight">
              Coffee Cure<br />Cafe
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-5">
            Your local specialty coffee spot in Largs North. Fresh food, great coffee, good vibes.
          </p>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/coffeecurecafe" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-[3px] bg-white/10 hover:bg-[var(--teal)] flex items-center justify-center transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/coffeecurecafeadl" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-[3px] bg-white/10 hover:bg-[var(--teal)] flex items-center justify-center transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
            <Clock className="w-4 h-4 text-[var(--teal)]" /> Trading Hours
          </h4>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Mon – Tue</span><span className="text-white/90">6:30am – 2:00pm</span></li>
            <li className="flex justify-between"><span>Wednesday</span><span className="text-[var(--teal)]">Closed</span></li>
            <li className="flex justify-between"><span>Thu – Fri</span><span className="text-white/90">6:30am – 2:00pm</span></li>
            <li className="flex justify-between"><span>Sat – Sun</span><span className="text-white/90">7:30am – 12:00pm</span></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Find Us</h4>
          <ul className="text-sm space-y-3">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-[var(--teal)] shrink-0" />
              <a href="https://maps.google.com/?q=595a+Military+Rd,+Largs+North+SA+5016" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Shop 2/595a Military Rd, Largs North SA 5016
              </a>
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
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/30">
        © 2023 Coffee Cure Cafe. All rights reserved.
      </div>
    </footer>
  );
}
