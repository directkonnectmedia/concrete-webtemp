"use client";
import { useEffect, useRef } from "react";

const services = [
  {
    title: "Driveways",
    desc: "Durable, beautifully finished driveways that boost curb appeal and last for decades. Built to handle Arizona heat and heavy use.",
    photo: "/gallery/project-02.jpg",
    alt: "Long residential driveway with clean broom finish",
  },
  {
    title: "Sidewalks",
    desc: "Clean, level sidewalks built to code with smooth finishes and proper drainage. Safe, beautiful, and built to last.",
    photo: "/gallery/project-25.jpg",
    alt: "Curved sidewalk path wrapping around a tree",
  },
  {
    title: "Patios",
    desc: "Custom concrete patios that transform your outdoor living space into something special. Perfect for Arizona evenings.",
    photo: "/gallery/project-06.jpg",
    alt: "Backyard patio with curved edges and dark finish",
  },
  {
    title: "Foundations",
    desc: "Solid foundations for extensions, sheds, and additions, engineered for Arizona's unique soil conditions.",
    photo: "/gallery/project-11.jpg",
    alt: "Large backyard concrete slab for shed and storage",
  },
  {
    title: "Concrete Colors",
    desc: "Decorative colored concrete with stamps, stains, and custom finishes that give your property a one-of-a-kind look.",
    photo: "/gallery/project-22.jpg",
    alt: "Crew smoothing fresh concrete with bull float",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!section || !path || !dot) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const start = sectionTop + windowHeight * 0.3;
      const scrollable = sectionHeight - windowHeight * 0.4;
      const progress = Math.min(Math.max(-start / scrollable, 0), 1);

      const drawLength = totalLength * (1 - progress);
      path.style.strokeDashoffset = `${drawLength}`;

      const point = path.getPointAtLength(totalLength * progress);
      dot.setAttribute("cx", `${point.x}`);
      dot.setAttribute("cy", `${point.y}`);
      dot.style.opacity = progress > 0.01 && progress < 0.99 ? "1" : "0";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative bg-gray-light pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 md:mb-28 reveal">
          <p className="text-orange font-semibold text-sm tracking-widest uppercase mb-3">
            Why Solution Concrete?
          </p>
          <h2 className="font-[var(--font-heading)] font-extrabold text-3xl md:text-5xl text-navy leading-tight max-w-3xl mx-auto">
            We&apos;re ready to show you why we&apos;re the West Valley&apos;s top concrete choice.
          </h2>
        </div>

        {/* SVG map path behind cards */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 1200 3200"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              ref={pathRef}
              d="M 600 100 C 900 200, 1000 400, 800 550 C 600 700, 200 650, 300 850 C 400 1050, 900 1000, 850 1200 C 800 1400, 200 1350, 350 1550 C 500 1750, 1000 1700, 850 1900 C 700 2100, 200 2050, 400 2250 C 600 2450, 1000 2400, 800 2600 C 600 2800, 300 2900, 600 3100"
              stroke="#F47B20"
              strokeWidth="3"
              strokeDasharray="12 8"
              strokeLinecap="round"
              opacity="0.3"
            />
            <circle
              ref={dotRef}
              r="8"
              fill="#F47B20"
              opacity="0"
              style={{ transition: "opacity 0.3s" }}
            />
          </svg>
        </div>

        {/* Service cards */}
        <div className="relative z-10 space-y-24 md:space-y-36">
          {services.map((svc, i) => {
            const isOdd = i % 2 === 0;
            return (
              <div
                key={i}
                className={`relative flex flex-col ${isOdd ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-0 lg:gap-0`}
              >
                {/* Info card */}
                <div
                  className={`${isOdd ? "reveal-left" : "reveal-right"} relative z-20 w-full lg:w-[480px] flex-shrink-0 bg-gray-light/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-gray/50 ${
                    isOdd ? "lg:-mr-16" : "lg:-ml-16"
                  }`}
                >
                  <p className="text-orange font-semibold text-xs tracking-widest uppercase mb-4">
                    Why Solution Concrete?
                  </p>
                  <h3 className="font-[var(--font-heading)] font-extrabold text-3xl md:text-5xl text-navy uppercase tracking-tight mb-4">
                    {svc.title}
                  </h3>
                  <p className="text-dark-muted leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                  <a
                    href="#quote"
                    className="inline-block bg-gradient-to-r from-orange to-orange-light text-white font-semibold text-sm px-7 py-3 rounded-full shadow-lg shadow-orange/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Get a Free Quote
                  </a>
                </div>

                {/* Photo */}
                <div
                  className={`${isOdd ? "reveal-right" : "reveal-left"} relative w-full lg:w-[600px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl mt-[-40px] lg:mt-0`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={svc.photo}
                      alt={svc.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wave divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,40 C300,100 900,0 1200,60 L1200,120 L0,120 Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}
