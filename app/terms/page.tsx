import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | NBA TECH",
  description: "Read the terms and conditions governing the use of NBA TECH's website and services.",
}

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-6">Last updated: April 20, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the NBA TECH website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Services</h2>
          <p>
            NBA TECH provides software development, cybersecurity, and digital transformation services to businesses. Our services include but are not limited to custom software development, mobile app development, web development, cybersecurity consulting, and IT infrastructure services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Use of Website</h2>
          <p>You agree to use our website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use of the website. Prohibited activities include:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Using the website in any way that violates applicable laws or regulations</li>
            <li>Attempting to gain unauthorized access to any part of the website</li>
            <li>Interfering with the proper functioning of the website</li>
            <li>Collecting user information without their consent</li>
            <li>Engaging in any activity that could damage, disable, or impair the website</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
          <p>
            All content on the NBA TECH website, including text, graphics, logos, images, and software, is the property of NBA TECH or its content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. User Content</h2>
          <p>
            By submitting content to our website (such as comments, feedback, or project information), you grant NBA TECH a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute that content for any purpose.
          </p>
          <p>
            You represent and warrant that you own or have the necessary rights to the content you submit and that it does not violate the rights of any third party.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Service Agreements</h2>
          <p>
            Our professional services are governed by separate service agreements. These Terms of Service do not replace or supersede any terms in those agreements. In case of conflict between these Terms and a service agreement, the service agreement shall prevail.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Disclaimer of Warranties</h2>
          <p>
            THE NBA TECH WEBSITE AND SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NBA TECH DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            NBA TECH DOES NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE WEBSITE OR SERVER ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL NBA TECH BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE USE OF THE WEBSITE OR SERVICES, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, EVEN IF NBA TECH HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless NBA TECH and its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from your use of the website, violation of these Terms, or infringement of any intellectual property or other right of any person or entity.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
          <p>
            NBA TECH reserves the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website. Your continued use of the website after such changes constitutes your acceptance of the new Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Wyoming, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Sheridan County, Wyoming.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
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
