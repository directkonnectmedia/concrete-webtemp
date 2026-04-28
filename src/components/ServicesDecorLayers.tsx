"use client";

import { useEffect, useRef, type RefObject } from "react";

export const SERVICES_VIEWBOX_W = 1200;
export const SERVICES_VIEWBOX_H = 4200;

// Two parallel zigzag rails (~80 units apart) — read as the two edges of a sidewalk.
export const SERVICES_SNAKE_D = `M 600 460
   L 1050 760
   L 150 1060
   L 1050 1360
   L 150 1660
   L 1050 1960
   L 150 2260
   L 1050 2560
   L 150 2860
   L 1050 3160
   L 150 3460
   L 1050 3760
   L 600 4110`;

export const SERVICES_SNAKE_D_2 = `M 600 540
   L 1050 840
   L 150 1140
   L 1050 1440
   L 150 1740
   L 1050 2040
   L 150 2340
   L 1050 2640
   L 150 2940
   L 1050 3240
   L 150 3540
   L 1050 3840
   L 600 4190`;

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
  /** Hide orange dashed path + dot (path stays in DOM for mask math). /services-capture clean plate. */
  hideOrangeScrollGuide?: boolean;
  /** Hide the wet/semi-dry/cured concrete photo layers; keep only the orange path + dot. */
  hideConcreteLayers?: boolean;
};

