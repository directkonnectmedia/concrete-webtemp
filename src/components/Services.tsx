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

const VIEWBOX_W = 1200;
const VIEWBOX_H = 4200;

const SNAKE_D = `M 900 500
   C 1100 600, 1100 850, 900 1000
   C 700 1150, 300 1100, 200 1250
   C 100 1400, 100 1650, 200 1800
   C 350 1950, 800 1900, 950 2050
   C 1100 2200, 1100 2450, 950 2600
   C 750 2750, 300 2700, 200 2850
   C 100 3000, 100 3250, 200 3400
   C 350 3550, 800 3500, 950 3650
   C 1100 3800, 1100 4000, 900 4150`;

const WET_PHOTOS = ["/concrete/wet/A1.png", "/concrete/wet/A2.png", "/concrete/wet/A3.png", "/concrete/wet/A4.png"];

const COLUMN_SEQUENCE = [0, 1, 2, 3, 2, 0, 3, 1, 1, 3, 0, 2, 3, 2, 1, 0];

function buildColumnStack(repeatCount: number) {
  const stack: string[] = [];
  for (let i = 0; i < repeatCount; i++) {
    stack.push(WET_PHOTOS[COLUMN_SEQUENCE[i % COLUMN_SEQUENCE.length]]);
  }
  return stack;
}

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
    if (totalLength === 0) return;

    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const start = rect.top + windowHeight * 0.3;
      const scrollable = sectionHeight - windowHeight * 0.4;
      const progress = Math.min(Math.max(-start / scrollable, 0), 1);

      const drawLength = totalLength * (1 - progress);
      path.style.strokeDashoffset = `${drawLength}`;

      const pt = path.getPointAtLength(progress * totalLength);
      dot.setAttribute("cx", `${pt.x}`);
      dot.setAttribute("cy", `${pt.y}`);
      dot.style.opacity = progress > 0.005 ? "1" : "0";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const columnStack = buildColumnStack(16);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-gray-light pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden"
    >
      {/* Single column prototype — stacked Lego-style, desktop only */}
      <div
        className="absolute top-0 left-0 w-1/4 opacity-0 lg:opacity-100 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ zIndex: 0, fontSize: 0, lineHeight: 0 }}
      >
        {columnStack.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-full block"
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 md:mb-28 reveal relative z-10">
          <p className="text-orange font-semibold text-sm tracking-widest uppercase mb-3">
            Why Solution Concrete?
          </p>
          <h2 className="font-[var(--font-heading)] font-extrabold text-3xl md:text-5xl text-navy leading-tight max-w-3xl mx-auto">
            We&apos;re ready to show you why we&apos;re the West Valley&apos;s
            top concrete choice.
          </h2>
        </div>

        {/* Animated orange snake line */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 lg:opacity-100"
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
          style={{ zIndex: 1 }}
        >
          <path
            ref={pathRef}
            d={SNAKE_D}
            stroke="#F47B20"
            strokeWidth="4"
            strokeDasharray="14 10"
            strokeLinecap="round"
            opacity="0.25"
          />
          <circle ref={dotRef} r="10" fill="#F47B20" opacity="0" />
        </svg>

        {/* Service cards — staggered left / right */}
        <div className="relative z-10 space-y-20 md:space-y-32 lg:space-y-40">
          {services.map((svc, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`relative w-full lg:w-[58%] ${
                  isLeft ? "lg:mr-auto" : "lg:ml-auto"
                } ${isLeft ? "reveal-left" : "reveal-right"}`}
              >
                {/* Photo */}
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={svc.photo}
                      alt={svc.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Info card overlapping bottom of photo */}
                <div
                  className={`relative z-10 mx-4 -mt-20 lg:-mt-24 lg:mx-0 bg-gray-light/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-gray/50 ${
                    isLeft ? "lg:ml-6 lg:mr-12" : "lg:mr-6 lg:ml-12"
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Wave divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,40 C300,100 900,0 1200,60 L1200,120 L0,120 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}
