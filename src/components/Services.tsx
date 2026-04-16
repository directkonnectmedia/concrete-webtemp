"use client";

import { useEffect, useRef } from "react";

/** Toggle when bringing back staggered service cards + gallery photos. */
const SHOW_SERVICE_CARDS = false;

/** Treat timeline as finished (unlock scroll) this close to duration. */
const END_EPSILON_SEC = 0.25;
/** Stay this many px below the raw cap so the next section never peeks through. */
const SCROLL_LOCK_BUFFER_PX = 32;
/** Extra rAF clamps after scroll/wheel to absorb trackpad / touch momentum. */
const CLAMP_BURST_FRAMES = 28;

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let permanentlyUnlocked = false;
    let burstRemaining = 0;
    let burstRaf: number = 0;
    let lastTouchY = 0;

    const tryUnlockFromProgress = () => {
      const d = video.duration;
      if (!d || !Number.isFinite(d)) return;
      if (video.ended || video.currentTime >= d - END_EPSILON_SEC) {
        permanentlyUnlocked = true;
      }
    };

    const maxScrollWhileLocked = () => {
      const top = window.scrollY + section.getBoundingClientRect().top;
      const raw = top + section.offsetHeight - window.innerHeight;
      return Math.max(0, Math.floor(raw - SCROLL_LOCK_BUFFER_PX));
    };

    const clampSync = () => {
      if (permanentlyUnlocked) return;
      tryUnlockFromProgress();
      if (permanentlyUnlocked) return;
      const maxY = maxScrollWhileLocked();
      if (window.scrollY > maxY) {
        document.documentElement.scrollTop = maxY;
        document.body.scrollTop = maxY;
      }
    };

    const pumpBurst = () => {
      burstRaf = 0;
      if (permanentlyUnlocked) {
        burstRemaining = 0;
        return;
      }
      clampSync();
      burstRemaining--;
      if (burstRemaining > 0) {
        burstRaf = requestAnimationFrame(pumpBurst);
      }
    };

    const runClampBurst = () => {
      if (permanentlyUnlocked) return;
      burstRemaining = CLAMP_BURST_FRAMES;
      if (!burstRaf) {
        burstRaf = requestAnimationFrame(pumpBurst);
      }
    };

    const onScroll = () => {
      clampSync();
      if (!permanentlyUnlocked) runClampBurst();
    };

    const onWheel = (e: WheelEvent) => {
      if (permanentlyUnlocked) return;
      tryUnlockFromProgress();
      if (permanentlyUnlocked) return;
      const maxY = maxScrollWhileLocked();
      if (e.deltaY > 0 && window.scrollY >= maxY) {
        e.preventDefault();
        clampSync();
        runClampBurst();
        return;
      }
      if (e.deltaY > 0 && window.scrollY > maxY) {
        e.preventDefault();
        clampSync();
      }
      runClampBurst();
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (permanentlyUnlocked) return;
      tryUnlockFromProgress();
      if (permanentlyUnlocked) return;
      const y = e.touches[0].clientY;
      const fingerMovedUp = lastTouchY - y;
      lastTouchY = y;
      const maxY = maxScrollWhileLocked();
      if (fingerMovedUp > 0 && window.scrollY >= maxY) {
        e.preventDefault();
        clampSync();
      }
      runClampBurst();
    };

    const onEnded = () => {
      permanentlyUnlocked = true;
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("seeked", tryUnlockFromProgress);
    video.addEventListener("timeupdate", tryUnlockFromProgress);
    video.addEventListener("loadedmetadata", clampSync);

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("resize", clampSync);
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    clampSync();

    return () => {
      if (burstRaf) {
        cancelAnimationFrame(burstRaf);
        burstRaf = 0;
      }
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("seeked", tryUnlockFromProgress);
      video.removeEventListener("timeupdate", tryUnlockFromProgress);
      video.removeEventListener("loadedmetadata", clampSync);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("resize", clampSync);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-[min(88vh,920px)] overflow-hidden bg-white pt-16 pb-28 md:min-h-[92vh] md:pt-24 md:pb-36"
    >
      <video
        ref={videoRef}
        playsInline
        controls
        preload="auto"
        loop={false}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/services-showcase.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="relative z-10 mb-12 text-center reveal md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange [text-shadow:0_1px_2px_rgba(255,255,255,0.95),0_0_12px_rgba(255,255,255,0.7)]">
            Why Solution Concrete?
          </p>
          <h2 className="mx-auto max-w-3xl font-[var(--font-heading)] text-3xl font-extrabold leading-tight text-navy md:text-5xl [text-shadow:0_1px_3px_rgba(255,255,255,0.95),0_0_24px_rgba(255,255,255,0.65)]">
            We&apos;re ready to show you why we&apos;re the West Valley&apos;s
            top concrete choice.
          </h2>
          <a
            href="#quote"
            className="mt-10 inline-block rounded-full bg-gradient-to-r from-orange to-orange-light px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Get a Free Quote
          </a>
        </div>

        {SHOW_SERVICE_CARDS ? (
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
                  <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={svc.photo}
                        alt={svc.alt}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div
                    className={`relative z-10 mx-4 -mt-20 rounded-2xl border border-gray/50 bg-gray-light/95 p-8 shadow-xl backdrop-blur-sm md:p-10 lg:mx-0 lg:-mt-24 ${
                      isLeft ? "lg:ml-6 lg:mr-12" : "lg:mr-6 lg:ml-12"
                    }`}
                  >
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-orange">
                      Why Solution Concrete?
                    </p>
                    <h3 className="mb-4 font-[var(--font-heading)] text-3xl font-extrabold uppercase tracking-tight text-navy md:text-5xl">
                      {svc.title}
                    </h3>
                    <p className="mb-6 leading-relaxed text-dark-muted">
                      {svc.desc}
                    </p>
                    <a
                      href="#quote"
                      className="inline-block rounded-full bg-gradient-to-r from-orange to-orange-light px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      Get a Free Quote
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="relative z-20 wave-divider">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path d="M0,0 H1200 V80 H0 Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}
