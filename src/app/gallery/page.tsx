"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const allImages = [
  { src: "/gallery/project-01.jpg", alt: "Side yard concrete slab with broom finish", category: "Driveways" },
  { src: "/gallery/project-02.jpg", alt: "Long residential driveway with clean control joints", category: "Driveways" },
  { src: "/gallery/project-03.jpg", alt: "Backyard patio extension under covered pergola", category: "Patios" },
  { src: "/gallery/project-04.jpg", alt: "Backyard concrete pad with smooth dark finish", category: "Patios" },
  { src: "/gallery/project-05.jpg", alt: "Large backyard patio with string lights overhead", category: "Patios" },
  { src: "/gallery/project-06.jpg", alt: "Curved-edge patio with dark finish and gravel border", category: "Patios" },
  { src: "/gallery/project-07.jpg", alt: "Patio with custom curved cutout around tree", category: "Patios" },
  { src: "/gallery/project-08.jpg", alt: "Narrow side yard walkway along house wall", category: "Sidewalks" },
  { src: "/gallery/project-09.jpg", alt: "Full front yard driveway with smooth finish", category: "Driveways" },
  { src: "/gallery/project-10.jpg", alt: "Side yard walkway connecting to paver patio", category: "Sidewalks" },
  { src: "/gallery/project-11.jpg", alt: "Large backyard concrete slab for shed and storage", category: "Foundations" },
  { src: "/gallery/project-12.jpg", alt: "Backyard slab with broom finish next to shed", category: "Foundations" },
  { src: "/gallery/project-13.jpg", alt: "Concrete pad under carport at mobile home", category: "Driveways" },
  { src: "/gallery/project-14.jpg", alt: "Covered carport concrete pad with smooth finish", category: "Driveways" },
  { src: "/gallery/project-15.jpg", alt: "Close-up of fresh concrete with clean joints", category: "Driveways" },
  { src: "/gallery/project-16.jpg", alt: "Large patio slab with broom finish detail", category: "Patios" },
  { src: "/gallery/project-17.jpg", alt: "Full backyard patio pour at mobile home", category: "Patios" },
  { src: "/gallery/project-18.jpg", alt: "Side yard driveway extension next to garage", category: "Driveways" },
  { src: "/gallery/project-19.jpg", alt: "Curved patio pour extending from covered porch", category: "Patios" },
  { src: "/gallery/project-20.jpg", alt: "Large patio and walkway at covered back porch", category: "Patios" },
  { src: "/gallery/project-21.jpg", alt: "Concrete pad leading to backyard storage shed", category: "Foundations" },
  { src: "/gallery/project-22.jpg", alt: "Crew smoothing fresh concrete with bull float", category: "Patios" },
  { src: "/gallery/project-23.jpg", alt: "Patio extension being finished in backyard", category: "Patios" },
  { src: "/gallery/project-24.jpg", alt: "Driveway walkway extension with fresh pour", category: "Sidewalks" },
  { src: "/gallery/project-25.jpg", alt: "Curved sidewalk path wrapping around a tree", category: "Sidewalks" },
];

const categories = ["All", "Driveways", "Patios", "Sidewalks", "Foundations"];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = filter === "All" ? allImages : allImages.filter((img) => img.category === filter);

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-28 pb-16 bg-gray-light min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-orange font-semibold text-sm tracking-widest uppercase mb-3">
              Portfolio
            </p>
            <h1 className="font-[var(--font-heading)] font-extrabold text-3xl md:text-5xl text-navy">
              Our Work Gallery
            </h1>
            <p className="text-dark-muted mt-4 max-w-xl mx-auto">
              Browse our recent concrete projects across the Phoenix West Valley.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  filter === cat
                    ? "bg-gradient-to-r from-orange to-orange-light text-white shadow-lg shadow-orange/20"
                    : "bg-white text-dark-muted border border-gray hover:border-orange/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((img, i) => (
              <div
                key={`${filter}-${i}`}
                className="reveal break-inside-avoid group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                style={{ transitionDelay: `${(i % 6) * 0.08}s` }}
                onClick={() => setLightbox(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block bg-orange/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">
                    {img.category}
                  </span>
                  <p className="text-white font-medium text-sm">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

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
