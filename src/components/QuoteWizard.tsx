"use client";
import { useState } from "react";

const serviceOptions = [
  { id: "driveways", label: "Driveways", icon: "🛣️" },
  { id: "sidewalks", label: "Sidewalks", icon: "🚶" },
  { id: "patios", label: "Patios", icon: "🏡" },
  { id: "foundations", label: "Foundations", icon: "🏗️" },
  { id: "colors", label: "Concrete Colors", icon: "🎨" },
];

const timelineOptions = ["ASAP", "Within 2 weeks", "Within a month", "Just exploring"];
const sizeOptions = ["Small (under 200 sq ft)", "Medium (200–500 sq ft)", "Large (500–1000 sq ft)", "Extra Large (1000+ sq ft)"];

export default function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    service: "",
    size: "",
    timeline: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    details: "",
  });

  const totalSteps = 4;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    setStep(3);
  };

  return (
    <section id="quote" className="bg-white py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <p className="text-orange font-semibold text-sm tracking-widest uppercase mb-3">
            Free Estimate
          </p>
          <h2 className="font-[var(--font-heading)] font-extrabold text-3xl md:text-5xl text-navy">
            Get Your Free Quote
          </h2>
          <p className="text-dark-muted mt-4">
            Tell us about your project and we&apos;ll get back to you with a detailed estimate.
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {["Service", "Details", "Contact", "Done"].map((label, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    i <= step
                      ? "bg-gradient-to-br from-orange to-orange-light text-white shadow-lg shadow-orange/20"
                      : "bg-gray text-dark-muted"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="text-xs mt-1.5 font-medium text-dark-muted hidden sm:block">{label}</span>
              </div>
              {i < 3 && (
                <div className={`w-12 h-0.5 transition-colors duration-300 ${i < step ? "bg-orange" : "bg-gray"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Wizard card */}
        <div className="bg-gray-light rounded-3xl p-8 md:p-12 shadow-xl border border-gray/50 relative overflow-hidden min-h-[340px]">
          {/* Step 1: Service */}
          <div className={`wizard-step ${step === 0 ? "active" : ""}`}>
            <h3 className="font-[var(--font-heading)] font-bold text-lg text-navy mb-6">
              What service do you need?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {serviceOptions.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => { setForm({ ...form, service: svc.id }); next(); }}
                  className={`p-5 rounded-xl border-2 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    form.service === svc.id
                      ? "border-orange bg-orange/5 shadow-lg"
                      : "border-gray bg-white hover:border-orange/50"
                  }`}
                >
                  <span className="text-3xl block mb-2">{svc.icon}</span>
                  <span className="font-semibold text-sm text-navy">{svc.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Project details */}
          <div className={`wizard-step ${step === 1 ? "active" : ""}`}>
            <h3 className="font-[var(--font-heading)] font-bold text-lg text-navy mb-6">
              Tell us about the project
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-dark-muted mb-2">Project Size</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setForm({ ...form, size })}
                      className={`p-4 rounded-xl border-2 text-left text-sm font-medium transition-all duration-300 ${
                        form.size === size ? "border-orange bg-orange/5" : "border-gray bg-white hover:border-orange/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-muted mb-2">Timeline</label>
                <div className="grid grid-cols-2 gap-3">
                  {timelineOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, timeline: t })}
                      className={`p-4 rounded-xl border-2 text-sm font-medium transition-all duration-300 ${
                        form.timeline === t ? "border-orange bg-orange/5" : "border-gray bg-white hover:border-orange/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Any additional details about your project..."
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className="w-full p-4 rounded-xl border-2 border-gray bg-white text-sm placeholder:text-dark-muted/50 focus:border-orange focus:outline-none transition-colors min-h-[80px] resize-none"
              />
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={prev} className="px-6 py-3 rounded-full border-2 border-gray text-dark-muted font-semibold text-sm hover:border-navy transition-colors">
                Back
              </button>
              <button onClick={next} className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-orange to-orange-light text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                Continue
              </button>
            </div>
          </div>

          {/* Step 3: Contact */}
          <div className={`wizard-step ${step === 2 ? "active" : ""}`}>
            <h3 className="font-[var(--font-heading)] font-bold text-lg text-navy mb-6">
              Your contact information
            </h3>
            <div className="space-y-4">
              <input
                type="text" placeholder="Full Name"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-4 rounded-xl border-2 border-gray bg-white text-sm placeholder:text-dark-muted/50 focus:border-orange focus:outline-none transition-colors"
              />
              <input
                type="tel" placeholder="Phone Number"
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-4 rounded-xl border-2 border-gray bg-white text-sm placeholder:text-dark-muted/50 focus:border-orange focus:outline-none transition-colors"
              />
              <input
                type="email" placeholder="Email Address"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-4 rounded-xl border-2 border-gray bg-white text-sm placeholder:text-dark-muted/50 focus:border-orange focus:outline-none transition-colors"
              />
              <input
                type="text" placeholder="Project Address"
                value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-4 rounded-xl border-2 border-gray bg-white text-sm placeholder:text-dark-muted/50 focus:border-orange focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={prev} className="px-6 py-3 rounded-full border-2 border-gray text-dark-muted font-semibold text-sm hover:border-navy transition-colors">
                Back
              </button>
              <button onClick={handleSubmit} className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-orange to-orange-light text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                Submit Request
              </button>
            </div>
          </div>

          {/* Step 4: Confirmation */}
          <div className={`wizard-step ${step === 3 ? "active" : ""}`}>
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange to-orange-light flex items-center justify-center shadow-2xl shadow-orange/30">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="font-[var(--font-heading)] font-bold text-2xl text-navy mb-3">
                Thank You!
              </h3>
              <p className="text-dark-muted max-w-md mx-auto">
                We&apos;ve received your request. Our team will review your project details and get back to you within 24 hours with a free estimate.
              </p>
              <a
                href="tel:+14803062547"
                className="inline-flex items-center gap-2 mt-6 bg-navy text-white font-semibold px-8 py-3 rounded-full hover:bg-navy-light transition-colors"
              >
                Or Call Now: (480) 306-2547
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
