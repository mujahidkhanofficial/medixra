
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Target, Shield, AlertTriangle, Building, Users } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  useSEO({
    title: "About Medixra – Pakistan's Medical Equipment Marketplace",
    description: "Medixra is an online marketplace that connects healthcare providers and vendors of medical equipment in Pakistan. We provide a platform for listings and direct contact, not payments or shipping.",
    canonicalUrl: "https://medixra.com/about"
  });

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container-base">
          <h1>About Medixra</h1>
          <p className="mission-statement">
            "Connecting Pakistan's healthcare professionals with trusted medical equipment suppliers through a transparent, efficient, and secure digital marketplace."
          </p>
        </div>
      </section>

      {/* What is Medixra */}
      <section className="about-content-section">
        <div className="container-base">
          <div className="split-section">
            <div>
              <h2 className="mb-4 text-teal-800 flex items-center gap-2">
                <Building className="w-6 h-6" /> What is Medixra?
              </h2>
              <p className="mb-4">
                Medixra is Pakistan's first dedicated online marketplace specifically designed for the buying and selling of new, used, and refurbished medical equipment. We provide a digital bridge between equipment vendors—from Karachi to Khyber—and the doctors, clinics, diagnostic centers, and hospitals that need reliable machinery.
              </p>
              <p>
                In a market often fragmented by geography and lack of information, Medixra centralizes listings to provide transparency in pricing, availability, and specifications, helping modernize Pakistan's healthcare infrastructure.
              </p>
            </div>
            <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center overflow-hidden border border-gray-200 shadow-md">
               {/* Placeholder for localized image */}
              <div className="text-center p-6 text-gray-500">
                <Building size={64} className="mx-auto mb-4 opacity-50" />
                <p>Connecting Buyers & Sellers across Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="about-content-section bg-gray-50">
        <div className="container-base text-center">
          <h2 className="mb-8 text-teal-800">Our Mission</h2>
          <div className="feature-cards-grid">
            <div className="feature-card">
              <Target className="w-12 h-12 text-teal-600 mx-auto" />
              <h3>Access & Affordability</h3>
              <p>To make quality medical technology accessible to every facility in Pakistan, regardless of size or location.</p>
            </div>
            <div className="feature-card">
              <Shield className="w-12 h-12 text-teal-600 mx-auto" />
              <h3>Trust & Transparency</h3>
              <p>To foster a marketplace built on verified profiles and clear information, reducing the risks in equipment procurement.</p>
            </div>
            <div className="feature-card">
              <Users className="w-12 h-12 text-teal-600 mx-auto" />
              <h3>Empowerment</h3>
              <p>To empower local vendors to reach a national audience while helping doctors find exactly what they need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="about-content-section">
        <div className="container-base">
          <h2 className="mb-6 text-teal-800 text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-teal-700">For Buyers (Doctors/Hospitals)</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Browse thousands of listings for new and used equipment.</li>
                <li>Filter by city, specialty, or category to find specific items.</li>
                <li>Check vendor profiles and verification status.</li>
                <li>Connect directly via WhatsApp to negotiate and purchase.</li>
                <li>Verify equipment condition before finalizing deals.</li>
              </ul>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-teal-700">For Vendors</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Create a professional vendor profile.</li>
                <li>List inventory with photos, prices, and technical specs.</li>
                <li>Reach buyers across Pakistan instantly.</li>
                <li>Receive direct inquiries from serious leads.</li>
                <li>Manage your listings and reputation easily.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Are Not & Responsibility */}
      <section className="about-content-section bg-amber-50 border-t border-amber-100">
        <div className="container-base">
          <div className="split-section">
             <div>
                <h2 className="mb-4 text-amber-800 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" /> What We Are Not
                </h2>
                <p className="mb-4 text-gray-800">
                  <strong>Important:</strong> Medixra is an online listing platform (marketplace). 
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                  <li>We do <strong>not</strong> sell, own, manufacture, or warehouse any medical equipment.</li>
                  <li>We do <strong>not</strong> handle shipping, logistics, or payments.</li>
                  <li>We do <strong>not</strong> verify the physical condition or functionality of listed items.</li>
                </ul>
             </div>
             <div>
                <h2 className="mb-4 text-amber-800">Responsibility & Compliance</h2>
                <p className="mb-4 text-gray-700">
                  We provide the technology to connect people, but the transactions happen directly between the Buyer and the Vendor.
                </p>
                <p className="text-gray-700">
                   Both Vendors and Buyers are responsible for complying with all applicable Pakistani laws and regulations, including those set by the Drug Regulatory Authority of Pakistan (DRAP), regarding the sale, purchase, and use of medical devices.
                </p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
