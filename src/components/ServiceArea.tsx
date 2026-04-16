"use client";

const cities = [
  "Avondale", "Goodyear", "Buckeye", "Litchfield Park",
  "Tolleson", "Glendale", "Peoria", "Surprise",
  "Phoenix (West)", "El Mirage", "Waddell", "Cashion",
];

export default function ServiceArea() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <p className="text-orange font-semibold text-sm tracking-widest uppercase mb-3">
              Service Area
            </p>
            <h2 className="font-[var(--font-heading)] font-extrabold text-3xl md:text-4xl text-navy mb-6">
              Serving the West Valley
            </h2>
            <p className="text-dark-muted mb-8 leading-relaxed">
              Based in Avondale, AZ, we serve the entire Phoenix West Valley
              with professional concrete services. If you&apos;re in or around
              these areas, we&apos;d love to help with your next project.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cities.map((city, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm font-medium text-navy"
                >
                  <span className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                  {city}
                </div>
              ))}
            </div>
            <a
              href="tel:+14803062547"
              className="inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-orange to-orange-light text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call (480) 306-2547
            </a>
          </div>

          {/* Map */}
          <div className="reveal reveal-delay-2 rounded-2xl overflow-hidden shadow-2xl border border-gray">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106823.1!2d-112.35!3d33.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b3e84a0cd1b41%3A0x6b7c3e1c3b9e4c1a!2sAvondale%2C%20AZ!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Service area map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
