"use client";
import { useRef } from "react";
import ServicesDecorLayers from "./ServicesDecorLayers";

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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-gray-light pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden"
    >
      <ServicesDecorLayers scrollRootRef={sectionRef} />

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
