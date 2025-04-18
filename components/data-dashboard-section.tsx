"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Shield, Users, Code, Server, Clock, CheckCircle2, Database } from "lucide-react"

// Dashboard data
const dashboardData = {
  software: [
    { icon: Code, label: "Web Apps Delivered", value: 50, suffix: "+" },
    { icon: Activity, label: "Mobile Apps", value: 25, suffix: "+" },
    { icon: CheckCircle2, label: "Client Satisfaction", value: 98, suffix: "%" },
    { icon: Clock, label: "Avg. Delivery Time", value: 12, suffix: " weeks" },
  ],
  cybersecurity: [
    { icon: Shield, label: "Security Audits", value: 200, suffix: "+" },
    { icon: Server, label: "Protected Endpoints", value: 10000, suffix: "+" },
    { icon: Clock, label: "24/7 C-SOC", value: 100, suffix: "% uptime" },
    { icon: Database, label: "VPN Endpoints", value: 5000, suffix: "+" },
  ],
  hr: [
    { icon: Users, label: "Skilled Professionals", value: 500, suffix: "+" },
    { icon: CheckCircle2, label: "Training Programs", value: 30, suffix: "+" },
    { icon: Activity, label: "Retention Rate", value: 95, suffix: "%" },
    { icon: Clock, label: "Avg. Recruitment Time", value: 14, suffix: " days" },
  ],
}

export function DataDashboardSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="dashboard" className="py-20 bg-muted/30 relative overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Service Performance</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our track record of excellence across key service areas demonstrates our commitment to quality and results.
          </p>
        </motion.div>

        <Tabs defaultValue="software" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger
                value="software"
                className="data-[state=active]:bg-[hsl(var(--software-blue))] data-[state=active]:text-white"
              >
                <Code className="mr-2 h-4 w-4" />
                Software
              </TabsTrigger>
              <TabsTrigger
                value="cybersecurity"
                className="data-[state=active]:bg-[hsl(var(--cybersecurity-green))] data-[state=active]:text-white"
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="hr"
                className="data-[state=active]:bg-[hsl(var(--hr-purple))] data-[state=active]:text-white"
              >
                <Users className="mr-2 h-4 w-4" />
                HR
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(dashboardData).map(([key, metrics]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card enhancedHover className="overflow-hidden border-border hover:border-[hsl(var(--electric-cyan))]">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-[hsl(var(--${key === "software" ? "software-blue" : key === "cybersecurity" ? "cybersecurity-green" : "hr-purple"}))/10]`}
                          >
                            <metric.icon
                              className={`h-6 w-6 text-[hsl(var(--${key === "software" ? "software-blue" : key === "cybersecurity" ? "cybersecurity-green" : "hr-purple"}))]`}
                            />
                          </div>

                          <div className="text-4xl font-bold mb-2 flex items-center justify-center h-12">
                            <CounterAnimation target={metric.value} suffix={metric.suffix} isInView={isInView} />
                          </div>

                          <p className="text-muted-foreground">{metric.label}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

// Counter animation component
function CounterAnimation({
  target,
  suffix = "",
  isInView,
}: {
  target: number
  suffix?: string
  isInView: boolean
}) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isInView || !nodeRef.current) return

    const start = 0
    const end = target
    const duration = 2000
    const startTime = performance.now()

    const animateCount = (timestamp: number) => {
      const runtime = timestamp - startTime
      const relativeProgress = runtime / duration

      if (relativeProgress > 1) {
        if (nodeRef.current) nodeRef.current.textContent = `${end}${suffix}`
        return
      }

      // Easing function for smoother animation
      const easedProgress = 1 - Math.pow(1 - relativeProgress, 3)
      const currentCount = Math.floor(easedProgress * end)

      if (nodeRef.current) nodeRef.current.textContent = `${currentCount}${suffix}`

      requestAnimationFrame(animateCount)
    }

    requestAnimationFrame(animateCount)
  }, [isInView, target, suffix])

  return <span ref={nodeRef}>0{suffix}</span>
}
