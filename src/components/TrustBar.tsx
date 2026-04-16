"use client";

const trustItems = [
  { icon: "🛡️", label: "Licensed & Insured" },
  { icon: "⭐", label: "5-Star Rated" },
  { icon: "✅", label: "Free Estimates" },
  { icon: "🏗️", label: "10+ Years Experience" },
  { icon: "📍", label: "Locally Owned" },
];

export default function TrustBar() {
  return (
    <section className="bg-gray-light py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {trustItems.map((item, i) => (
            <div
              key={i}
              className="reveal flex items-center gap-2 text-navy"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-semibold text-sm tracking-wide">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
