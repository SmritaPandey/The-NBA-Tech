"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ArrowRight,
  Shield,
  Code,
  Users,
  Database,
  BarChart,
} from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[hsl(var(--deep-blue))] text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-[hsl(var(--electric-cyan))] bg-clip-text text-transparent">
                NBA TECH
              </span>
            </Link>
            <p className="text-white/70 mb-6">
              Pioneering secure digital transformation solutions for enterprises that demand excellence.
            </p>
            <div className="flex gap-4">
              <motion.a href="#" whileHover={{ y: -3 }} className="text-white/70 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a href="#" whileHover={{ y: -3 }} className="text-white/70 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a href="#" whileHover={{ y: -3 }} className="text-white/70 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a href="#" whileHover={{ y: -3 }} className="text-white/70 hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a href="#" whileHover={{ y: -3 }} className="text-white/70 hover:text-white transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#services"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Code size={16} />
                  Software Development
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Shield size={16} />
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Users size={16} />
                  HR & Training
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <BarChart size={16} />
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Database size={16} />
                  Infrastructure
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#hero" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#case-studies" className="text-white/70 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-white/70 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-white/70 mb-4">
              Subscribe to our newsletter for the latest updates on cybersecurity and tech trends.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[hsl(var(--electric-cyan))]"
              />
              <Button className="bg-[hsl(var(--electric-cyan))] hover:bg-[hsl(var(--electric-cyan))/90] text-[hsl(var(--deep-blue))]">
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">&copy; {currentYear} NBA TECH. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-white/70 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-white/70 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