export default function ServicesDecorLayers({
  scrollRootRef,
  priorityCapture = false,
  hideOrangeScrollGuide = false,
  hideConcreteLayers = false,
}: ServicesDecorLayersProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);
  const semiDryRef = useRef<HTMLDivElement>(null);
  const curedRef = useRef<HTMLDivElement>(null);

  const vis = priorityCapture ? "opacity-100" : "opacity-0 lg:opacity-100";
  const imgLoading = priorityCapture ? "eager" : "lazy";
  const imgDecoding = priorityCapture ? ("sync" as const) : ("async" as const);

  useEffect(() => {
    const section = scrollRootRef.current;
    const path = pathRef.current;
    const path2 = path2Ref.current;
    const dot = dotRef.current;
    const dot2 = dot2Ref.current;
    const semiDryLayer = semiDryRef.current;
    const curedLayer = curedRef.current;
    if (!section || !path) return;
    if (!hideConcreteLayers && (!semiDryLayer || !curedLayer)) return;
    if (!hideOrangeScrollGuide && !dot) return;

    const totalLength = path.getTotalLength();
    if (totalLength === 0) return;

    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const totalLength2 = path2 ? path2.getTotalLength() : 0;
    if (path2 && totalLength2 > 0) {
      path2.style.strokeDasharray = `${totalLength2}`;
      path2.style.strokeDashoffset = `${totalLength2}`;
    }

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
    let currentProgress = 0;
    let targetProgress = 0;
    // Lerp factor per frame (~60fps). Lower = smoother/slower follow, higher = snappier.
    const SMOOTHING = 0.12;
    // Stop the rAF loop when not in view AND the dots have settled within this delta.
    const SETTLE_EPSILON = 0.0005;

    const computeTargetProgress = (): number => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const viewportCenter = windowHeight / 2;
      const sectionY = viewportCenter - rect.top;
      const svgY = (sectionY / rect.height) * SERVICES_VIEWBOX_H;
      const clampedY = Math.min(Math.max(svgY, yToLength[0].y), yToLength[yToLength.length - 1].y);
      const len = lengthAtY(clampedY);
      return len / totalLength;
    };

    const applyProgress = (progress: number) => {
      const len = progress * totalLength;
      path.style.strokeDashoffset = `${totalLength - len}`;

      const pt = path.getPointAtLength(len);
      if (dot) {
        dot.setAttribute("cx", `${pt.x}`);
        dot.setAttribute("cy", `${pt.y}`);
        dot.style.opacity = "1";
      }

      if (path2 && totalLength2 > 0) {
        const len2 = progress * totalLength2;
        path2.style.strokeDashoffset = `${totalLength2 - len2}`;
        if (dot2) {
          const pt2 = path2.getPointAtLength(len2);
          dot2.setAttribute("cx", `${pt2.x}`);
          dot2.setAttribute("cy", `${pt2.y}`);
          dot2.style.opacity = "1";
        }
      }

      const semiDryLeadPct = 2.5;
      const curedTrailPct = 5;
      const dotPct = (pt.y / SERVICES_VIEWBOX_H) * 100;

      const dryEdge = Math.min(Math.max(dotPct + semiDryLeadPct, 0), 100);
      const curedEdge = Math.min(Math.max(dotPct - curedTrailPct, 0), 100);
      const dryQ = Math.round(dryEdge * 4) / 4;
      const curedQ = Math.round(curedEdge * 4) / 4;
      if (semiDryLayer) {
        const semiDryMask = `linear-gradient(to bottom, black ${dryQ}%, transparent ${dryQ + 4}%)`;
        if (semiDryMask !== lastSemiMask) {
          lastSemiMask = semiDryMask;
          semiDryLayer.style.maskImage = semiDryMask;
          semiDryLayer.style.webkitMaskImage = semiDryMask;
        }
      }
      if (curedLayer) {
        const curedMask = `linear-gradient(to bottom, black ${curedQ}%, transparent ${curedQ + 4}%)`;
        if (curedMask !== lastCuredMask) {
          lastCuredMask = curedMask;
          curedLayer.style.maskImage = curedMask;
          curedLayer.style.webkitMaskImage = curedMask;
        }
      }
    };

    const isInView = (): boolean => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      return rect.bottom > -100 && rect.top < windowHeight + 100;
    };

    const loop = () => {
      const inView = isInView();
      if (inView) {
        targetProgress = computeTargetProgress();
      }
      currentProgress += (targetProgress - currentProgress) * SMOOTHING;
      applyProgress(currentProgress);

      const settling = Math.abs(targetProgress - currentProgress) > SETTLE_EPSILON;
      if (inView || settling) {
        rafId = window.requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    };

    const ensureLoop = () => {
      if (rafId == null) {
        rafId = window.requestAnimationFrame(loop);
      }
    };

    targetProgress = computeTargetProgress();
    currentProgress = targetProgress;
    applyProgress(currentProgress);
    ensureLoop();

    window.addEventListener("scroll", ensureLoop, { passive: true });
    window.addEventListener("resize", ensureLoop, { passive: true });

    return () => {
      window.removeEventListener("scroll", ensureLoop);
      window.removeEventListener("resize", ensureLoop);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, [hideOrangeScrollGuide, hideConcreteLayers, scrollRootRef]);

  const wetColumns = [0, 1, 2, 3].map((col) => buildColumnStack(WET_PHOTOS, col, CONCRETE_TILES_PER_COLUMN));
  const semiDryColumns = [0, 1, 2, 3].map((col) => buildColumnStack(SEMI_DRY_PHOTOS, col, CONCRETE_TILES_PER_COLUMN));
  const curedColumns = [0, 1, 2, 3].map((col) => buildColumnStack(CURED_PHOTOS, col, CONCRETE_TILES_PER_COLUMN));

  return (
    <>
      {!hideConcreteLayers ? (
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
        </>
      ) : null}

      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${
          hideConcreteLayers ? "opacity-100" : vis
        }`}
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
          visibility={hideOrangeScrollGuide ? "hidden" : "visible"}
        />
        <path
          ref={path2Ref}
          d={SERVICES_SNAKE_D_2}
          stroke="#F47B20"
          strokeWidth="4"
          strokeDasharray="14 10"
          strokeLinecap="round"
          opacity="0.25"
          visibility={hideOrangeScrollGuide ? "hidden" : "visible"}
        />
        {!hideOrangeScrollGuide ? <circle ref={dotRef} r="10" fill="#F47B20" opacity="0" /> : null}
        {!hideOrangeScrollGuide ? <circle ref={dot2Ref} r="10" fill="#F47B20" opacity="0" /> : null}
      </svg>
    </>
  );
}
