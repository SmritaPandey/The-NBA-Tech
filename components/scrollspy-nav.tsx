"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MoonStar, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

const navItems = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "case-studies", label: "Our Work" },
  { id: "timeline", label: "Journey" },
  { id: "contact", label: "Contact" },
]

export function ScrollspyNav() {
  const [activeSection, setActiveSection] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state for background opacity
      setScrolled(window.scrollY > 50)

      // Find the active section
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100 // Offset for better UX

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section) {
          const sectionTop = section.offsetTop
          if (scrollPosition >= sectionTop) {
            setActiveSection(navItems[i].id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Add extra offset for case-studies section
      const extraOffset = id === 'case-studies' ? 150 : 80

      window.scrollTo({
        top: element.offsetTop - extraOffset, // Offset for the sticky header
        behavior: "smooth",
      })
    }
  }

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-md dark:bg-background/90"
          : "bg-transparent"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <motion.div
              className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--deep-blue))] to-[hsl(var(--electric-cyan))] bg-clip-text text-transparent dark:from-[hsl(var(--electric-cyan))] dark:to-[hsl(210,40%,90%)] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              NBA TECH
            </motion.div>
          </Link>
        </div>

        <nav className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            item.id === "hero" ? (
              <Link href="/" key={item.id}>
                <motion.div
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors relative cursor-pointer",
                    activeSection === item.id
                      ? "text-[hsl(var(--electric-cyan))]"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--electric-cyan))]"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ) : (
              <motion.button
                key={item.id}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors relative",
                  activeSection === item.id
                    ? "text-[hsl(var(--electric-cyan))]"
                    : "text-foreground/70 hover:text-foreground"
                )}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--electric-cyan))]"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9 theme-toggle-wrapper"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonStar className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="accent"
            size="sm"
            className="bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(195,85%,45%)] hover:from-[hsl(195,85%,45%)] hover:to-[hsl(var(--electric-cyan))] text-[hsl(var(--deep-blue))] shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => scrollToSection('contact')}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
