"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { FilloutStandardEmbed } from "@fillout/react"
import "@fillout/react/style.css"
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
  // Using a specific Fillout.com form ID for newsletter subscriptions
  const newsletterFormId = "3tKPUffptcus" // Newsletter subscription form

  return (
    <footer className="bg-[hsl(var(--deep-blue))] text-[hsl(var(--primary-foreground))] pt-16 pb-8"> {/* Changed text-white */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              {/* Changed from-white */}
              <span className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary-foreground))] to-[hsl(var(--electric-cyan))] bg-clip-text text-transparent">
                NBA TECH
              </span>
            </Link>
            {/* Changed text-white/70 */}
            <p className="text-[hsla(var(--primary-foreground),0.7)] mb-6">
              Delivering high-impact software solutions and cybersecurity services that transform businesses. Trusted by industry leaders since 2018 for innovation, security, and measurable results.
            </p>
            <div className="flex gap-4">
              {/* Changed text-white/70 hover:text-white */}
              <motion.a href="https://www.facebook.com/thenbatech" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a href="https://twitter.com/thenbatech" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a href="https://www.instagram.com/thenbatech" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a href="https://www.linkedin.com/company/nbatech" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a href="https://github.com/nbatech" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3> {/* Will inherit themed text color */}
            <ul className="space-y-3">
              <li>
                <Link
                  href="#services"
                  className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors flex items-center gap-2"
                >
                  <Code size={16} />
                  Software Development
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors flex items-center gap-2"
                >
                  <Shield size={16} />
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors flex items-center gap-2"
                >
                  <Users size={16} />
                  HR & Training
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors flex items-center gap-2"
                >
                  <BarChart size={16} />
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors flex items-center gap-2"
                >
                  <Database size={16} />
                  Infrastructure
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3> {/* Will inherit themed text color */}
            <ul className="space-y-3">
              <li>
                <Link href="/#hero" className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#case-studies" className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Exclusive Insights</h3> {/* Will inherit themed text color */}
            <p className="text-[hsla(var(--primary-foreground),0.7)] mb-4">
              Join industry leaders receiving our monthly tech briefing with actionable strategies, security alerts, and exclusive content not published anywhere else.
            </p>
            <button
              className="w-full bg-[hsl(var(--electric-cyan))] hover:bg-[hsl(var(--electric-cyan))/90] text-[hsl(var(--deep-blue))] px-4 py-2 rounded-md flex items-center justify-center"
              onClick={() => {
                // Create modal for the form
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';

                // Create modal content
                const modalContent = document.createElement('div');
                modalContent.className = 'bg-white rounded-lg p-4 w-full max-w-2xl max-h-[90vh] overflow-auto relative';

                // Create close button
                const closeButton = document.createElement('button');
                closeButton.className = 'absolute top-2 right-2 text-gray-500 hover:text-gray-800';
                closeButton.innerHTML = '✕';
                closeButton.onclick = () => document.body.removeChild(modal);

                // Create form container
                const formContainer = document.createElement('div');
                formContainer.style.width = '100%';
                formContainer.style.height = '500px';
                formContainer.setAttribute('data-fillout-id', newsletterFormId);
                formContainer.setAttribute('data-fillout-embed-type', 'standard');
                formContainer.setAttribute('data-fillout-inherit-parameters', '');
                formContainer.setAttribute('data-fillout-dynamic-resize', '');

                // Add elements to the DOM
                modalContent.appendChild(closeButton);
                modalContent.appendChild(formContainer);
                modal.appendChild(modalContent);
                document.body.appendChild(modal);

                // Load the Fillout script
                const script = document.createElement('script');
                script.src = 'https://server.fillout.com/embed/v1/';
                document.body.appendChild(script);

                // Close modal when clicking outside
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) {
                    document.body.removeChild(modal);
                  }
                });
              }}
            >
              <ArrowRight size={16} className="mr-2" />
              Subscribe
            </button>
          </div>
        </div>

        <Separator className="bg-[hsla(var(--primary-foreground),0.1)] my-8" /> {/* Changed bg-white/10 */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[hsla(var(--primary-foreground),0.7)] text-sm">&copy; {currentYear} NBA TECH. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-[hsla(var(--primary-foreground),0.7)] hover:text-[hsl(var(--primary-foreground))] text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
