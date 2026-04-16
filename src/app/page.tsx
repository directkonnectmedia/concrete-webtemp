import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import GalleryPreview from "@/components/GalleryPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import QuoteWizard from "@/components/QuoteWizard";
import ServiceArea from "@/components/ServiceArea";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <HowItWorks />
        <GalleryPreview />
        <WhyChooseUs />
        <Reviews />
        <QuoteWizard />
        <ServiceArea />
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  );
}
