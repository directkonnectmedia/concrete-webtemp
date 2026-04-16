"use client";
import { useEffect, useRef, useCallback } from "react";

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
const TILE_SPACING = 10;
const TILE_W = 70;
const TILE_H = 12;

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  const tileEls = useRef<HTMLDivElement[]>([]);

  const buildTiles = useCallback(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const container = tilesRef.current;
    if (!section || !path || !container) return;

    const totalLength = path.getTotalLength();
    if (totalLength === 0) return;

    container.innerHTML = "";
    tileEls.current = [];

    const sectionRect = section.getBoundingClientRect();
    const scaleX = sectionRect.width / VIEWBOX_W;
    const scaleY = sectionRect.height / VIEWBOX_H;

    const count = Math.floor(totalLength / TILE_SPACING);

    for (let i = 0; i <= count; i++) {
      const dist = i * TILE_SPACING;
      const pt = path.getPointAtLength(dist);
      const ptNext = path.getPointAtLength(Math.min(dist + 2, totalLength));

      const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI);

      const px = pt.x * scaleX;
      const py = pt.y * scaleY;

      const tile = document.createElement("div");
      tile.style.cssText = `
        position:absolute;
        left:${px}px;
        top:${py}px;
        width:${TILE_W}px;
        height:${TILE_H}px;
        background:url(/concrete-tile.png) center/cover no-repeat;
        transform:translate(-50%,-50%) rotate(${angle}deg);
        opacity:0;
        will-change:opacity;
      `;
      container.appendChild(tile);
      tileEls.current.push(tile);
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    buildTiles();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildTiles, 200);
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const start = rect.top + windowHeight * 0.3;
      const scrollable = sectionHeight - windowHeight * 0.4;
      const progress = Math.min(Math.max(-start / scrollable, 0), 1);

      const tiles = tileEls.current;
      const total = tiles.length;
      const revealIdx = Math.floor(progress * total);

      for (let i = 0; i < total; i++) {
        tiles[i].style.opacity = i <= revealIdx ? "1" : "0";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, [buildTiles]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-gray-light pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 md:mb-28 reveal">
          <p className="text-orange font-semibold text-sm tracking-widest uppercase mb-3">
            Why Solution Concrete?
          </p>
          <h2 className="font-[var(--font-heading)] font-extrabold text-3xl md:text-5xl text-navy leading-tight max-w-3xl mx-auto">
            We&apos;re ready to show you why we&apos;re the West Valley&apos;s
            top concrete choice.
          </h2>
        </div>

        {/* Invisible SVG path used as the mathematical guide for tile placement */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          <path
            ref={pathRef}
            d="M 900 500
               C 1100 600, 1100 850, 900 1000
               C 700 1150, 300 1100, 200 1250
               C 100 1400, 100 1650, 200 1800
               C 350 1950, 800 1900, 950 2050
               C 1100 2200, 1100 2450, 950 2600
               C 750 2750, 300 2700, 200 2850
               C 100 3000, 100 3250, 200 3400
               C 350 3550, 800 3500, 950 3650
               C 1100 3800, 1100 4000, 900 4150"
          />
        </svg>

        {/* Tile container — concrete tiles placed along the path */}
        <div
          ref={tilesRef}
          className="absolute inset-0 pointer-events-none opacity-0 lg:opacity-100"
          aria-hidden="true"
        />

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
