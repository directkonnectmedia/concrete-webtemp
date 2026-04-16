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

const WHITE_VEIL_MASK_STROKE = 195;
/** Blur radius; darker-composite keeps inner cutout crisp while fog fades outward */
const WHITE_VEIL_MASK_FEATHER = 38;
/** Extra width (each side of path) for outer veil-side fade only; does not shrink the core hole */
/** 2× prior step (was 1.2× base); scales outset, blur, and halo opacity */
const WHITE_VEIL_EDGE_HALO_INTENSITY = 2.4;
const WHITE_VEIL_EDGE_HALO_OUTSET = Math.round(58 * WHITE_VEIL_EDGE_HALO_INTENSITY);
/** Wider soft ring: more transparent near outline, solid farther into the veil */
const WHITE_VEIL_EDGE_HALO_FEATHER = Math.round(48 * WHITE_VEIL_EDGE_HALO_INTENSITY);
const WHITE_VEIL_EDGE_HALO_STROKE_OPACITY = Math.min(
  1,
  Number((0.44 * WHITE_VEIL_EDGE_HALO_INTENSITY).toFixed(3)),
);
const WHITE_VEIL_EDGE_HALO_STROKE = WHITE_VEIL_MASK_STROKE + 2 * WHITE_VEIL_EDGE_HALO_OUTSET;
const WHITE_VEIL_MASK_ID = "services-white-veil-mask";
const WHITE_VEIL_MASK_BLUR_FILTER_ID = `${WHITE_VEIL_MASK_ID}-blur`;
const WHITE_VEIL_MASK_HALO_FILTER_ID = `${WHITE_VEIL_MASK_ID}-halo-blur`;
const WHITE_VEIL_MASK_FILTER_PAD = Math.ceil(WHITE_VEIL_MASK_FEATHER * 7);
const WHITE_VEIL_MASK_HALO_FILTER_PAD = Math.ceil(WHITE_VEIL_EDGE_HALO_FEATHER * 8);

const WET_PHOTOS = ["/concrete/wet/A1.png", "/concrete/wet/A2.png", "/concrete/wet/A3.png", "/concrete/wet/A4.png"];
const SEMI_DRY_PHOTOS = ["/concrete/semi-dry/B1.png", "/concrete/semi-dry/B2.png", "/concrete/semi-dry/B3.png", "/concrete/semi-dry/B4.png"];
const CURED_PHOTOS = ["/concrete/cured/C1.png", "/concrete/cured/C2.png", "/concrete/cured/C3.png", "/concrete/cured/C4.png"];

const COLUMN_SEQUENCES = [
  [0, 1, 2, 3, 2, 0, 3, 1, 1, 3, 0, 2, 3, 2, 1, 0],
  [1, 3, 0, 2, 3, 1, 2, 0, 0, 2, 3, 1, 2, 0, 3, 1],
  [2, 0, 3, 1, 0, 2, 1, 3, 3, 1, 2, 0, 1, 3, 0, 2],
  [3, 2, 1, 0, 1, 3, 0, 2, 2, 0, 1, 3, 0, 1, 2, 3],
];

/** Fewer tiles = less decode/composite work; columns still fill the section height */
const CONCRETE_TILES_PER_COLUMN = 12;

