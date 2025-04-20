import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | NBA TECH",
  description: "Learn about how NBA TECH collects, uses, and protects your personal information.",
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-6">Last updated: April 20, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            At NBA TECH ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Fill out forms on our website</li>
            <li>Subscribe to our newsletter</li>
            <li>Request a consultation</li>
            <li>Contact us via email or phone</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p>The types of information we may collect include:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Name, email address, phone number, and company name</li>
            <li>Information about your business and project requirements</li>
            <li>Technical information such as IP address, browser type, and device information</li>
            <li>Usage data including pages visited, time spent on pages, and links clicked</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Provide, maintain, and improve our services</li>
            <li>Process and respond to your inquiries and requests</li>
            <li>Send you technical notices, updates, and administrative messages</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Service providers who perform services on our behalf</li>
            <li>Professional advisors such as lawyers, accountants, and insurers</li>
            <li>Regulatory authorities, law enforcement, and others as required by law</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction or objection to processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p>To exercise these rights, please contact us using the information provided below.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date, and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy frequently to stay informed about how we are protecting your information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our practices, please contact us at:
          </p>
          <p className="mb-6">
            NBA TECH<br />
            30 N Gould St Ste R<br />
            Sheridan, WY 82801<br />
            Email: support@thenbatech.com<br />
            Phone: +91 8840592989
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
