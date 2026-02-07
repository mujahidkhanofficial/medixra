
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { ShieldAlert, CheckCircle, AlertOctagon, Scale, BookOpen } from 'lucide-react';
import './SafetyCompliancePage.css';

const SafetyCompliancePage = () => {
  useSEO({
    title: "Safety & Compliance Guidelines | Medixra Medical Equipment Marketplace",
    description: "Learn about safety guidelines, regulatory compliance, and best practices for buying and selling medical equipment on Medixra in Pakistan.",
    canonicalUrl: "https://medixra.com/safety-compliance"
  });

  return (
    <div className="safety-page">
      <div className="safety-container">
        <header className="safety-header">
          <h1>Safety & Compliance Guidelines</h1>
          <p className="text-gray-600">Essential information for safe trading on Pakistan's medical marketplace.</p>
        </header>

        {/* For Buyers */}
        <section className="safety-section">
          <h2><ShieldAlert size={28} /> For Buyers (Healthcare Professionals)</h2>
          <p>
            When purchasing medical equipment on Medixra, especially used or refurbished items, due diligence is critical to ensure patient safety and regulatory compliance.
          </p>
          <ul className="safety-list">
            <li><strong>Verify Equipment Condition:</strong> Always inspect used equipment in person or request detailed videos. Verify that the device functions correctly before payment.</li>
            <li><strong>Consult Biomedical Engineers:</strong> For high-value machinery (MRI, CT, Ultrasound), we strongly recommend hiring a qualified biomedical engineer to inspect the equipment.</li>
            <li><strong>Check Compliance:</strong> Ensure the equipment meets Pakistani safety standards. Imported used medical devices often require specific clearance.</li>
            <li><strong>Ask for Warranties:</strong> Clarify if the vendor provides any warranty or after-sales service/maintenance support.</li>
          </ul>
        </section>

        {/* For Vendors */}
        <section className="safety-section">
          <h2><CheckCircle size={28} /> For Vendors</h2>
          <p>
            As a vendor on Medixra, you are responsible for the legality and accuracy of your listings.
          </p>
          <ul className="safety-list">
            <li><strong>Accurate Representation:</strong> You must truthfully describe the condition (New, Used, Refurbished) of the equipment. Misrepresentation is a violation of our terms.</li>
            <li><strong>Legal Status:</strong> You must have the legal right to sell the items listed. Stolen or illegally imported goods are strictly prohibited.</li>
            <li><strong>Licenses:</strong> Ensure you hold necessary business licenses required to trade medical equipment in Pakistan.</li>
            <li><strong>Safety Standards:</strong> Do not list equipment that has been recalled or is deemed unsafe for medical use.</li>
          </ul>
        </section>

        {/* Allowed vs Restricted */}
        <section className="safety-section">
          <h2><AlertOctagon size={28} /> Allowed vs. Restricted Equipment</h2>
          
          <h3>✅ Allowed Equipment</h3>
          <p>Generally, standard medical devices intended for professional use by qualified personnel are allowed, provided they comply with local laws.</p>
          <ul className="safety-list">
            <li>Diagnostic Imaging (X-Ray, Ultrasound) - *Subject to PNRA/DRAP regulations*</li>
            <li>Surgical Instruments & Hospital Furniture</li>
            <li>Patient Monitors & ECG Machines</li>
            <li>Mobility Aids & Rehabilitation Equipment</li>
          </ul>

          <h3>🚫 Restricted / Prohibited Items</h3>
          <div className="warning-box">
             <p className="font-bold text-red-800">The following are strictly prohibited:</p>
             <ul className="safety-list mt-2">
                <li>Unregistered or banned medical devices under DRAP regulations.</li>
                <li>Counterfeit or fake medical instruments.</li>
                <li>Expired consumables or sterile goods.</li>
                <li>Radioactive materials without PNRA licensing.</li>
                <li>Prescription-only drugs or pharmaceuticals (Medixra is for equipment, not drugs).</li>
             </ul>
          </div>
        </section>

        {/* Regulatory Compliance */}
        <section className="safety-section">
          <h2><Scale size={28} /> Regulatory Compliance in Pakistan</h2>
          <p>
            Medical devices in Pakistan are regulated primarily by the <strong>Drug Regulatory Authority of Pakistan (DRAP)</strong> under the Medical Devices Rules, 2017.
          </p>
          
          <div className="compliance-box">
            <h3 className="text-teal-900 mt-0">Important Note for Users</h3>
            <p className="mb-0">
               Medixra is a platform and <strong>does not</strong> enforce regulatory compliance on behalf of authorities. It is the sole responsibility of the Buyer and Seller to ensure that their transaction and the equipment involved comply with the Medical Devices Act, 1976, and DRAP Act, 2012.
            </p>
          </div>

          <p className="mt-4">
            For specific information regarding device registration and enlistment, please refer to:
          </p>
          <ul className="safety-list">
             <li><a href="https://www.dra.gov.pk/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Drug Regulatory Authority of Pakistan (DRAP) Official Website</a></li>
             <li><a href="https://www.pnra.org/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Pakistan Nuclear Regulatory Authority (PNRA)</a> - For X-Ray/Imaging equipment.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SafetyCompliancePage;
