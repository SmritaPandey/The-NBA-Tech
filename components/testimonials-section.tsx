"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO, FinTech Solutions",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "NBA TECH's cybersecurity solutions have transformed our security posture. Their 24/7 monitoring caught several potential breaches that could have cost us millions. The ROI has been exceptional.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "VP of Engineering, TechGrowth Inc",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The custom software solution developed by NBA TECH increased our operational efficiency by 35%. Their team's technical expertise and commitment to quality exceeded our expectations.",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Director of Digital, Global Retail",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Working with NBA TECH on our digital transformation initiative was seamless. Their strategic approach and attention to detail helped us achieve our goals ahead of schedule and under budget.",
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "CISO, Healthcare Systems",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "In the highly regulated healthcare industry, we needed a partner who understood compliance requirements. NBA TECH delivered secure solutions that not only met but exceeded regulatory standards.",
  },
  {
    id: 5,
    name: "Emma Wilson",
    role: "COO, E-commerce Platform",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The infrastructure solutions provided by NBA TECH scaled flawlessly during our peak season, handling a 400% increase in traffic without any performance issues. Their team's proactive support was invaluable.",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const intervalRef = useRef(null)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (autoplay && isInView) {
      intervalRef.current = setInterval(() => {
        nextTestimonial()
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoplay, isInView])

  const handleMouseEnter = () => {
    setAutoplay(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleMouseLeave = () => {
    setAutoplay(true)
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/30 relative overflow-hidden" ref={containerRef}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="testimonialGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonialGrid)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what industry leaders have to say about their experience working with NBA TECH.
          </p>
        </motion.div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="w-full flex-shrink-0"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                    x: index === activeIndex ? 0 : 100,
                    display: index === activeIndex ? "block" : "none",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-none shadow-lg bg-card dark:bg-[hsl(var(--card))]">
                    <CardContent className="p-8">
                      <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-[hsl(var(--electric-cyan))/10] flex items-center justify-center">
                          <Quote className="h-6 w-6 text-[hsl(var(--electric-cyan))]" />
                        </div>
                      </div>
                      <p className="text-lg text-center mb-8 italic">"{testimonial.content}"</p>
                      <div className="flex items-center justify-center">
                        <Avatar className="h-12 w-12 mr-4 border-2 border-[hsl(var(--electric-cyan))/30]">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4">
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full h-10 w-10 shadow-md"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full h-10 w-10 shadow-md"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-[hsl(var(--electric-cyan))] w-6"
                    : "bg-foreground/20 hover:bg-foreground/40"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            {/* Replace with actual client logos */}
            <div className="h-8 w-24 bg-foreground/20 rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-foreground/20 rounded animate-pulse"></div>
            <div className="h-8 w-28 bg-foreground/20 rounded animate-pulse"></div>
            <div className="h-8 w-36 bg-foreground/20 rounded animate-pulse"></div>
            <div className="h-8 w-30 bg-foreground/20 rounded animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
