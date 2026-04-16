"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="font-[var(--font-script)] text-2xl text-orange">
            Solution
          </span>
          <span className="font-[var(--font-heading)] font-extrabold text-xl text-navy tracking-tight uppercase">
            Concrete
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#services" className={`text-sm font-medium transition-colors ${scrolled ? "text-dark hover:text-orange" : "text-white hover:text-orange-light"}`}>
            Services
          </a>
          <a href="#how-it-works" className={`text-sm font-medium transition-colors ${scrolled ? "text-dark hover:text-orange" : "text-white hover:text-orange-light"}`}>
            How It Works
          </a>
          <a href="#gallery" className={`text-sm font-medium transition-colors ${scrolled ? "text-dark hover:text-orange" : "text-white hover:text-orange-light"}`}>
            Gallery
          </a>
          <a href="#reviews" className={`text-sm font-medium transition-colors ${scrolled ? "text-dark hover:text-orange" : "text-white hover:text-orange-light"}`}>
            Reviews
          </a>
          <a
            href="tel:+14803062547"
            className={`text-sm font-semibold transition-colors ${scrolled ? "text-navy" : "text-white"}`}
          >
            (480) 306-2547
          </a>
          <a
            href="#quote"
            className="bg-gradient-to-r from-orange to-orange-light text-white font-semibold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get Free Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-dark" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-dark" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-dark" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white shadow-xl`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          <a href="#services" onClick={() => setMenuOpen(false)} className="text-dark font-medium hover:text-orange transition-colors">Services</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-dark font-medium hover:text-orange transition-colors">How It Works</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)} className="text-dark font-medium hover:text-orange transition-colors">Gallery</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)} className="text-dark font-medium hover:text-orange transition-colors">Reviews</a>
          <a href="tel:+14803062547" className="text-navy font-semibold">(480) 306-2547</a>
          <a href="#quote" onClick={() => setMenuOpen(false)} className="bg-gradient-to-r from-orange to-orange-light text-white font-semibold text-center px-6 py-3 rounded-full">
            Get Free Quote
          </a>
        </div>
      </div>
    </nav>
  );
}
