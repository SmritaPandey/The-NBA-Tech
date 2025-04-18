"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ButtonWithRipple } from "@/components/ui/button-with-ripple"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading"
import { Boxes } from "@/components/ui/background-boxes"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Typing effect for the headline
  const headline = "Pioneering Secure Digital Transformation"
  const words = headline.split(" ")

  // Items for the circular reveal heading
  const circularItems = [
    {
      text: "SECURITY",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop"
    },
    {
      text: "INNOVATION",
      image: "https://images.unsplash.com/photo-1581089781785-603411fa81e5?q=80&w=1000&auto=format&fit=crop"
    },
    {
      text: "SOLUTIONS",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop"
    },
    {
      text: "EXCELLENCE",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop"
    }
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden hero-gradient"
      id="hero"
    >
      {/* Background boxes */}
      <div className="absolute inset-0 overflow-hidden">
        <Boxes className="opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--background))] dark:from-[hsl(var(--deep-blue))] dark:to-[hsl(215,60%,12%)] z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      </div>

      {/* Subtle grid overlay */}
      <motion.div className="absolute inset-0 z-0 opacity-5" style={{ y: layer1Y }}>
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      <div className="container mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side: Animation */}
          <div className="flex justify-center md:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <CircularRevealHeading
                items={circularItems}
                centerText={
                  <div className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--deep-blue))] to-[hsl(var(--electric-cyan))] bg-clip-text text-transparent dark:from-[hsl(var(--electric-cyan))] dark:to-[hsl(210,40%,90%)]">
                    NBA TECH
                  </div>
                }
                size="md"
                className="shadow-md"
              />
            </motion.div>
          </div>

          {/* Right side: Text content */}
          <motion.div style={{ y: textY, opacity }} className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm font-medium tracking-wider text-[hsl(var(--electric-cyan))] dark:text-[hsl(var(--electric-cyan))]"
            >
              YOUR DATA, OUR FORTRESS
            </motion.div>

            <h1 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.1,
                    ease: "easeOut",
                  }}
                  className="inline-block mr-2 mb-2"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-4 text-lg text-foreground/80 max-w-lg leading-relaxed"
            >
              Delivering cutting-edge software development, cybersecurity, and digital transformation solutions for
              enterprises that demand excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <ButtonWithRipple
                variant="accent"
                size="lg"
                className="bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(195,85%,45%)] hover:from-[hsl(195,85%,45%)] hover:to-[hsl(var(--electric-cyan))] text-[hsl(var(--deep-blue))] font-medium shadow-sm hover:shadow-md group transition-all duration-300"
                rippleColor="rgba(255, 255, 255, 0.5)"
                onClick={() => {
                  const servicesSection = document.getElementById('services')
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Get Started
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </ButtonWithRipple>
              <ButtonWithRipple
                variant="outline"
                size="lg"
                className="border border-[hsl(var(--electric-cyan))/30] text-foreground hover:bg-[hsl(var(--electric-cyan))/10] hover:text-[hsl(var(--electric-cyan))] hover:border-[hsl(var(--electric-cyan))] transition-all duration-300"
                rippleColor="rgba(0, 255, 255, 0.2)"
                onClick={() => {
                  const caseStudiesSection = document.getElementById('case-studies')
                  if (caseStudiesSection) {
                    caseStudiesSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                View Our Work
              </ButtonWithRipple>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center p-1"
        >
          <motion.div className="w-1 h-2 bg-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
