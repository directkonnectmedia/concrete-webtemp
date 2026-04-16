"use client";

import ServicesDecorLayers from "@/components/ServicesDecorLayers";
import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

/** In-flow height so scroll range matches a tall Services section; tune when recording */
export const CAPTURE_SCROLL_MIN_PX = 5600;

const AUTO_SCROLL_PX_PER_SEC = 110;

function ServicesCaptureInner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const searchParams = useSearchParams();
  const autoScroll = searchParams.get("autoScroll") === "1";

  useEffect(() => {
    if (!autoScroll) return;
    let cancelled = false;
    let raf = 0;
    let last = performance.now();

    function frame(now: number) {
      if (cancelled) return;
      const dt = Math.min((now - last) / 1000, 0.064);
      last = now;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxY - 1) return;
      window.scrollBy(0, AUTO_SCROLL_PX_PER_SEC * dt);
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [autoScroll]);

  return (
    <main className="min-h-screen bg-white">
      <section ref={sectionRef} className="relative bg-gray-light overflow-hidden">
        <ServicesDecorLayers scrollRootRef={sectionRef} priorityCapture />
        <div
          aria-hidden
          className="w-full pointer-events-none"
          style={{ minHeight: CAPTURE_SCROLL_MIN_PX }}
        />
      </section>
    </main>
  );
}

export default function ServicesCaptureClient() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-gray-light" aria-hidden />}>
      <ServicesCaptureInner />
    </Suspense>
  );
}
