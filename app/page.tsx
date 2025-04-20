import { HeroSection } from "@/components/hero-section"
import { ScrollspyNav } from "@/components/scrollspy-nav"
import { ServicesSection } from "@/components/services-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { DataDashboardSection } from "@/components/data-dashboard-section"
import { TimelineSection } from "@/components/timeline-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ScrollspyNav />
      <HeroSection />
      <ServicesSection />
      <DataDashboardSection />
      <CaseStudiesSection />
      <TimelineSection />
      {/* Testimonials section commented out for now */}
      {/* <TestimonialsSection /> */}
      <FAQSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  )
}
