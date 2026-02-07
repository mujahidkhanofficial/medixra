
import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import './PrivacyPage.css';

const PrivacyPage = () => {
  useSEO({
    title: "Privacy Policy | Medixra – Medical Equipment Marketplace",
    description: "Learn how Medixra collects, uses and protects your personal data, including contact details and listing information, when using our medical equipment marketplace.",
    canonicalUrl: "https://medixra.com/privacy"
  });

  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1>Privacy Policy</h1>
          <p className="text-gray-600">Effective Date: February 05, 2026</p>
          {/* <p className="text-xs text-red-500 mt-2">* PLACEHOLDER: FOR LAWYER REVIEW *</p> */}
        </header>

        <div className="legal-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Medixra ("we", "our") respects your privacy and is committed to protecting the personal information of our users ("you") in Pakistan. This Privacy Policy explains how we collect, use, and safeguard your data.
            </p>
          </section>

          <section>
            <h2>2. Data We Collect</h2>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, WhatsApp number, phone number, city, and optional business address.</li>
              <li><strong>Listing Information:</strong> Details about equipment you list, including photos, descriptions, pricing, and condition.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our platform, search queries, and browsing history (optional).</li>
              <li><strong>Device Information:</strong> IP address, browser type, and operating system (for security and analytics).</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Data</h2>
            <p>We use your data to:</p>
            <ul>
              <li>Publish and manage your equipment listings.</li>
              <li>Connect Buyers with Vendors via provided contact methods (e.g., WhatsApp redirect).</li>
              <li>Send administrative notifications, updates, and support messages.</li>
              <li>Improve our platform's functionality and user experience.</li>
              <li>Comply with legal obligations under Pakistani law.</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Sharing</h2>
            <p>
              <strong>Public Visibility:</strong> Information you include in a listing (Contact Number, City, Vendor Name) is publicly visible to allow buyers to contact you.
            </p>
            <p>
              We do <strong>not</strong> sell your personal data to third-party marketing agencies. We may share data with trusted service providers (e.g., hosting, analytics) who are bound by confidentiality agreements.
            </p>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your data. However, no internet platform is 100% secure. You are responsible for maintaining the confidentiality of your account password.
            </p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information as long as your account is active or as needed to provide services. You may request deletion of your account at any time, subject to retention required for legal or compliance purposes.
            </p>
          </section>

          <section>
            <h2>7. User Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access, correct, or update your personal information.</li>
              <li>Request the deletion of your data.</li>
              <li>Opt-out of non-essential marketing communications.</li>
            </ul>
          </section>

          <section>
            <h2>8. Data Processing & International Transfer</h2>
            <p>
              Your data may be processed and stored on servers located outside of Pakistan. By using Medixra, you consent to this transfer in compliance with applicable laws.
            </p>
          </section>

          <section>
            <h2>9. Cookies & Tracking</h2>
            <p>
              We may use cookies to maintain your session and analyze site traffic. You can choose to disable cookies through your browser settings, though this may affect site functionality.
            </p>
          </section>

          <section>
            <h2>10. Changes to Privacy Policy</h2>
            <p>
              We may update this policy from time to time. We will notify users of significant changes by updating the Effective Date at the top of this page.
            </p>
          </section>

          <section>
            <h2>11. Contact & Data Requests</h2>
            <p>
              If you have questions about your data or this policy, please contact us via our <Link to="/contact">Contact Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
