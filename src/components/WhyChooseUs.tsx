"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Satisfaction Rate" },
  { value: 5, suffix: "★", label: "Average Rating" },
];

const values = [
  { title: "Quality Craftsmanship", desc: "Every pour is done with precision, using the best materials and techniques for Arizona's climate." },
  { title: "On-Time, Every Time", desc: "We show up when we say we will. Your project stays on schedule from start to finish." },
  { title: "Transparent Pricing", desc: "No hidden fees or surprises. You get a clear, detailed estimate before any work begins." },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-[var(--font-heading)] font-extrabold text-orange">
      {display}{suffix}
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative bg-navy py-24 md:py-32 overflow-hidden">
      {/* 3D depth layers */}
      <div className="absolute top-[-100px] right-[-200px] w-[500px] h-[500px] rounded-full bg-orange/5 blur-3xl" />
      <div className="absolute bottom-[-50px] left-[-100px] w-[400px] h-[400px] rounded-full bg-navy-light/50 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orange/10 rounded-3xl rotate-12" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="text-orange-light font-semibold text-sm tracking-widest uppercase mb-3">
            The Difference
          </p>
          <h2 className="font-[var(--font-heading)] font-extrabold text-3xl md:text-5xl text-white">
            Why Choose Us
          </h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="reveal text-center" style={{ transitionDelay: `${i * 0.1}s` }}>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-white/60 mt-2 font-medium text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Value props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <div
              key={i}
              className="reveal relative group"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange to-orange-light flex items-center justify-center text-white text-xl font-bold mb-5 shadow-lg shadow-orange/20">
                  {i + 1}
                </div>
                <h3 className="font-[var(--font-heading)] font-bold text-lg text-white mb-3">
                  {val.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
