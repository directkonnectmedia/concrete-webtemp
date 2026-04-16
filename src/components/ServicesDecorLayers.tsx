"use client";

import { useEffect, useRef, type RefObject } from "react";

export const SERVICES_VIEWBOX_W = 1200;
export const SERVICES_VIEWBOX_H = 4200;

export const SERVICES_SNAKE_D = `M 900 500
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
const SEMI_DRY_PHOTOS = ["/concrete/semi-dry/B1.png", "/concrete/semi-dry/B2.png", "/concrete/semi-dry/B3.png", "/concrete/semi-dry/B4.png"];
const CURED_PHOTOS = ["/concrete/cured/C1.png", "/concrete/cured/C2.png", "/concrete/cured/C3.png", "/concrete/cured/C4.png"];

const COLUMN_SEQUENCES = [
  [0, 1, 2, 3, 2, 0, 3, 1, 1, 3, 0, 2, 3, 2, 1, 0],
  [1, 3, 0, 2, 3, 1, 2, 0, 0, 2, 3, 1, 2, 0, 3, 1],
  [2, 0, 3, 1, 0, 2, 1, 3, 3, 1, 2, 0, 1, 3, 0, 2],
  [3, 2, 1, 0, 1, 3, 0, 2, 2, 0, 1, 3, 0, 1, 2, 3],
];

const CONCRETE_TILES_PER_COLUMN = 12;

function buildColumnStack(photos: string[], colIndex: number, count: number) {
  const seq = COLUMN_SEQUENCES[colIndex % COLUMN_SEQUENCES.length];
  const stack: string[] = [];
  for (let i = 0; i < count; i++) {
    stack.push(photos[seq[i % seq.length]]);
  }
  return stack;
}

export type ServicesDecorLayersProps = {
  scrollRootRef: RefObject<HTMLElement | null>;
  /** Screen recording: always show layers + eager image decode (not only lg:) */
  priorityCapture?: boolean;
};

export default function ServicesDecorLayers({
  scrollRootRef,
  priorityCapture = false,
}: ServicesDecorLayersProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const semiDryRef = useRef<HTMLDivElement>(null);
  const curedRef = useRef<HTMLDivElement>(null);

  const vis = priorityCapture ? "opacity-100" : "opacity-0 lg:opacity-100";
  const imgLoading = priorityCapture ? "eager" : "lazy";
  const imgDecoding = priorityCapture ? ("sync" as const) : ("async" as const);

  useEffect(() => {
    const section = scrollRootRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    const semiDryLayer = semiDryRef.current;
    const curedLayer = curedRef.current;
    if (!section || !path || !dot || !semiDryLayer || !curedLayer) return;

    const totalLength = path.getTotalLength();
    if (totalLength === 0) return;

    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

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
      if (rect.bottom < -100 || rect.top > windowHeight + 100) return;

      const viewportCenter = windowHeight / 2;
      const sectionY = viewportCenter - rect.top;
      const svgY = (sectionY / rect.height) * SERVICES_VIEWBOX_H;
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
      const dotPct = (pt.y / SERVICES_VIEWBOX_H) * 100;

      const dryEdge = Math.min(Math.max(dotPct + semiDryLeadPct, 0), 100);
      const curedEdge = Math.min(Math.max(dotPct - curedTrailPct, 0), 100);
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
    // scrollRootRef identity is stable; read .current inside effect
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, []);

  const wetColumns = [0, 1, 2, 3].map((col) => buildColumnStack(WET_PHOTOS, col, CONCRETE_TILES_PER_COLUMN));
  const semiDryColumns = [0, 1, 2, 3].map((col) => buildColumnStack(SEMI_DRY_PHOTOS, col, CONCRETE_TILES_PER_COLUMN));
  const curedColumns = [0, 1, 2, 3].map((col) => buildColumnStack(CURED_PHOTOS, col, CONCRETE_TILES_PER_COLUMN));

  return (
    <>
      <div
        className={`absolute inset-0 ${vis} pointer-events-none overflow-hidden`}
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
                  loading={imgLoading}
                  decoding={imgDecoding}
                  draggable={false}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        ref={semiDryRef}
        className={`absolute inset-0 ${vis} pointer-events-none overflow-hidden`}
        aria-hidden="true"
        style={{
          zIndex: 0,
          maskImage: "linear-gradient(to bottom, transparent 0%, transparent 0%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 0%)",
        }}
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
                  loading={imgLoading}
                  decoding={imgDecoding}
                  draggable={false}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        ref={curedRef}
        className={`absolute inset-0 ${vis} pointer-events-none overflow-hidden`}
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
                  loading={imgLoading}
                  decoding={imgDecoding}
                  draggable={false}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${vis}`}
        viewBox={`0 0 ${SERVICES_VIEWBOX_W} ${SERVICES_VIEWBOX_H}`}
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      >
        <path
          ref={pathRef}
          d={SERVICES_SNAKE_D}
          stroke="#F47B20"
          strokeWidth="4"
          strokeDasharray="14 10"
          strokeLinecap="round"
          opacity="0.25"
        />
        <circle ref={dotRef} r="10" fill="#F47B20" opacity="0" />
      </svg>
    </>
  );
}
