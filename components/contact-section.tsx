"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Shield } from "lucide-react"
import { FilloutStandardEmbed } from "@fillout/react"
import "@fillout/react/style.css"

export function ContactSection() {
  // Using the same form ID for both contact and security audit
  const contactFormId = "cAWaWMHJmpus" // General contact form
  const securityAuditFormId = contactFormId // Using the same form for security audit

  return (
    <section id="contact" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contactGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contactGrid)" />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Ready to transform your digital presence? Contact us today to discuss your project requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              {/* Card header removed as the Fillout form already has a heading */}
              <CardContent>
                <div style={{ height: "500px" }}>
                  <FilloutStandardEmbed
                    filloutId={contactFormId}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Our Offices</CardTitle>
                <CardDescription>Visit us at one of our locations or reach out digitally.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-muted p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-[hsl(var(--electric-cyan))]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Headquarters</h3>
                      <p className="text-muted-foreground">
                        30 N Gould St Ste R
                        <br />
                        Sheridan, WY 82801
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-muted p-2 rounded-full">
                      <Phone className="h-5 w-5 text-[hsl(var(--electric-cyan))]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+91 8840592989</p>
                      <p className="text-muted-foreground">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-muted p-2 rounded-full">
                      <Mail className="h-5 w-5 text-[hsl(var(--electric-cyan))]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">nbatech467@gmail.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Free Security Audit</CardTitle>
                <CardDescription>Get a complimentary assessment of your current security posture.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Our security experts will analyze your infrastructure and provide actionable recommendations to
                  enhance your security posture.
                </p>
                <div className="w-full">
                  <button
                    className="w-full bg-[hsl(var(--cybersecurity-green))] hover:bg-[hsl(var(--cybersecurity-green))/90] text-white px-4 py-2 rounded-md flex items-center justify-center"
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
                      formContainer.setAttribute('data-fillout-id', securityAuditFormId);
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
                    <Shield className="h-4 w-4 mr-2" />
                    Request Free Audit
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