function buildColumnStack(photos: string[], colIndex: number, count: number) {
  const seq = COLUMN_SEQUENCES[colIndex % COLUMN_SEQUENCES.length];
  const stack: string[] = [];
  for (let i = 0; i < count; i++) {
    stack.push(photos[seq[i % seq.length]]);
  }
  return stack;
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const semiDryRef = useRef<HTMLDivElement>(null);
  const curedRef = useRef<HTMLDivElement>(null);
  const maskHolePathRef = useRef<SVGPathElement>(null);
  const maskHoleHaloRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    const semiDryLayer = semiDryRef.current;
    const curedLayer = curedRef.current;
    const maskHolePath = maskHolePathRef.current;
    const maskHoleHalo = maskHoleHaloRef.current;
    if (!section || !path || !dot || !semiDryLayer || !curedLayer || !maskHolePath || !maskHoleHalo) return;

    const totalLength = path.getTotalLength();
    if (totalLength === 0) return;

    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    maskHolePath.style.strokeDasharray = `${totalLength}`;
    maskHolePath.style.strokeDashoffset = "0";

    maskHoleHalo.style.strokeDasharray = `${totalLength}`;
    maskHoleHalo.style.strokeDashoffset = "0";

    const SAMPLES = 256;
    const yToLength: { y: number; len: number }[] = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const len = (i / SAMPLES) * totalLength;
      const pt = path.getPointAtLength(len);
      yToLength.push({ y: pt.y, len });
    }

    function lengthAtY(targetY: number): number {
      let closest = yToLength[0];
      let minDiff = Math.abs(closest.y - targetY);
      for (let i = 1; i < yToLength.length; i++) {
        const diff = Math.abs(yToLength[i].y - targetY);
        if (diff < minDiff) {
          minDiff = diff;
          closest = yToLength[i];
        }
      }
      return closest.len;
    }

    let rafId: number | null = null;
    let lastSemiMask = "";
    let lastCuredMask = "";

    const tick = () => {
      rafId = null;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Skip heavy mask/SVG work while far off-screen (scroll fires for whole document)
      if (rect.bottom < -100 || rect.top > windowHeight + 100) return;

      const viewportCenter = windowHeight / 2;
      const sectionY = viewportCenter - rect.top;
      const svgY = (sectionY / rect.height) * VIEWBOX_H;
      const clampedY = Math.min(Math.max(svgY, yToLength[0].y), yToLength[yToLength.length - 1].y);

      const len = lengthAtY(clampedY);
      const progress = len / totalLength;

      const dashOffset = `${totalLength - len}`;
      path.style.strokeDashoffset = dashOffset;

      const pt = path.getPointAtLength(len);
      dot.setAttribute("cx", `${pt.x}`);
      dot.setAttribute("cy", `${pt.y}`);
      dot.style.opacity = "1";

      const semiDryLeadPct = 2.5;
      const curedTrailPct = 5;
      const dotPct = (pt.y / VIEWBOX_H) * 100;

      const dryEdge = Math.min(Math.max(dotPct + semiDryLeadPct, 0), 100);
      const curedEdge = Math.min(Math.max(dotPct - curedTrailPct, 0), 100);
      // Quantize so we don't rewrite mask strings every sub-pixel scroll
      const dryQ = Math.round(dryEdge * 4) / 4;
      const curedQ = Math.round(curedEdge * 4) / 4;
      const semiDryMask = `linear-gradient(to bottom, black ${dryQ}%, transparent ${dryQ + 4}%)`;
      if (semiDryMask !== lastSemiMask) {
        lastSemiMask = semiDryMask;
        semiDryLayer.style.maskImage = semiDryMask;
        semiDryLayer.style.webkitMaskImage = semiDryMask;
      }
      const curedMask = `linear-gradient(to bottom, black ${curedQ}%, transparent ${curedQ + 4}%)`;
      if (curedMask !== lastCuredMask) {
        lastCuredMask = curedMask;
        curedLayer.style.maskImage = curedMask;
        curedLayer.style.webkitMaskImage = curedMask;
      }
    };

    const scheduleTick = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", scheduleTick, { passive: true });
    window.addEventListener("resize", scheduleTick, { passive: true });
    tick();

    return () => {
      window.removeEventListener("scroll", scheduleTick);
      window.removeEventListener("resize", scheduleTick);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const wetColumns = [0, 1, 2, 3].map((col) => buildColumnStack(WET_PHOTOS, col, CONCRETE_TILES_PER_COLUMN));
  const semiDryColumns = [0, 1, 2, 3].map((col) => buildColumnStack(SEMI_DRY_PHOTOS, col, CONCRETE_TILES_PER_COLUMN));
  const curedColumns = [0, 1, 2, 3].map((col) => buildColumnStack(CURED_PHOTOS, col, CONCRETE_TILES_PER_COLUMN));

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-gray-light pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden"
    >
      {/* Layer 1: Wet concrete background */}
      <div
        className="absolute inset-0 opacity-0 lg:opacity-100 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <div className="flex w-full h-full" style={{ fontSize: 0, lineHeight: 0 }}>
          {wetColumns.map((stack, colIdx) => (
            <div key={colIdx} className="w-1/4 flex-shrink-0">
              {stack.map((src, i) => (
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
          ))}
        </div>
      </div>

      {/* Layer 2: Semi-dry concrete — fades in from top as user scrolls */}
      <div
        ref={semiDryRef}
        className="absolute inset-0 opacity-0 lg:opacity-100 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ zIndex: 0, maskImage: "linear-gradient(to bottom, transparent 0%, transparent 0%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 0%)" }}
      >
        <div className="flex w-full h-full" style={{ fontSize: 0, lineHeight: 0 }}>
          {semiDryColumns.map((stack, colIdx) => (
            <div key={colIdx} className="w-1/4 flex-shrink-0">
              {stack.map((src, i) => (
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
          ))}
        </div>
      </div>

      {/* Layer 3: Cured concrete — fades in trailing behind the dot */}
      <div
        ref={curedRef}
        className="absolute inset-0 opacity-0 lg:opacity-100 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{
          zIndex: 0,
          filter: "brightness(0.95)",
          maskImage: "linear-gradient(to bottom, transparent 0%, transparent 0%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 0%)",
        }}
      >
        <div className="flex w-full h-full" style={{ fontSize: 0, lineHeight: 0 }}>
          {curedColumns.map((stack, colIdx) => (
            <div key={colIdx} className="w-1/4 flex-shrink-0">
              {stack.map((src, i) => (
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
          ))}
        </div>
      </div>

      {/* Layer 4: Site-color veil — full snake hole from load; orange line still draws with scroll */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 lg:opacity-100"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      >
        <defs>
          <filter
            id={WHITE_VEIL_MASK_BLUR_FILTER_ID}
            x={-WHITE_VEIL_MASK_FILTER_PAD}
            y={-WHITE_VEIL_MASK_FILTER_PAD}
            width={VIEWBOX_W + WHITE_VEIL_MASK_FILTER_PAD * 2}
            height={VIEWBOX_H + WHITE_VEIL_MASK_FILTER_PAD * 2}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation={WHITE_VEIL_MASK_FEATHER} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="darker" />
          </filter>
          <filter
            id={WHITE_VEIL_MASK_HALO_FILTER_ID}
            x={-WHITE_VEIL_MASK_HALO_FILTER_PAD}
            y={-WHITE_VEIL_MASK_HALO_FILTER_PAD}
            width={VIEWBOX_W + WHITE_VEIL_MASK_HALO_FILTER_PAD * 2}
            height={VIEWBOX_H + WHITE_VEIL_MASK_HALO_FILTER_PAD * 2}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation={WHITE_VEIL_EDGE_HALO_FEATHER} />
          </filter>
          <mask
            id={WHITE_VEIL_MASK_ID}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={VIEWBOX_W}
            height={VIEWBOX_H}
          >
            <rect width={VIEWBOX_W} height={VIEWBOX_H} fill="white" />
            <path
              ref={maskHolePathRef}
              d={SNAKE_D}
              fill="none"
              stroke="black"
              strokeWidth={WHITE_VEIL_MASK_STROKE}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#${WHITE_VEIL_MASK_BLUR_FILTER_ID})`}
            />
            <path
              ref={maskHoleHaloRef}
              d={SNAKE_D}
              fill="none"
              stroke="black"
              strokeWidth={WHITE_VEIL_EDGE_HALO_STROKE}
              strokeOpacity={WHITE_VEIL_EDGE_HALO_STROKE_OPACITY}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#${WHITE_VEIL_MASK_HALO_FILTER_ID})`}
            />
          </mask>
        </defs>
        <rect
          width={VIEWBOX_W}
          height={VIEWBOX_H}
          fill="var(--color-gray-light)"
          mask={`url(#${WHITE_VEIL_MASK_ID})`}
        />
      </svg>

      {/* Animated orange snake line — above veil so it stays visible */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 lg:opacity-100"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        style={{ zIndex: 2 }}
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
