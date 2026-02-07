
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import './MedicalDisclaimerBox.css';

const MedicalDisclaimerBox = () => {
  return (
    <div className="medical-disclaimer-box">
      <div className="medical-disclaimer-icon">
        <AlertTriangle size={20} />
      </div>
      <div className="medical-disclaimer-content">
        <span className="medical-disclaimer-title">⚠️ Medical Equipment Disclaimer</span>
        <p>
          Medixra is a listing platform only and is not the manufacturer or seller of equipment. 
          Responsibility for regulatory compliance with Pakistani laws (including DRAP and other health authorities) 
          lies with the vendor and buyer, not Medixra. Some medical equipment may be regulated or restricted in 
          Pakistan and may require licenses, approvals, or certifications. Buyers must verify that the equipment, 
          seller, and use are compliant with applicable Pakistani laws and medical regulations before purchase or use. 
          For more information, see our <Link to="/safety-compliance" className="medical-disclaimer-link">Safety & Compliance guidelines</Link>.
        </p>
      </div>
    </div>
  );
};

export default MedicalDisclaimerBox;
