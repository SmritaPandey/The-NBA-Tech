"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { TiltCard } from "@/components/ui/tilt-card"
import { ProgressiveImage } from "@/components/ui/progressive-image"
import {
  ExternalLink,
  Github,
  Users,
  ArrowRight,
  ChevronRight,
  Code,
  Database,
  Server,
  Smartphone,
  Globe,
  Layers,
} from "lucide-react"

// Case studies data
const caseStudies = [
  {
    id: "nittr",
    title: "NITTR Hostel Management",
    category: "web",
    thumbnail: "/placeholder.svg?height=300&width=500",
    description: "Comprehensive hostel management system with student portal and admin dashboard.",
    techStack: ["Java", "Spring Boot", "Angular", "Firebase", "SQL"],
    stats: {
      users: "1000+",
      launch: "Q2 2023",
      uptime: "99.9%",
    },
    details: {
      challenge:
        "The client needed a centralized system to manage hostel allocations, maintenance requests, and student records across multiple campuses.",
      solution:
        "We developed a full-stack application with role-based access control, real-time notifications, and comprehensive reporting features.",
      impact: "Reduced administrative overhead by 40% and improved student satisfaction scores by 35%.",
      screenshots: ["/placeholder.svg?height=400&width=700", "/placeholder.svg?height=400&width=700"],
      techFlow: [
        { name: "Java", icon: Code, description: "Backend core language" },
        { name: "Spring Boot", icon: Server, description: "API framework" },
        { name: "Angular", icon: Globe, description: "Frontend framework" },
        { name: "Firebase", icon: Database, description: "Real-time database" },
      ],
    },
  },
  {
    id: "apna-agri",
    title: "Apna Agri Store",
    category: "web",
    thumbnail: "/placeholder.svg?height=300&width=500",
    description: "E-commerce platform connecting farmers directly with consumers.",
    techStack: ["HTML/CSS/JS", "jQuery", "Flask", "Jinja2", "FastAPI"],
    stats: {
      users: "5K+",
      launch: "Q3 2023",
      transactions: "10K+",
    },
    details: {
      challenge:
        "Small-scale farmers needed a direct-to-consumer platform to sell produce without intermediaries cutting into their profits.",
      solution:
        "We built a marketplace with location-based search, inventory management, and secure payment processing.",
      impact: "Increased farmer profits by 25% and reduced food waste by connecting local producers with consumers.",
      screenshots: ["/placeholder.svg?height=400&width=700", "/placeholder.svg?height=400&width=700"],
      techFlow: [
        { name: "HTML/CSS/JS", icon: Code, description: "Frontend foundation" },
        { name: "jQuery", icon: Globe, description: "DOM manipulation" },
        { name: "Flask", icon: Server, description: "Web framework" },
        { name: "FastAPI", icon: Server, description: "API endpoints" },
      ],
    },
  },
  {
    id: "arthpay",
    title: "ArthPay Merchant App",
    category: "mobile",
    thumbnail: "/placeholder.svg?height=300&width=500",
    description: "Mobile wallet and payment processing solution for small businesses.",
    techStack: ["React Native", "Node.js", "MongoDB", "Firebase"],
    stats: {
      merchants: "2K+",
      launch: "Q1 2024",
      transactions: "100K+",
    },
    details: {
      challenge:
        "Small merchants needed an affordable, easy-to-use payment solution that works in areas with limited connectivity.",
      solution:
        "We developed a React Native app with offline capabilities, QR code payments, and simplified onboarding.",
      impact:
        "Enabled 2,000+ small businesses to accept digital payments, increasing their revenue by an average of 30%.",
      screenshots: ["/placeholder.svg?height=400&width=700", "/placeholder.svg?height=400&width=700"],
      techFlow: [
        { name: "React Native", icon: Smartphone, description: "Cross-platform mobile" },
        { name: "Node.js", icon: Server, description: "Backend runtime" },
        { name: "MongoDB", icon: Database, description: "NoSQL database" },
        { name: "Firebase", icon: Database, description: "Authentication & storage" },
      ],
    },
  },
  {
    id: "orms",
    title: "ORMS Revenue Monitoring",
    category: "mobile",
    thumbnail: "/placeholder.svg?height=300&width=500",
    description: "Real-time revenue tracking and analytics for franchise businesses.",
    techStack: ["React Native", "GraphQL", "AWS", "PostgreSQL"],
    stats: {
      clients: "50+",
      launch: "Q4 2023",
      dataPoints: "1M+/day",
    },
    details: {
      challenge:
        "Franchise owners needed real-time visibility into sales performance across multiple locations with actionable insights.",
      solution:
        "We created a mobile-first analytics platform with customizable dashboards, alerts, and predictive forecasting.",
      impact: "Helped clients identify $2.5M in revenue opportunities through data-driven decision making.",
      screenshots: ["/placeholder.svg?height=400&width=700", "/placeholder.svg?height=400&width=700"],
      techFlow: [
        { name: "React Native", icon: Smartphone, description: "Mobile app framework" },
        { name: "GraphQL", icon: Code, description: "API query language" },
        { name: "AWS", icon: Server, description: "Cloud infrastructure" },
        { name: "PostgreSQL", icon: Database, description: "Relational database" },
      ],
    },
  },
  {
    id: "hilarious-life",
    title: "Hilarious Life Portfolio",
    category: "web",
    thumbnail: "/placeholder.svg?height=300&width=500",
    description: "Creative portfolio site with interactive storytelling elements.",
    techStack: ["Next.js", "Three.js", "GSAP", "Tailwind CSS"],
    stats: {
      visitors: "10K+",
      launch: "Q2 2023",
      engagement: "4.5 min avg",
    },
    details: {
      challenge:
        "The client wanted a portfolio that would showcase their creative work in an engaging, memorable way that reflected their personality.",
      solution:
        "We designed an immersive experience with 3D elements, scroll-based animations, and interactive storytelling components.",
      impact: "Increased client inquiries by 200% and won an industry design award for innovative UX.",
      screenshots: ["/placeholder.svg?height=400&width=700", "/placeholder.svg?height=400&width=700"],
      techFlow: [
        { name: "Next.js", icon: Globe, description: "React framework" },
        { name: "Three.js", icon: Layers, description: "3D visualization" },
        { name: "GSAP", icon: Code, description: "Animation library" },
        { name: "Tailwind", icon: Code, description: "CSS framework" },
      ],
    },
  },
  {
    id: "panchdharma",
    title: "Panchdharma Foundation",
    category: "web",
    thumbnail: "/placeholder.svg?height=300&width=500",
    description: "Trilogy of interconnected sites for a non-profit organization.",
    techStack: ["WordPress", "PHP", "MySQL", "JavaScript"],
    stats: {
      reach: "15K+",
      launch: "Q3 2022",
      donations: "+45%",
    },
    details: {
      challenge:
        "The foundation needed to present their three initiatives (Vision, Power, Foundation) in a cohesive yet distinct way to different audience segments.",
      solution:
        "We developed a trilogy of interconnected sites with shared authentication, donation processing, and content management.",
      impact: "Increased online donations by 45% and volunteer applications by 60% through improved digital presence.",
      screenshots: ["/placeholder.svg?height=400&width=700", "/placeholder.svg?height=400&width=700"],
      techFlow: [
        { name: "WordPress", icon: Globe, description: "CMS platform" },
        { name: "PHP", icon: Code, description: "Server-side language" },
        { name: "MySQL", icon: Database, description: "Database" },
        { name: "JavaScript", icon: Code, description: "Frontend interactivity" },
      ],
    },
  },
  {
    id: "bookmy-flower",
    title: "BookMyFlower",
    category: "crm",
    thumbnail: "/placeholder.svg?height=300&width=500",
    description: "E-commerce and CRM solution for a flower delivery service.",
    techStack: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    stats: {
      orders: "5K+",
      launch: "Q1 2023",
      retention: "65%",
    },
    details: {
      challenge:
        "The client needed an e-commerce platform with advanced CRM features to manage seasonal demand and build customer loyalty.",
      solution:
        "We implemented a custom WooCommerce solution with subscription options, occasion reminders, and personalized recommendations.",
      impact:
        "Achieved 65% customer retention rate and 40% increase in average order value through CRM-driven personalization.",
      screenshots: ["/placeholder.svg?height=400&width=700", "/placeholder.svg?height=400&width=700"],
      techFlow: [
        { name: "WordPress", icon: Globe, description: "CMS platform" },
        { name: "WooCommerce", icon: Globe, description: "E-commerce plugin" },
        { name: "PHP", icon: Code, description: "Server-side language" },
        { name: "MySQL", icon: Database, description: "Database" },
      ],
    },
  },
  {
    id: "sitapur",
    title: "Sitapur Netralaya",
    category: "enterprise",
    thumbnail: "/placeholder.svg?height=300&width=500",
    description: "Patient management portal for an eye care clinic.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express"],
    stats: {
      patients: "20K+",
      launch: "Q4 2022",
      efficiency: "+30%",
    },
    details: {
      challenge:
        "The clinic needed to digitize their patient records, appointment scheduling, and follow-up processes to improve care coordination.",
      solution:
        "We built a comprehensive portal with electronic health records, appointment management, and automated follow-up communications.",
      impact:
        "Reduced administrative time by 30% and decreased missed appointments by 45% through automated reminders.",
      screenshots: ["/placeholder.svg?height=400&width=700", "/placeholder.svg?height=400&width=700"],
      techFlow: [
        { name: "React.js", icon: Globe, description: "Frontend library" },
        { name: "Node.js", icon: Server, description: "Backend runtime" },
        { name: "MongoDB", icon: Database, description: "NoSQL database" },
        { name: "Express", icon: Server, description: "Web framework" },
      ],
    },
  },
]

