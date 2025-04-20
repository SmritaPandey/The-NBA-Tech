import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | NBA TECH",
  description: "Learn about how NBA TECH uses cookies and similar technologies on our website.",
}

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-6">Last updated: April 20, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            This Cookie Policy explains how NBA TECH ("we," "our," or "us") uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this policy.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Types of Cookies We Use</h2>
          <p>We use the following types of cookies on our website:</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Preference Cookies</h3>
          <p>
            These cookies allow the website to remember choices you make (such as your preferred language or the region you are in) and provide enhanced, more personal features. They may also be used to provide services you have requested, such as watching a video or commenting on a blog.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Marketing Cookies</h3>
          <p>
            These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website and deliver advertisements on and through the website. These third parties may include:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Google Analytics</li>
            <li>Google Ads</li>
            <li>Facebook</li>
            <li>LinkedIn</li>
            <li>HubSpot</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
          </p>
          <p>
            To manage cookies in different browsers, please refer to the following links:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-600 hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will become effective when we post the revised policy on our website. We encourage you to periodically review this page for the latest information on our cookie practices.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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
