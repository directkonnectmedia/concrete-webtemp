"use client";

const reviews = [
  { name: "Maria G.", service: "Driveway", text: "They transformed our entire front yard. The driveway is absolutely beautiful and the crew was professional from start to finish.", stars: 5 },
  { name: "James R.", service: "Patio", text: "Best concrete work I've seen in the valley. Our patio looks like it belongs in a magazine. Highly recommend!", stars: 5 },
  { name: "Carlos M.", service: "Sidewalk", text: "Fast, clean, and the price was exactly what they quoted. No surprises. The sidewalk came out perfectly level.", stars: 5 },
  { name: "Sarah T.", service: "Foundation", text: "They poured the foundation for our home extension and it was done ahead of schedule. Solid work, solid team.", stars: 5 },
  { name: "David L.", service: "Colored Concrete", text: "The colored concrete on our backyard patio is stunning. Everyone who visits asks who did it. These guys are artists.", stars: 5 },
  { name: "Patricia K.", service: "Driveway", text: "From the free estimate to the final finish, everything was smooth. Our new driveway adds so much to our home.", stars: 5 },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#F47B20">
          <path d="M10 1l2.47 5.01L18 6.9l-4 3.9.94 5.5L10 13.77 5.06 16.3 6 10.8 2 6.9l5.53-.89L10 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const allReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" className="relative bg-navy-dark py-24 md:py-32 overflow-hidden">
      {/* Depth layers */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-navy to-navy-dark" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-[10%] w-80 h-80 rounded-full bg-orange" />
        <div className="absolute bottom-10 right-[15%] w-60 h-60 rounded-full bg-orange" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <p className="text-orange-light font-semibold text-sm tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-[var(--font-heading)] font-extrabold text-3xl md:text-5xl text-white">
            What Our Clients Say
          </h2>
        </div>
      </div>

      {/* Infinite slider */}
      <div className="relative overflow-hidden py-4">
        <div className="animate-slide flex gap-6 w-max">
          {allReviews.map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[350px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300"
            >
              <Stars count={review.stars} />
              <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange to-orange-light flex items-center justify-center text-white font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-white/40 text-xs">{review.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,40 C300,100 900,0 1200,60 L1200,120 L0,120 Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}
