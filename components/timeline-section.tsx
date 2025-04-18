"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, Rocket, Users, Code, Shield } from "lucide-react"

// Timeline data
const timelineEvents = [
  {
    year: "2018",
    title: "NBA TECH Founded",
    description: "Started with a team of 5 developers focused on custom software solutions.",
    icon: Rocket,
    color: "software-blue",
  },
  {
    year: "2019",
    title: "Cybersecurity Division",
    description: "Expanded services to include comprehensive security solutions and 24/7 SOC operations.",
    icon: Shield,
    color: "cybersecurity-green",
  },
  {
    year: "2020",
    title: "50+ Team Members",
    description: "Grew to over 50 professionals across development, security, and infrastructure teams.",
    icon: Users,
    color: "hr-purple",
  },
  {
    year: "2021",
    title: "Enterprise Solutions",
    description: "Launched banking and enterprise solution services for large-scale organizations.",
    icon: Code,
    color: "banking-gold",
  },
  {
    year: "2022",
    title: "Industry Recognition",
    description: "Received multiple awards for innovation in secure digital transformation.",
    icon: Award,
    color: "marketing-orange",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Expanded operations to serve clients across 3 continents with 24/7 support.",
    icon: Calendar,
    color: "infrastructure-red",
  },
]

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section id="timeline" className="py-20 bg-muted/30 relative overflow-hidden" ref={containerRef}>
      <motion.div className="container mx-auto" style={{ opacity, scale }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            From our founding to today, we've continuously evolved to meet the changing needs of our clients.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative mt-16 pb-8">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />

          {/* Timeline events */}
          <div className="flex flex-nowrap overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            <div className="w-1/12 flex-shrink-0" />
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className="w-10/12 md:w-8/12 lg:w-5/12 flex-shrink-0 px-4 snap-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative">
                  {/* Timeline node */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--electric-cyan))] to-[hsl(var(--deep-blue))] flex items-center justify-center z-10 shadow-md border border-[hsl(var(--electric-cyan))/30]"
                  >
                    <event.icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Year badge */}
                  <Badge
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-14 bg-[hsl(var(--electric-cyan))] text-[hsl(var(--deep-blue))] font-semibold"
                  >
                    {event.year}
                  </Badge>

                  {/* Content card */}
                  <Card className="mt-8 hover:shadow-lg transition-shadow duration-300 border-[hsl(var(--electric-cyan))/20] hover:border-[hsl(var(--electric-cyan))/50]">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[hsl(var(--deep-blue))] to-[hsl(var(--electric-cyan))] bg-clip-text text-transparent dark:from-[hsl(var(--electric-cyan))] dark:to-[hsl(210,40%,90%)]">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
            <div className="w-1/12 flex-shrink-0" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
