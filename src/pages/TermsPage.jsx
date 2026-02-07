
import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import './TermsPage.css';

const TermsPage = () => {
  useSEO({
    title: "Terms & Conditions | Medixra Medical Equipment Marketplace Pakistan",
    description: "Read the terms and conditions for using Medixra, Pakistan's medical equipment marketplace, including user responsibilities, prohibited listings and platform limitations.",
    canonicalUrl: "https://medixra.com/terms"
  });

  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1>Terms & Conditions</h1>
          <p className="text-gray-600">Last Updated: February 05, 2026</p>
          {/* <p className="text-xs text-red-500 mt-2">* PLACEHOLDER: FOR LAWYER REVIEW *</p> */}
        </header>

        <div className="legal-content">
          <section>
            <h2>1. Introduction & Definitions</h2>
            <p>
              Welcome to Medixra. These Terms & Conditions ("Terms") govern your use of the Medixra website and services. Medixra is an online marketplace designed to connect buyers and vendors of medical equipment within Pakistan.
            </p>
            <p><strong>Definitions:</strong></p>
            <ul>
              <li><strong>"Medixra"</strong> refers to the platform, website, and its operators.</li>
              <li><strong>"User"</strong> refers to anyone accessing the site.</li>
              <li><strong>"Vendor"</strong> refers to a user listing items for sale.</li>
              <li><strong>"Buyer"</strong> refers to a user contacting vendors or purchasing items.</li>
              <li><strong>"Service"</strong> refers to the listing and communication platform provided by Medixra.</li>
            </ul>
            <p>By accessing Medixra, you agree to be bound by these Terms, which are governed by the laws of the Islamic Republic of Pakistan.</p>
          </section>

          <section>
            <h2>2. User Eligibility & Vendor Responsibilities</h2>
            <p>To use Medixra, you must be at least 18 years old and legally capable of entering into binding contracts.</p>
            <p><strong>Vendors must:</strong></p>
            <ul>
               <li>Be legally authorized to conduct business in Pakistan.</li>
               <li>Comply with all applicable laws, including the Medical Devices Rules, 2017 enacted by DRAP.</li>
               <li>Possess all necessary licenses and registrations for the equipment they sell.</li>
               <li>Provide accurate, truthful information about the condition, origin, and specifications of equipment.</li>
               <li>Assume sole responsibility for the safety and legality of their listings.</li>
            </ul>
          </section>

          <section>
            <h2>3. Prohibited Listings</h2>
            <p>The following items are strictly prohibited on Medixra:</p>
            <ul>
              <li>Medical devices that are unregistered or banned by DRAP.</li>
              <li>Counterfeit, fake, or stolen equipment.</li>
              <li>Equipment that is unsafe, recalled, or expired.</li>
              <li>Pharmaceuticals or controlled substances.</li>
              <li>Any item that violates the laws of Pakistan.</li>
            </ul>
            <p>Medixra reserves the right to remove any listing that violates these policies without prior notice.</p>
          </section>

          <section>
            <h2>4. Role of Medixra</h2>
            <p>
              Medixra is a <strong>listing platform only</strong>. We do not manufacture, sell, own, store, or ship any medical equipment.
            </p>
            <p>
              <strong>We do not guarantee:</strong> The quality, safety, legality, or clinical effectiveness of any equipment listed. We do not verify the credentials of vendors or the authenticity of items. We are not a party to any transaction between Buyer and Vendor.
            </p>
          </section>

          <section>
            <h2>5. Buyer & Vendor Conduct</h2>
            <p>
              Users agree to conduct themselves professionally. Transactions are negotiated directly between parties (usually via WhatsApp or phone). Both parties are responsible for verifying the identity of the other and the compliance of the transaction with Pakistani law.
            </p>
          </section>

          <section>
            <h2>6. Payments, Refunds & Disputes</h2>
            <p>
              Medixra <strong>does not process payments</strong>. All financial transactions occur directly between the Buyer and Vendor off-platform.
            </p>
            <p>
              Medixra is not responsible for refunds, returns, or dispute resolution. Any issues regarding the equipment must be resolved directly between the Buyer and Vendor.
            </p>
          </section>

          <section>
            <h2>7. Limitation of Liability & Indemnity</h2>
            <p>
              To the fullest extent permitted by Pakistani law, Medixra and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of the service or the purchase of any equipment.
            </p>
            <p>
              You agree to indemnify and hold Medixra harmless from any claims, losses, or damages arising out of your violation of these Terms or your violation of any law or rights of a third party.
            </p>
          </section>

          <section>
            <h2>8. Changes to Terms & Governing Law</h2>
            <p>
              Medixra reserves the right to modify these Terms at any time. Continued use of the platform constitutes acceptance of the updated Terms.
            </p>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Pakistan.
            </p>
          </section>

          <section>
            <h2>9. Contact & Support</h2>
            <p>
              If you have any questions about these Terms, please contact us via our <Link to="/contact">Contact Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