export function CaseStudiesSection() {
  const [selectedCase, setSelectedCase] = useState<(typeof caseStudies)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({ target: ref })
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  // For the sticky project navigator
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Update active project based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!isDialogOpen || !selectedCase) return

      const scrollPosition = window.scrollY + 100 // Offset for better UX

      // Find the project section that's currently in view
      const projectIds = Object.keys(projectRefs.current)
      for (const id of projectIds) {
        const element = projectRefs.current[id]
        if (!element) continue

        const { top, bottom } = element.getBoundingClientRect()
        if (top <= scrollPosition && bottom > scrollPosition) {
          setActiveProject(id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDialogOpen, selectedCase])

  return (
    <section id="case-studies" className="pt-32 pb-20 bg-background relative overflow-hidden" ref={ref}>
      {/* Background data stream animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <ClientOnlyDataStreams />
      </div>

      <motion.div className="container mx-auto relative z-10" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries and technologies.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger
                value="all"
                className="rounded-md data-[state=active]:bg-[hsl(var(--electric-cyan))] data-[state=active]:text-black"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger
                value="web"
                className="rounded-md data-[state=active]:bg-[hsl(var(--electric-cyan))] data-[state=active]:text-black"
              >
                Web
              </TabsTrigger>
              <TabsTrigger
                value="mobile"
                className="rounded-md data-[state=active]:bg-[hsl(var(--electric-cyan))] data-[state=active]:text-black"
              >
                Mobile
              </TabsTrigger>
              <TabsTrigger
                value="crm"
                className="rounded-md data-[state=active]:bg-[hsl(var(--electric-cyan))] data-[state=active]:text-black"
              >
                CRM
              </TabsTrigger>
              <TabsTrigger
                value="enterprise"
                className="rounded-md data-[state=active]:bg-[hsl(var(--electric-cyan))] data-[state=active]:text-black"
              >
                Enterprise
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <ProjectGrid
              projects={caseStudies}
              setSelectedCase={setSelectedCase}
              setIsDialogOpen={setIsDialogOpen}
              isInView={isInView}
            />
          </TabsContent>

          {["web", "mobile", "crm", "enterprise"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <ProjectGrid
                projects={caseStudies.filter((cs) => cs.category === category)}
                setSelectedCase={setSelectedCase}
                setIsDialogOpen={setIsDialogOpen}
                isInView={isInView}
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Case Study Detail Dialog */}
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setSelectedCase(null)
          }}
        >
          <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
            {selectedCase && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedCase.title}</DialogTitle>
                  <DialogDescription>{selectedCase.description}</DialogDescription>
                </DialogHeader>

                <div className="mt-6">
                  {/* Sticky Project Navigator */}
                  <div className="hidden md:block sticky top-4 left-0 w-48 float-left mr-6 bg-card rounded-lg border border-border p-3 shadow-md">
                    <h4 className="text-sm font-semibold mb-2">Project Sections</h4>
                    <ul className="space-y-1">
                      {["overview", "challenge", "solution", "tech-stack", "impact"].map((section) => (
                        <li key={section}>
                          <a
                            href={`#${section}`}
                            className={`text-sm flex items-center py-1 px-2 rounded-md transition-colors ${
                              activeProject === section
                                ? "bg-[hsl(var(--electric-cyan))/10] text-[hsl(var(--electric-cyan))]"
                                : "hover:bg-muted"
                            }`}
                            onClick={(e) => {
                              e.preventDefault()
                              document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
                              setActiveProject(section)
                            }}
                          >
                            <ChevronRight
                              className={`h-3 w-3 mr-1 transition-transform ${
                                activeProject === section ? "rotate-90" : ""
                              }`}
                            />
                            {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Overview Section */}
                  <div id="overview" ref={(el) => (projectRefs.current["overview"] = el)} className="mb-8">
                    {/* Hero Carousel */}
                    <Carousel className="w-full mb-8">
                      <CarouselContent>
                        {selectedCase.details.screenshots.map((screenshot, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <div className="overflow-hidden rounded-xl">
                                <ProgressiveImage
                                  src={screenshot || "/placeholder.svg"}
                                  alt={`${selectedCase.title} screenshot ${index + 1}`}
                                  className="w-full h-auto aspect-video"
                                />
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>

                    {/* Tech Stack Ribbon */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3">Technology Stack</h3>
                      <div className="bg-muted/30 rounded-lg p-6 relative overflow-hidden">
                        {/* Tech Flow Animation */}
                        <div className="flex justify-between items-center relative z-10">
                          {selectedCase.details.techFlow.map((tech, index) => (
                            <motion.div
                              key={index}
                              className="flex flex-col items-center text-center"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                              <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-2 shadow-sm border border-[hsl(var(--electric-cyan))/30] group-hover:border-[hsl(var(--electric-cyan))]">
                                <tech.icon className="h-8 w-8 text-[hsl(var(--electric-cyan))] group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <span className="font-medium">{tech.name}</span>
                              <span className="text-xs text-muted-foreground">{tech.description}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Connecting Lines */}
                        <svg
                          className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 z-0"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <motion.line
                            x1="0"
                            y1="0"
                            x2="100%"
                            y2="0"
                            stroke="hsl(var(--electric-cyan))"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Challenge Section */}
                  <div id="challenge" ref={(el) => (projectRefs.current["challenge"] = el)} className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">Challenge</h3>
                    <Card enhancedHover>
                      <CardContent className="pt-6">
                        <p className="text-muted-foreground">{selectedCase.details.challenge}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Solution Section */}
                  <div id="solution" ref={(el) => (projectRefs.current["solution"] = el)} className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">Solution</h3>
                    <Card enhancedHover>
                      <CardContent className="pt-6">
                        <p className="text-muted-foreground">{selectedCase.details.solution}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Tech Stack Section */}
                  <div id="tech-stack" ref={(el) => (projectRefs.current["tech-stack"] = el)} className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedCase.techStack.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Badge
                            variant="outline"
                            className="px-3 py-1.5 bg-muted/50 hover:bg-muted transition-colors text-sm"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Section */}
                  <div id="impact" ref={(el) => (projectRefs.current["impact"] = el)} className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">Impact</h3>
                    <div className="bg-muted/30 rounded-lg p-6 mb-8">
                      <p className="text-muted-foreground mb-6">{selectedCase.details.impact}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {Object.entries(selectedCase.stats).map(([key, value], index) => (
                          <motion.div
                            key={key}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          >
                            <div className="text-2xl font-bold text-[hsl(var(--electric-cyan))]">{value}</div>
                            <div className="text-sm text-muted-foreground capitalize">{key}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 justify-end">
                    <Button variant="outline" className="gap-2 relative overflow-hidden group border border-[hsl(var(--electric-cyan))/30] hover:border-[hsl(var(--electric-cyan))]">
                      <span className="relative z-10 flex items-center gap-2">
                        <Github className="h-4 w-4 text-[hsl(var(--electric-cyan))]" />
                        View Code
                      </span>
                      <span className="absolute inset-0 bg-[hsl(var(--electric-cyan))/10] scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-md" />
                    </Button>
                    <Button variant="gradient" className="gap-2 relative overflow-hidden group bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(195,85%,45%)] hover:from-[hsl(195,85%,45%)] hover:to-[hsl(var(--electric-cyan))] text-[hsl(var(--deep-blue))] transition-all duration-300">
                      <span className="relative z-10 flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View Live
                      </span>
                      <span className="absolute inset-0 bg-[hsl(var(--deep-blue))/10] scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-md" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </section>
  )
}

function ProjectGrid({
  projects,
  setSelectedCase,
  setIsDialogOpen,
  isInView,
}: {
  projects: typeof caseStudies
  setSelectedCase: (project: (typeof caseStudies)[0]) => void
  setIsDialogOpen: (open: boolean) => void
  isInView: boolean
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="case-study-card perspective"
          >
            <TiltCard
              className="h-full relative group cursor-pointer"
              tiltAmount={5}
              glareAmount={0.3}
              onClick={() => {
                setSelectedCase(project)
                setIsDialogOpen(true)
              }}
            >
              <Card enhancedHover className="h-full overflow-hidden border-[hsl(var(--electric-cyan))/20] group-hover:border-[hsl(var(--electric-cyan))/50] transition-all duration-300">
                <div className="overflow-hidden">
                  <ProgressiveImage
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Quick-stats overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--deep-blue))/90] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold">{project.title}</h3>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="bg-white/10 backdrop-blur-sm rounded-md p-1 text-center">
                          <div className="text-white text-sm font-medium">{value}</div>
                          <div className="text-white/70 text-xs">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl bg-gradient-to-r from-[hsl(var(--deep-blue))] to-[hsl(var(--electric-cyan))] bg-clip-text text-transparent dark:from-[hsl(var(--electric-cyan))] dark:to-[hsl(210,40%,90%)]">{project.title}</CardTitle>
                    <Badge variant="outline" className="capitalize">
                      {project.category}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="pb-2">
                  <motion.div
                    className="flex flex-wrap gap-1 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs font-normal">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge variant="secondary" className="text-xs font-normal">
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </motion.div>
                </CardContent>

                <CardFooter>
                  <div className="w-full flex justify-between items-center text-sm font-medium text-muted-foreground hover:text-[hsl(var(--electric-cyan))] group relative z-10 border-t border-[hsl(var(--electric-cyan))/20] pt-3">
                    View Case Study
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-[hsl(var(--electric-cyan))]" />
                  </div>
                </CardFooter>
              </Card>
            </TiltCard>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No projects found in this category.</p>
        </div>
      )}
    </div>
  )
}

// Client-only component to prevent hydration errors with random paths
function ClientOnlyDataStreams() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  // Generate fixed paths to avoid hydration mismatch
  const paths = [
    "M 396 698 Q 850 63, 856 321",
    "M 38 221 Q 473 52, 837 412",
    "M 709 680 Q 755 455, 428 112",
    "M 706 98 Q 635 210, 115 543",
    "M 575 635 Q 479 953, 675 321",
    "M 312 499 Q 368 501, 428 321",
    "M 645 851 Q 164 514, 814 123",
    "M 43 709 Q 148 522, 708 321",
    "M 148 406 Q 787 779, 159 123",
    "M 843 205 Q 343 978, 653 321",
    "M 300 141 Q 296 871, 37 321",
    "M 232 180 Q 797 111, 431 321",
    "M 730 446 Q 261 954, 568 321",
    "M 271 542 Q 91 465, 594 321",
    "M 578 921 Q 540 613, 879 321"
  ]

  return (
    <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      {paths.map((path, i) => (
        <motion.path
          key={i}
          d={path}
          fill="none"
          stroke="hsl(var(--electric-cyan))"
          strokeWidth="1"
          strokeDasharray="5,10"
          initial={{ pathLength: 0, opacity: 0.1 }}
          animate={{ pathLength: 1, opacity: [0.1, 0.3, 0.1] }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: i * 0.5,
          }}
        />
      ))}
    </svg>
  )
}
