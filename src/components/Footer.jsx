
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3>Medixra</h3>
            <p>
              Pakistan's leading marketplace for new and used medical equipment. 
              Connecting healthcare professionals with trusted vendors nationwide.
            </p>
            <div className="social-links" style={{ marginTop: '24px' }}>
              <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Company Links */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/vendor/register">Become a Vendor</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-col">
            <h4>Legal & Safety</h4>
            <ul className="footer-links">
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/safety-compliance">Safety & Compliance</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul className="footer-links">
              {/* <li><Link to="/faq">FAQs</Link></li> */}
              <li><Link to="/products">Browse Equipment</Link></li>
              <li><Link to="/add-listing">Post a Listing</Link></li>
              <li><Link to="/contact">Help Center</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Medixra. All rights reserved. Made for Pakistan <span role="img" aria-label="Pakistan Flag">🇵🇰</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
