
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { listingsAPI, getSpecialties, getCities } from '@/services/api';
import { formatPKR } from '@/lib/utils';
import { 
  MapPin, 
  Stethoscope, 
  Search, 
  SlidersHorizontal,
  Ear,
  Eye,
  Heart,
  Brain,
  Bone,
  Baby,
  Activity,
  Smile,
  Sparkles,
  Wind,
  Flower2,
  Droplets
} from 'lucide-react';
import './BrowseSpecialtyPage.css';

const BrowseSpecialtyPage = () => {
  const navigate = useNavigate();
  const specialties = getSpecialties();
  const cities = getCities();

  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  
  // Filter States
  const [cityFilter, setCityFilter] = useState('');
  const [conditionFilters, setConditionFilters] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const seo = useSEO({
    title: "Browse Medical Equipment by Specialty | Medixra Pakistan",
    description: "Find medical equipment by clinical specialty – surgery, cardiology, radiology, ICU, anesthesia, and more. Compare listings from multiple vendors across Pakistan on Medixra.",
    canonicalUrl: "https://medixra.com/browse-specialty",
    ogTitle: "Browse Medical Equipment by Specialty | Medixra Pakistan",
    ogDescription: "Find medical equipment by clinical specialty – surgery, cardiology, radiology, ICU, anesthesia, and more. Compare listings from multiple vendors across Pakistan on Medixra.",
    ogImage: "https://images.unsplash.com/photo-1580281657702-257584239a55",
    ogType: "website"
  });

  // Icon Mapping
  const iconMap = {
    'Internal Medicine': Activity,
    'General Surgery': Stethoscope,
    'Pediatrics': Baby,
    'Obstetrics & Gynecology': Flower2,
    'Cardiology': Heart,
    'Neurology': Brain,
    'Orthopedic Surgery': Bone,
    'Radiology': Activity, 
    'Anesthesiology': Wind,
    'Dentistry': Smile,
    'Psychiatry': Brain,
    'Dermatology': Sparkles,
    'Oncology': Activity,
    'Urology': Droplets,
    'ENT (Otolaryngology)': Ear,
    'Ophthalmology': Eye
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Normalize data when fetching
    const allListings = listingsAPI.getAll().map(l => ({
      ...l,
      specialties: Array.isArray(l.specialties) ? l.specialties : (l.specialty ? [l.specialty] : [])
    }));
    setListings(allListings);
  }, []);

  useEffect(() => {
    let results = listings;

    if (selectedSpecialty) {
      // Updated to check array includes
      results = results.filter(item => item.specialties && item.specialties.includes(selectedSpecialty));
    }

    if (cityFilter) {
      results = results.filter(item => item.city === cityFilter);
    }

    if (conditionFilters.length > 0) {
      results = results.filter(item => conditionFilters.includes(item.condition));
    }

    if (priceRange.min) {
      results = results.filter(item => item.pricePKR >= Number(priceRange.min));
    }
    if (priceRange.max) {
      results = results.filter(item => item.pricePKR <= Number(priceRange.max));
    }

    setFilteredListings(results);
  }, [selectedSpecialty, listings, cityFilter, conditionFilters, priceRange]);

  const handleSpecialtyClick = (specialtyName) => {
    setSelectedSpecialty(specialtyName === selectedSpecialty ? null : specialtyName);
  };

  const handleConditionChange = (condition) => {
    setConditionFilters(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition) 
        : [...prev, condition]
    );
  };

  const clearFilters = () => {
    setCityFilter('');
    setConditionFilters([]);
    setPriceRange({ min: '', max: '' });
  };

  return (
    <div className="browse-page">
      {seo}

      <div className="browse-container">
        <header className="browse-header">
          <h1>Browse by Specialty</h1>
          <p>Select a medical specialty to find relevant equipment listings</p>
        </header>

        {/* Specialties Grid */}
        <div className="selection-grid">
          {specialties.map((spec) => {
            const IconComponent = iconMap[spec.name] || Stethoscope;
            return (
              <div 
                key={spec.id} 
                className={`selection-card ${selectedSpecialty === spec.name ? 'active' : ''}`}
                onClick={() => handleSpecialtyClick(spec.name)}
              >
                <div className="selection-icon">
                  <IconComponent size={32} />
                </div>
                <p>{spec.name}</p>
              </div>
            );
          })}
        </div>

        <div className="browse-content">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3><SlidersHorizontal size={18} style={{ display: 'inline', marginRight: '8px' }}/> Filters</h3>
              <button className="reset-btn" onClick={clearFilters}>Reset All</button>
            </div>

            <div className="filter-group">
              <h4>City</h4>
              <select 
                className="filter-select"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <h4>Condition</h4>
              <div className="checkbox-group">
                {['New', 'Used', 'Refurbished'].map(cond => (
                  <label key={cond} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={conditionFilters.includes(cond)}
                      onChange={() => handleConditionChange(cond)}
                    />
                    {cond}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4>Price Range (PKR)</h4>
              <div className="price-inputs">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="price-input"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
                <span style={{ color: '#999' }}>-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="price-input"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
              </div>
            </div>
          </aside>

          {/* Listings Grid */}
          <main className="listings-area">
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>
                {selectedSpecialty ? `${selectedSpecialty} Equipment` : 'All Equipment'} 
                <span style={{ fontSize: '1rem', color: '#666', fontWeight: 'normal', marginLeft: '10px' }}>
                  ({filteredListings.length} listings)
                </span>
              </h2>
            </div>

            {filteredListings.length > 0 ? (
              <div className="listings-grid">
                {filteredListings.map(listing => (
                  <div key={listing.id} className="listing-card">
                    <div className="card-image-wrapper">
                      <img 
                        src={listing.images && listing.images.length > 0 ? listing.images[0] : 'https://via.placeholder.com/300x200'} 
                        alt={listing.title} 
                        className="card-image"
                      />
                      <span className={`condition-badge badge-${listing.condition.toLowerCase()}`}>
                        {listing.condition}
                      </span>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{listing.title}</h3>
                      <div className="card-location">
                        <MapPin size={14} /> {listing.city}
                      </div>
                      <div className="card-footer">
                        <span className="card-price">{formatPKR(listing.pricePKR)}</span>
                        <Link to={`/listing/${listing.id}`} className="view-btn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Search size={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
                <h3>No listings found</h3>
                <p>Try adjusting your filters or selecting a different specialty.</p>
                <button 
                  onClick={clearFilters} 
                  style={{ marginTop: '16px', color: '#0066CC', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BrowseSpecialtyPage;
