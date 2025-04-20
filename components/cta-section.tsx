"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { ClientOnlyParticles } from "@/components/ui/client-only-particles"
import "@fillout/react/style.css"

export function CTASection() {
  // Using the provided Fillout.com form ID for consultation requests
  const consultationFormId = "7GUTeCtnRvus" // Consultation request form
  return (
    <section className="py-20 bg-[hsl(var(--deep-blue))] dark:bg-[hsl(var(--deep-blue))] text-white relative overflow-hidden [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
      {/* Add text shadow to all text in this section for better readability */}
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--deep-blue))] via-[hsl(215,60%,20%)] to-[hsl(195,85%,25%)] opacity-90 dark:opacity-100"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[hsl(var(--electric-cyan))] filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[hsl(195,85%,45%)] filter blur-[120px] opacity-10 animate-pulse" style={{ animationDuration: '7s' }}></div>

        {/* Particle effect - Client-only component to avoid hydration mismatch */}
        <ClientOnlyParticles count={20} />

        {/* Light overlay for better readability */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] dark:bg-[rgba(0,0,0,0.1)]"></div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(10px); }
          50% { transform: translateY(-20px) translateX(0); }
          75% { transform: translateY(-10px) translateX(-10px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[hsl(var(--electric-cyan))] text-sm font-medium border border-[hsl(var(--electric-cyan))/30]">
              ELEVATE YOUR DIGITAL PRESENCE
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[hsl(var(--electric-cyan))] dark:from-white dark:to-[hsl(var(--electric-cyan))] bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join industry leaders who trust NBA TECH to deliver secure, innovative solutions that drive growth and competitive advantage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[hsl(var(--electric-cyan))] flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Enterprise-Grade Security</h3>
                  <p className="text-white/80 text-sm">
                    Advanced protection for your critical data and digital assets
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[hsl(var(--electric-cyan))] flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Tailored Solutions</h3>
                  <p className="text-white/80 text-sm">
                    Custom development aligned with your specific business needs
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[hsl(var(--electric-cyan))] flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Proven ROI</h3>
                  <p className="text-white/80 text-sm">
                    Solutions that deliver measurable business impact and value
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[hsl(var(--electric-cyan))] flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Dedicated Support</h3>
                  <p className="text-white/80 text-sm">
                    24/7 expert assistance and ongoing maintenance
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(195,85%,45%)] hover:from-[hsl(195,85%,45%)] hover:to-[hsl(var(--electric-cyan))] text-[hsl(var(--deep-blue))] font-medium shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                  onClick={() => {
                    // Create modal for the form
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';

                    // Create modal content
                    const modalContent = document.createElement('div');
                    modalContent.className = 'bg-white rounded-lg p-4 w-full max-w-2xl max-h-[90vh] overflow-auto relative';

                    // Create close button
                    const closeButton = document.createElement('button');
                    closeButton.className = 'absolute top-2 right-2 text-gray-500 hover:text-gray-800';
                    closeButton.innerHTML = '✕';
                    closeButton.onclick = () => document.body.removeChild(modal);

                    // Create form container
                    const formContainer = document.createElement('div');
                    formContainer.style.width = '100%';
                    formContainer.style.height = '500px';
                    formContainer.setAttribute('data-fillout-id', consultationFormId);
                    formContainer.setAttribute('data-fillout-embed-type', 'standard');
                    formContainer.setAttribute('data-fillout-inherit-parameters', '');
                    formContainer.setAttribute('data-fillout-dynamic-resize', '');

                    // Add elements to the DOM
                    modalContent.appendChild(closeButton);
                    modalContent.appendChild(formContainer);
                    modal.appendChild(modalContent);
                    document.body.appendChild(modal);

                    // Load the Fillout script
                    const script = document.createElement('script');
                    script.src = 'https://server.fillout.com/embed/v1/';
                    document.body.appendChild(script);

                    // Close modal when clicking outside
                    modal.addEventListener('click', (e) => {
                      if (e.target === modal) {
                        document.body.removeChild(modal);
                      }
                    });
                  }}
                >
                  <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  Schedule a Free Consultation
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                </Button>
              </div>
              <div>
                <Button
                  size="lg"
                  className="bg-[hsl(var(--deep-blue))] border-2 border-[hsl(var(--electric-cyan))] text-white hover:bg-[hsl(var(--deep-blue))]/90 hover:border-white transition-all duration-300 relative overflow-hidden font-medium shadow-md group"
                  onClick={() => {
                    const servicesSection = document.getElementById('services')
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  Explore Our Services
                  <span className="absolute inset-0 w-full h-full bg-[hsl(var(--electric-cyan))]/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
