import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-bg.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-orange-light font-medium text-sm tracking-widest uppercase mb-4 reveal visible">
          Avondale, AZ &bull; Licensed &amp; Insured
        </p>

        <h1 className="mb-2">
          <span className="font-[var(--font-script)] text-5xl md:text-7xl text-orange block mb-1">
            Solution
          </span>
          <span className="font-[var(--font-heading)] font-extrabold text-4xl md:text-6xl text-white uppercase tracking-tight block">
            Concrete Specialist
          </span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mt-6 mb-10 leading-relaxed">
          Premium driveways, patios, sidewalks, and foundations crafted with
          precision for the Phoenix West Valley.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#quote"
            className="bg-gradient-to-r from-orange to-orange-light text-white font-bold text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-orange/30 hover:scale-105 transition-all duration-300"
          >
            Get a Free Quote
          </a>
          <a
            href="tel:+14803062547"
            className="border-2 border-white/40 text-white font-semibold text-lg px-10 py-4 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Call (480) 306-2547
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-slow">
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className="text-white/50">
          <rect x="1" y="1" width="22" height="34" rx="11" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="10" r="3" fill="currentColor">
            <animate attributeName="cy" values="10;22;10" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Wave divider at bottom */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
            fill="#F8F9FA"
          />
        </svg>
      </div>
    </section>
  );
}
