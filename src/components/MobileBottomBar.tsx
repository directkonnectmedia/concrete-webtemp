"use client";
import { useState, useEffect } from "react";

export default function MobileBottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3 p-3 max-w-lg mx-auto">
        <a
          href="tel:+14803062547"
          className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-semibold text-sm py-3 rounded-full"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          Call Now
        </a>
        <a
          href="#quote"
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange to-orange-light text-white font-semibold text-sm py-3 rounded-full"
        >
          Free Quote
        </a>
      </div>
    </div>
  );
}
