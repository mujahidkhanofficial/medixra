
import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { vendorAPI, getCities, getSpecialties } from '@/services/api';
import { MapPin, Search, MessageCircle } from 'lucide-react';
import MedicalDisclaimerBox from '@/components/MedicalDisclaimerBox';
import './VendorsListPage.css';

const VendorsListPage = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    specialties: []
  });

  const cities = getCities();
  const specialtyOptions = getSpecialties();

  const seo = useSEO({
    title: "Medical Equipment Vendors & Suppliers in Pakistan | Medixra Directory",
    description: "Browse Medixra's directory of medical equipment vendors and suppliers in Pakistan. View profiles, specialties and active equipment listings with WhatsApp contact.",
    canonicalUrl: "https://medixra.com/vendors",
    ogType: "website"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const approved = vendorAPI.getApprovedVendors();
    setVendors(approved);
    setFilteredVendors(approved);
  }, []);

  useEffect(() => {
    let result = vendors;

    if (filters.city) {
      result = result.filter(v => v.city === filters.city);
    }

    if (filters.specialties.length > 0) {
      result = result.filter(v => 
        v.specialties && v.specialties.some(s => filters.specialties.includes(s))
      );
    }

    setFilteredVendors(result);
  }, [filters, vendors]);

  const handleSpecialtyChange = (spec) => {
    setFilters(prev => {
      const exists = prev.specialties.includes(spec);
      return {
        ...prev,
        specialties: exists 
          ? prev.specialties.filter(s => s !== spec)
          : [...prev.specialties, spec]
      };
    });
  };

  const clearFilters = () => setFilters({ city: '', specialties: [] });

  return (
    <div className="vendors-page">
      {seo}
      
      <div className="vp-header">
        <h1>Trusted Medical Vendors</h1>
        <p>Verified suppliers providing quality equipment across Pakistan</p>
      </div>

      <div className="vp-container">
        {/* Sidebar Filters */}
        <aside className="vp-sidebar">
          <div className="vp-filter-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Filters</h3>
            <button onClick={clearFilters} style={{ color: '#0066CC', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
              Reset
            </button>
          </div>

          <div className="vp-filter-group">
            <div className="vp-filter-title">City</div>
            <select 
              className="vr-select" 
              style={{ width: '100%' }}
              value={filters.city}
              onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="vp-filter-group">
            <div className="vp-filter-title">Specialties</div>
            <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'grid', gap: '8px' }}>
              {specialtyOptions.map(spec => (
                <label key={spec.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#475569', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={filters.specialties.includes(spec.name)}
                    onChange={() => handleSpecialtyChange(spec.name)}
                  />
                  {spec.name}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <main className="vp-main">
          {/* Disclaimer at top of list */}
          <MedicalDisclaimerBox />

          {filteredVendors.length > 0 ? (
            <div className="vp-grid">
              {filteredVendors.map(vendor => (
                <div key={vendor.id} className="vendor-card">
                  <div className="vc-header">
                    <h3 className="vc-name">{vendor.name}</h3>
                    <div className="vc-location">
                      <MapPin size={14} /> {vendor.city}
                    </div>
                  </div>
                  <div className="vc-body">
                    <div className="vc-badges">
                      {vendor.specialties && vendor.specialties.slice(0, 3).map((spec, i) => (
                        <span key={i} className="vc-badge">{spec}</span>
                      ))}
                      {vendor.specialties && vendor.specialties.length > 3 && (
                        <span className="vc-badge">+{vendor.specialties.length - 3}</span>
                      )}
                    </div>
                    <p className="vc-desc">
                      {vendor.description || `Verified medical equipment vendor based in ${vendor.city}.`}
                    </p>
                  </div>
                  <div className="vc-footer">
                    <a 
                      href={`https://wa.me/${vendor.whatsAppNumber}?text=Hi, I found your profile on Medixra.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp-full"
                    >
                      <MessageCircle size={20} /> Chat on WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="vp-empty">
              <Search size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <h3>No vendors found</h3>
              <p>Try adjusting your filters to see more results.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default VendorsListPage;
