"use client";
import { useState } from "react";
import Link from "next/link";

const galleryImages = [
  { src: "/gallery/project-02.jpg", alt: "Residential driveway with broom finish", category: "Driveways" },
  { src: "/gallery/project-06.jpg", alt: "Backyard patio with curved edges and dark finish", category: "Patios" },
  { src: "/gallery/project-18.jpg", alt: "Side yard driveway extension next to garage", category: "Driveways" },
  { src: "/gallery/project-22.jpg", alt: "Crew smoothing fresh concrete pour with bull float", category: "Patios" },
  { src: "/gallery/project-25.jpg", alt: "Curved sidewalk path wrapping around a tree", category: "Sidewalks" },
  { src: "/gallery/project-09.jpg", alt: "Full front yard driveway pour with smooth finish", category: "Driveways" },
];

export default function GalleryPreview() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <section id="gallery" className="relative bg-gray-light py-24 md:py-32">
        <div className="wave-divider-top">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,40 C300,100 900,0 1200,60 L1200,120 L0,120 Z" fill="#FFFFFF" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 reveal">
            <div>
              <p className="text-orange font-semibold text-sm tracking-widest uppercase mb-3">
                Portfolio
              </p>
              <h2 className="font-[var(--font-heading)] font-extrabold text-3xl md:text-5xl text-navy">
                Our Work
              </h2>
            </div>
            <Link
              href="/gallery"
              className="mt-4 sm:mt-0 text-orange font-semibold hover:underline flex items-center gap-2"
            >
              View Full Gallery
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="reveal group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                style={{ transitionDelay: `${i * 0.1}s` }}
                onClick={() => setLightbox(img.src)}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block bg-orange/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    {img.category}
                  </span>
                  <p className="text-white font-medium text-sm">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z" fill="#1B2A5C" />
          </svg>
        </div>
      </section>

      {/* Lightbox */}
      <div
        className={`lightbox-overlay fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 ${lightbox ? "open" : ""}`}
        onClick={() => setLightbox(null)}
      >
        {lightbox && (
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt="Gallery" className="w-full rounded-xl shadow-2xl" />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark font-bold shadow-lg hover:scale-110 transition-transform"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </>
  );
}
