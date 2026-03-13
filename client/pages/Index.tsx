import { useRef } from "react";
import Hero from "@/components/Hero";
import ReelsSection from "@/components/ReelsSection";
import TimelineSection from "@/components/TimelineSection";
import MetricsSection from "@/components/MetricsSection";
import SocialSection from "@/components/SocialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Index() {
  const reelsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToReels = () => {
    reelsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero onViewReels={scrollToReels} onContact={scrollToContact} />

      {/* Reels Section */}
      <div ref={reelsRef} id="reels">
        <ReelsSection />
      </div>

      {/* Timeline/About Section */}
      <div id="timeline">
        <TimelineSection />
      </div>

      {/* Metrics Section */}
      <div id="metrics">
        <MetricsSection />
      </div>

      {/* Social Section */}
      <SocialSection />

      {/* Contact Section */}
      <div ref={contactRef} id="contact">
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer onScrollTop={scrollToTop} />
    </div>
  );
}
