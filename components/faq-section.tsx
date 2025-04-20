"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What industries does NBA TECH specialize in?",
    answer:
      "NBA TECH has extensive experience across multiple industries including finance, healthcare, retail, manufacturing, and technology. Our solutions are tailored to meet industry-specific requirements while addressing the unique challenges of each business.",
  },
  {
    question: "How does NBA TECH ensure the security of client data?",
    answer:
      "We implement multi-layered security measures including encryption, access controls, regular security audits, and compliance with industry standards (ISO 27001, GDPR, HIPAA, etc.). Our 24/7 monitoring systems detect and respond to potential threats in real-time, ensuring your data remains protected.",
  },
  {
    question: "What is the typical timeline for software development projects?",
    answer:
      "Project timelines vary based on complexity and requirements. Small to medium projects typically take 2-4 months, while enterprise-level solutions may require 4-8 months. We follow an agile methodology with regular deliverables and transparent progress tracking to ensure timely completion.",
  },
  {
    question: "Does NBA TECH provide ongoing support after project completion?",
    answer:
      "Yes, we offer comprehensive support and maintenance packages tailored to your needs. Our standard support includes 12 months of technical assistance, bug fixes, and security updates. We also provide extended support options with 24/7 availability and dedicated support teams.",
  },
  {
    question: "How does NBA TECH approach integration with existing systems?",
    answer:
      "We begin with a thorough assessment of your current infrastructure to identify integration points. Our solutions are designed with interoperability in mind, using industry-standard APIs and protocols. We ensure seamless integration with minimal disruption to your existing operations.",
  },
  {
    question: "What makes NBA TECH different from other IT service providers?",
    answer:
      "Our key differentiators include our comprehensive security-first approach, industry-specific expertise, proven track record of delivering measurable ROI, and our commitment to long-term partnerships. We don't just deliver technology; we provide strategic solutions that drive business growth and competitive advantage.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="faqGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faqGrid)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Find answers to common questions about our services, processes, and how we can help your business succeed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left font-medium py-4 hover:text-[hsl(var(--electric-cyan))] transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-foreground/70">
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-[hsl(var(--electric-cyan))] hover:underline"
              onClick={(e) => {
                e.preventDefault()
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Contact our team
            </a>{" "}
            for personalized assistance.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
