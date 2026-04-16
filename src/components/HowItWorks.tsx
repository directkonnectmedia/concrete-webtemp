"use client";

const steps = [
  { num: "01", title: "Consultation", desc: "We visit your property, discuss your vision, and provide a free detailed estimate." },
  { num: "02", title: "Design", desc: "We plan the layout, choose finishes, and prepare the site for a flawless pour." },
  { num: "03", title: "Pour", desc: "Our crew pours and shapes the concrete with precision, ensuring structural integrity." },
  { num: "04", title: "Finish", desc: "We apply your chosen finish, cure properly, and leave you with a beautiful result." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="text-orange font-semibold text-sm tracking-widest uppercase mb-3">
            Simple Process
          </p>
          <h2 className="font-[var(--font-heading)] font-extrabold text-3xl md:text-5xl text-navy">
            How It Works
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-orange/20 via-orange to-orange/20" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="reveal relative text-center"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange to-orange-light flex items-center justify-center text-white font-[var(--font-heading)] font-bold text-lg shadow-xl shadow-orange/20">
                {step.num}
              </div>
              <h3 className="font-[var(--font-heading)] font-bold text-lg text-navy mb-2">
                {step.title}
              </h3>
              <p className="text-dark-muted text-sm leading-relaxed max-w-[240px] mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
