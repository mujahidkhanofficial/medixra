
import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { 
  Stethoscope, 
  LayoutGrid, 
  Building2, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  MapPin 
} from 'lucide-react';
import FeaturedListingsSection from '@/components/FeaturedListingsSection';
import './HomePage.css';

const HomePage = () => {
  const seo = useSEO({
    title: "Medixra – Medical Equipment Marketplace in Pakistan | Buy & Sell New & Used Devices",
    description: "Medixra is Pakistan's dedicated medical equipment marketplace. Browse and post listings for new and used hospital equipment, instruments, and devices. Connect directly with verified vendors via WhatsApp.",
    canonicalUrl: "https://medixra.com/",
    ogType: "website"
  });

  return (
    <div className="home-page">
      {seo}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-gradient"></div>
        <div className="container-base hero-content">
          <h1 className="hero-title">Medical Equipment Marketplace for Pakistan</h1>
          <p className="hero-subtitle">
            The trusted platform for doctors, hospitals, and vendors to buy and sell quality medical equipment securely and efficiently.
          </p>
          <div className="hero-actions">
            <Link to="/browse-specialty" className="btn btn-secondary" style={{ backgroundColor: 'white', color: '#0E7490' }}>
              Browse Equipment
            </Link>
            <Link to="/add-listing" className="btn btn-primary" style={{ backgroundColor: '#22C55E' }}>
              Post a Listing <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <div className="container-base">
        <div className="quick-nav-grid">
          <Link to="/browse-specialty" className="nav-card">
            <div className="nav-icon"><Stethoscope size={32} /></div>
            <div>
              <h3>Browse by Specialty</h3>
              <p className="text-sm text-gray-500">Find equipment for specific medical fields</p>
            </div>
          </Link>
          
          <Link to="/browse-category" className="nav-card">
            <div className="nav-icon"><LayoutGrid size={32} /></div>
            <div>
              <h3>Browse by Category</h3>
              <p className="text-sm text-gray-500">Explore diagnostic, surgical & more</p>
            </div>
          </Link>
          
          <Link to="/vendor/register" className="nav-card">
            <div className="nav-icon"><Building2 size={32} /></div>
            <div>
              <h3>Register as Vendor</h3>
              <p className="text-sm text-gray-500">Create your professional store profile</p>
            </div>
          </Link>
          
          <Link to="/how-it-works" className="nav-card">
            <div className="nav-icon"><HelpCircle size={32} /></div>
            <div>
              <h3>How It Works</h3>
              <p className="text-sm text-gray-500">Learn about our secure process</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Listings */}
      <FeaturedListingsSection />

      {/* Trust Section */}
      <section className="trust-section section-py">
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Choose Medixra?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We are dedicated to modernizing the medical equipment supply chain in Pakistan through trust and technology.</p>
          </div>
          
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon-box">
                <ShieldCheck size={24} />
              </div>
              <div className="trust-content">
                <h4>Verified Vendors</h4>
                <p>We vet our vendors to ensure you are dealing with legitimate businesses and high-quality equipment.</p>
              </div>
            </div>
            
            <div className="trust-item">
              <div className="trust-icon-box">
                <Lock size={24} />
              </div>
              <div className="trust-content">
                <h4>Secure Transactions</h4>
                <p>Our platform facilitates direct, transparent communication between buyers and sellers via WhatsApp.</p>
              </div>
            </div>
            
            <div className="trust-item">
              <div className="trust-icon-box">
                <MapPin size={24} />
              </div>
              <div className="trust-content">
                <h4>Pakistan-Wide Coverage</h4>
                <p>Whether you are in Karachi, Lahore, Islamabad or anywhere else, find equipment near you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="container-base">
        <section className="cta-section">
          <h2>Ready to get started?</h2>
          <p>Join thousands of healthcare professionals upgrading their medical facilities today.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/products" className="btn btn-primary" style={{ backgroundColor: '#22C55E' }}>
              Browse Now
            </Link>
            <Link to="/vendor/register" className="btn btn-secondary" style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'white' }}>
              Become a Vendor
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
