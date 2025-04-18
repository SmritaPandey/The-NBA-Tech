"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Code, Shield, Users, BarChart, Database, X, Cpu, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

// Service categories with their respective data
const serviceCategories = [
  {
    id: "software",
    name: "Software Development",
    icon: Code,
    color: "software-blue",
    description: "Custom software solutions for web, mobile, and enterprise applications.",
    services: [
      "Web App Development",
      "Mobile App Development",
      "UI/UX Design",
      "API Development",
      "Cloud Solutions",
      "DevOps & CI/CD",
    ],
    details: [
      "React & Spring Boot expertise",
      "Native iOS and Android development",
      "User-centered design process",
      "RESTful and GraphQL APIs",
      "AWS, Azure, and GCP solutions",
      "Automated testing and deployment",
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: Shield,
    color: "cybersecurity-green",
    description: "Comprehensive security solutions to protect your digital assets.",
    services: ["24/7 C-SOC", "GRC", "IRMS", "VAPT", "Framework Design", "Take-Down Services"],
    details: [
      "24/7 SOC Ops with SIEM & SOAR pipelines",
      "Governance, Risk & Compliance",
      "Incident Response Management",
      "Vulnerability Assessment & Penetration Testing",
      "Custom security framework implementation",
      "Malicious content removal services",
    ],
  },
  {
    id: "hr",
    name: "HR & Training",
    icon: Users,
    color: "hr-purple",
    description: "Talent acquisition and development solutions for your organization.",
    services: [
      "Facility Management",
      "Manpower Supply",
      "Customized Training",
      "Recruitment Services",
      "Performance Management",
      "Employee Engagement",
    ],
    details: [
      "End-to-end facility management solutions",
      "Skilled workforce for IT and security operations",
      "Tailored training programs for technical teams",
      "Specialized IT talent acquisition",
      "KPI-based performance tracking systems",
      "Culture-building and retention programs",
    ],
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    icon: BarChart,
    color: "marketing-orange",
    description: "Strategic digital marketing services to grow your online presence.",
    services: ["SEO", "Email Marketing", "Social Media", "Animated Content", "Video Production", "Content Strategy"],
    details: [
      "Technical and content SEO optimization",
      "Automated campaign management",
      "Platform-specific strategy and execution",
      "Motion graphics and interactive content",
      "Professional video production services",
      "Data-driven content planning",
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: Database,
    color: "infrastructure-red",
    description: "Robust infrastructure solutions for enterprise operations.",
    services: ["DC/DR", "VDI", "Cloud Services", "Sec-aaS", "Hardware Supply", "Video Conferencing"],
    details: [
      "Data Center and Disaster Recovery planning",
      "Virtual Desktop Infrastructure solutions",
      "Managed cloud migration and operations",
      "Security-as-a-Service offerings",
      "Enterprise hardware procurement",
      "Secure communication solutions",
    ],
  },
  {
    id: "security-products",
    name: "Security Products",
    icon: Cpu,
    color: "deep-blue",
    description: "Advanced security products for comprehensive protection.",
    services: ["SIEM", "SOAR", "EDR", "XDR", "EPS", "DLP", "NOC/SOC", "Antiviruses"],
    details: [
      "Security Information and Event Management",
      "Security Orchestration, Automation and Response",
      "Endpoint Detection and Response",
      "Extended Detection and Response",
      "Events Per Second monitoring",
      "Data Loss Prevention solutions",
      "Network/Security Operations Center",
      "Next-gen antivirus protection",
    ],
  },
  {
    id: "banking",
    name: "Banking Solutions",
    icon: CreditCard,
    color: "banking-gold",
    description: "Secure and efficient banking and enterprise solutions.",
    services: ["Core Banking", "RTGS/NEFT", "ATM/POS", "eKYC", "UPI", "ERP", "PAM/IAM"],
    details: [
      "Comprehensive core banking systems",
      "Real-time gross settlement/National Electronic Funds Transfer",
      "ATM and Point of Sale solutions",
      "Electronic Know Your Customer verification",
      "Unified Payment Interface integration",
      "Enterprise Resource Planning systems",
      "Privileged Access Management/Identity and Access Management",
    ],
  },
]

// Service icon component
function ServiceIcon({ service }) {
  return (
    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-[hsl(var(--background))] dark:bg-[hsl(var(--deep-blue))/50] border border-[hsl(var(--electric-cyan))/30] shadow-sm">
      <motion.div
        initial={{ rotate: -10, scale: 0.9 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <service.icon className="h-8 w-8 text-[hsl(var(--electric-cyan))] group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_3px_rgba(0,200,255,0.3)]" />
      </motion.div>
    </div>
  )
}

export function ServicesSection() {
  const [filter, setFilter] = useState("")
  const [selectedService, setSelectedService] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // Filter services based on search input
  const filteredServices = serviceCategories.filter(
    (service) =>
      service.name.toLowerCase().includes(filter.toLowerCase()) ||
      service.description.toLowerCase().includes(filter.toLowerCase()) ||
      service.services.some((s) => s.toLowerCase().includes(filter.toLowerCase()))
  )

  return (
    <div id="services" className="py-20 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to secure and transform your business operations.
          </p>

          {/* Search filter */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search services..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 bg-background border-border"
              />
              {filter && (
                <button
                  onClick={() => setFilter("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Dialog
                open={isDialogOpen && selectedService?.id === service.id}
                onOpenChange={(open) => {
                  setIsDialogOpen(open)
                  if (!open) setSelectedService(null)
                }}
              >
                <DialogTrigger asChild>
                  <div
                    className={cn(
                      "service-card bg-card rounded-xl p-6 h-full cursor-pointer border border-[hsl(var(--electric-cyan))/30] hover:border-[hsl(var(--electric-cyan))]",
                      "transition-all duration-300 ease-out shadow-sm hover:shadow-md dark:bg-[hsl(var(--card))] dark:shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:translate-y-[-5px]"
                    )}
                    onClick={() => {
                      setSelectedService(service)
                      setIsDialogOpen(true)
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <ServiceIcon service={service} />
                      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto justify-center">
                        {service.services.slice(0, 3).map((item, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--electric-cyan))/10] text-[hsl(var(--electric-cyan))] font-medium"
                          >
                            {item}
                          </span>
                        ))}
                        {service.services.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--background))] dark:bg-[hsl(var(--deep-blue))/50] border border-[hsl(var(--electric-cyan))/20] text-muted-foreground font-medium">
                            +{service.services.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hover overlay with one-line descriptor */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.7)] dark:from-[rgba(0,30,60,0.7)] dark:to-[rgba(0,30,60,0.9)] backdrop-blur-sm rounded-xl opacity-0 hover:opacity-100 flex flex-col items-center justify-center p-6 transition-all duration-300">
                      <div className="w-full text-center">
                        <h4 className="text-white font-semibold mb-2 text-center">{service.name}</h4>
                        <p className="text-white/90 font-medium text-center mb-4 max-w-[200px] mx-auto">{service.description}</p>
                        <span className="inline-block text-xs px-3 py-1.5 rounded-full bg-[hsl(var(--electric-cyan))/20] text-white border border-[hsl(var(--electric-cyan))/30]">
                          Click to explore
                        </span>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto p-0">
                  {/* Hero banner with animation */}
                  <div className="w-full h-64 bg-gradient-to-r from-[hsl(var(--deep-blue))] to-[hsl(var(--electric-cyan))] flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-grid-white\/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.8))]" />

                    {/* Animated elements */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <service.icon
                          className="h-48 w-48 text-white/10 animate-pulse"
                          style={{ animationDuration: "3s" }}
                        />
                      </div>

                      {/* Animated particles */}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full bg-white/30"
                          initial={{
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                            opacity: 0.3
                          }}
                          animate={{
                            x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                            y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                            opacity: [0.3, 0.7, 0.3]
                          }}
                          transition={{
                            duration: 8,
                            ease: "linear",
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse"
                          }}
                        />
                      ))}
                    </div>

                    <div className="z-10 text-center px-6">
                      <div className="inline-block mb-3 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                        Premium Service
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{service.name}</h2>
                      <p className="text-white/80 max-w-2xl mx-auto">{service.description}</p>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Main content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[hsl(var(--electric-cyan))/10] flex items-center justify-center mr-2">
                            <service.icon className="h-4 w-4 text-[hsl(var(--electric-cyan))]" />
                          </div>
                          Overview
                        </h3>

                        <p className="text-muted-foreground mb-6">
                          Our {service.name.toLowerCase()} services are designed to help businesses navigate the complexities of today's digital landscape.
                          We combine industry expertise with cutting-edge technology to deliver solutions that drive growth, enhance security, and optimize operations.
                        </p>

                        <h4 className="text-lg font-medium mb-3">Key Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {service.services.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg border border-[hsl(var(--electric-cyan))/10] hover:border-[hsl(var(--electric-cyan))/30] transition-colors">
                              <div className="mt-1 w-6 h-6 rounded-full bg-[hsl(var(--electric-cyan))/15] flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 rounded-full bg-[hsl(var(--electric-cyan))]"></div>
                              </div>
                              <div>
                                <h5 className="font-medium">{item}</h5>
                                <p className="text-sm text-muted-foreground">
                                  {service.details[i] || "Comprehensive solutions tailored to your business needs."}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <h4 className="text-lg font-medium mb-3">Why Choose Our {service.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {[
                            { title: "Expert Team", description: "Seasoned professionals with deep industry knowledge" },
                            { title: "Tailored Approach", description: "Customized solutions designed for your specific needs" },
                            { title: "Cutting-Edge Technology", description: "Leveraging the latest innovations for optimal results" },
                            { title: "Proven Track Record", description: "Consistent success across diverse client engagements" },
                            { title: "Ongoing Support", description: "Dedicated assistance throughout implementation and beyond" },
                            { title: "Scalable Solutions", description: "Flexible services that grow with your business" }
                          ].map((benefit, i) => (
                            <div key={i} className="p-4 border border-[hsl(var(--electric-cyan))/10] rounded-lg bg-card">
                              <h5 className="font-medium mb-1 text-[hsl(var(--electric-cyan))]">{benefit.title}</h5>
                              <p className="text-xs text-muted-foreground">{benefit.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sidebar */}
                      <div className="w-full md:w-72 flex-shrink-0">
                        <div className="sticky top-4 bg-muted/30 rounded-lg p-5 border border-[hsl(var(--electric-cyan))/10]">
                          <h4 className="text-lg font-medium mb-4">Service Details</h4>

                          <div className="space-y-4 mb-6">
                            <div>
                              <h5 className="text-sm font-medium text-muted-foreground mb-1">Service Type</h5>
                              <p className="font-medium">{service.name}</p>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium text-muted-foreground mb-1">Typical Timeline</h5>
                              <p className="font-medium">2-8 weeks</p>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium text-muted-foreground mb-1">Delivery Model</h5>
                              <p className="font-medium">Remote / On-site</p>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium text-muted-foreground mb-1">Support Included</h5>
                              <p className="font-medium">12 months</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Button
                              variant="accent"
                              className="w-full bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(195,85%,45%)] hover:from-[hsl(195,85%,45%)] hover:to-[hsl(var(--electric-cyan))] text-[hsl(var(--deep-blue))] shadow-sm hover:shadow-md transition-all duration-300"
                              onClick={() => {
                                setIsDialogOpen(false)
                                setTimeout(() => {
                                  const contactSection = document.getElementById('contact')
                                  if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: 'smooth' })
                                  }
                                }, 300)
                              }}
                            >
                              Request Quote
                            </Button>

                            <Button variant="outline" className="w-full">
                              Download Brochure
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-8 pt-8 border-t border-border">
                      <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>

                      <Accordion type="single" collapsible className="mb-6">
                        <AccordionItem value="faq-1">
                          <AccordionTrigger>What is the typical process for implementing {service.name.toLowerCase()}?</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">
                              Our implementation process typically involves an initial consultation to understand your needs, followed by a detailed proposal and project plan. We then proceed with implementation, testing, and deployment, with ongoing support and maintenance as needed.
                            </p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="faq-2">
                          <AccordionTrigger>How do you ensure the security of our data?</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">
                              We implement industry-leading security measures including encryption, access controls, regular security audits, and compliance with relevant regulations. Our team stays updated on the latest security threats and best practices to ensure your data remains protected.
                            </p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="faq-3">
                          <AccordionTrigger>Can your solutions integrate with our existing systems?</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">
                              Yes, our solutions are designed with interoperability in mind. We have experience integrating with a wide range of systems and platforms, and we'll work closely with your team to ensure seamless integration with your existing infrastructure.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>


                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services found matching your search.</p>
            <Button variant="outline" onClick={() => setFilter("")} className="mt-4 hover:border-[hsl(var(--electric-cyan))] hover:text-[hsl(var(--electric-cyan))]">
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
