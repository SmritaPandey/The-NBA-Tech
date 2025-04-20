"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Our Work", href: "#case-studies" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-background/80 backdrop-blur-md py-2 shadow-sm border-b border-[hsl(var(--electric-cyan))/20]"
            : "bg-transparent py-4",
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(195,85%,45%)] flex items-center justify-center">
              <span className="text-[hsl(var(--deep-blue))] text-xs font-bold">NT</span>
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-[hsl(var(--deep-blue))] to-[hsl(var(--electric-cyan))] bg-clip-text text-transparent dark:from-[hsl(var(--electric-cyan))] dark:to-[hsl(210,40%,90%)]">NBA TECH</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="enhanced-link text-foreground/80 hover:text-[hsl(var(--electric-cyan))] transition-colors relative group"
                style={{
                  backgroundImage: "linear-gradient(to right, hsl(var(--electric-cyan)), hsl(var(--electric-cyan)))",
                  backgroundSize: "0% 2px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left bottom",
                  transition: "background-size 0.3s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundSize = "100% 2px"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundSize = "0% 2px"}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="theme-toggle-wrapper">
              <ModeToggle />
            </div>
            <Button
              variant="gradient"
              className="hidden md:flex shadow-sm hover:shadow-md bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(195,85%,45%)] hover:from-[hsl(195,85%,45%)] hover:to-[hsl(var(--electric-cyan))] text-[hsl(var(--deep-blue))] transition-all duration-300"
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Get Started
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[hsl(var(--electric-cyan))]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-md pt-20"
          >
            <nav className="container mx-auto flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground py-3 px-4 text-lg border-b border-[hsl(var(--electric-cyan))/20] hover:bg-[hsl(var(--electric-cyan))/10] hover:text-[hsl(var(--electric-cyan))] transition-colors rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-4 mt-4 p-3 bg-muted/50 rounded-md">
                <span className="text-sm text-muted-foreground">Toggle theme:</span>
                <ModeToggle />
              </div>
              <Button
                variant="gradient"
                className="mt-4 shadow-sm hover:shadow-md bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(195,85%,45%)] hover:from-[hsl(195,85%,45%)] hover:to-[hsl(var(--electric-cyan))] text-[hsl(var(--deep-blue))] transition-all duration-300"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }, 300)
                }}
              >
                Get Started
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
