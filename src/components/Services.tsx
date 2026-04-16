"use client";

/** Toggle when bringing back staggered service cards + gallery photos. */
const SHOW_SERVICE_CARDS = false;

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
  return (
    <section
      id="services"
      className="relative bg-white min-h-[min(88vh,920px)] md:min-h-[92vh] pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/services-showcase.mp4" type="video/mp4" />
      </video>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/90 via-white/55 to-white/35"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="relative z-10 mb-12 text-center reveal md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
            Why Solution Concrete?
          </p>
          <h2 className="mx-auto max-w-3xl font-[var(--font-heading)] text-3xl font-extrabold leading-tight text-navy md:text-5xl">
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
