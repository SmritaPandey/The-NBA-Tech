import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: "NBA TECH - Enterprise Software Solutions & Cybersecurity Services",
  description: "Custom software development, cybersecurity solutions, and digital transformation services for businesses. Trusted by industry leaders to deliver measurable ROI and competitive advantage.",
  keywords: "software development, cybersecurity, digital transformation, enterprise solutions, custom software, IT consulting, secure applications, business technology, Wyoming tech company",
  authors: [{ name: "NBA TECH LLC" }],
  creator: "NBA TECH",
  publisher: "NBA TECH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://thenbatech.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "NBA TECH - Enterprise Software Solutions & Cybersecurity",
    description: "Custom software development and cybersecurity solutions that drive business growth and protect your digital assets.",
    url: 'https://thenbatech.com',
    siteName: 'NBA TECH',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NBA TECH - Enterprise Software Solutions",
    description: "Custom software development and cybersecurity solutions that drive business growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "NBA TECH",
              "url": "https://thenbatech.com",
              "logo": "https://thenbatech.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/thenbatech",
                "https://twitter.com/thenbatech",
                "https://www.linkedin.com/company/nbatech",
                "https://www.instagram.com/thenbatech"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-8840592989",
                "contactType": "customer service",
                "email": "support@thenbatech.com",
                "areaServed": "Worldwide",
                "availableLanguage": ["English", "Hindi"]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "30 N Gould St Ste R",
                "addressLocality": "Sheridan",
                "addressRegion": "WY",
                "postalCode": "82801",
                "addressCountry": "US"
              },
              "description": "Custom software development, cybersecurity solutions, and digital transformation services for businesses. Trusted by industry leaders to deliver measurable ROI and competitive advantage."
            })
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'