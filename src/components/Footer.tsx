import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="font-[var(--font-script)] text-3xl text-orange">Solution</span>
              <span className="font-[var(--font-heading)] font-extrabold text-xl text-white uppercase tracking-tight ml-1">
                Concrete
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Premium concrete services for the Phoenix West Valley. Quality
              craftsmanship, honest pricing, beautiful results.
            </p>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Avondale, AZ 85323
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-[var(--font-heading)] font-bold text-sm uppercase tracking-wider mb-4 text-orange-light">
              Services
            </h4>
            <ul className="space-y-2.5">
              {["Driveways", "Sidewalks", "Patios", "Foundations", "Concrete Colors"].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-white/50 text-sm hover:text-orange transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[var(--font-heading)] font-bold text-sm uppercase tracking-wider mb-4 text-orange-light">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#how-it-works" className="text-white/50 text-sm hover:text-orange transition-colors">How It Works</a></li>
              <li><Link href="/gallery" className="text-white/50 text-sm hover:text-orange transition-colors">Gallery</Link></li>
              <li><a href="#reviews" className="text-white/50 text-sm hover:text-orange transition-colors">Reviews</a></li>
              <li><a href="#quote" className="text-white/50 text-sm hover:text-orange transition-colors">Get a Quote</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[var(--font-heading)] font-bold text-sm uppercase tracking-wider mb-4 text-orange-light">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+14803062547" className="flex items-center gap-2 text-white font-semibold hover:text-orange transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  (480) 306-2547
                </a>
              </li>
              <li className="text-white/50 text-sm">Mon – Sat: 7am – 6pm</li>
              <li className="text-white/50 text-sm">Sunday: Closed</li>
            </ul>
            {/* Social placeholders */}
            <div className="flex gap-3 mt-4">
              {["facebook", "instagram"].map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-orange hover:text-white transition-all duration-300">
                  <span className="text-xs font-bold uppercase">{s.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Solution Concrete Specialist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
