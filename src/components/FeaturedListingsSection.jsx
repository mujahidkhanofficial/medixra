
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { listingsAPI } from '@/services/api';

const FeaturedListingsSection = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const featured = listingsAPI.getFeaturedListings();
        // Normalize array data if coming from legacy
        const normalized = featured.map(l => ({
            ...l,
            specialties: Array.isArray(l.specialties) ? l.specialties : (l.specialty ? [l.specialty] : []),
            categories: Array.isArray(l.categories) ? l.categories : (l.category ? [l.category] : [])
        }));

        if (normalized && normalized.length > 0) {
          setListings(normalized);
        } else {
            const latest = listingsAPI.getLatestListings(6);
             const normalizedLatest = latest.map(l => ({
                ...l,
                specialties: Array.isArray(l.specialties) ? l.specialties : (l.specialty ? [l.specialty] : []),
                categories: Array.isArray(l.categories) ? l.categories : (l.category ? [l.category] : [])
            }));
          setListings(normalizedLatest);
        }
      } catch (error) {
        console.error("Failed to fetch featured listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(price).replace('PKR', '₨');
  };

  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'new': return 'bg-green-100 text-green-800 border-green-200';
      case 'refurbished': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'used': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-[var(--color-bg-light)]">
        <div className="container-base">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-4 h-96 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-6 w-3/4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-1/2 rounded mb-4"></div>
                <div className="bg-gray-200 h-10 w-full rounded mt-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (listings.length === 0) return null;

  return (
    <section className="py-16 bg-[var(--color-bg-white)] border-b border-[var(--color-border)]">
      <div className="container-base">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-text-dark)] mb-2">Featured Medical Equipment</h2>
            <p className="text-[var(--color-text-body)]">Premium listings from verified sellers across Pakistan</p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white gap-2">
              View All Listings <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="card-base overflow-hidden flex flex-col group"
            >
              {/* Image Area */}
              <div className="relative h-64 overflow-hidden bg-gray-100 border-b border-[var(--color-border)]">
                <img 
                  src={item.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'} 
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${getConditionColor(item.condition)}`}>
                    {item.condition}
                  </span>
                </div>
                {item.isFeatured && (
                  <div className="absolute top-4 right-4 z-10 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Featured
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-[var(--color-primary)] mb-1 block uppercase tracking-wide">
                      {item.categories && item.categories.length > 0 ? item.categories[0] : (item.category || 'Equipment')}
                  </span>
                  <Link to={`/listing/${item.id}`} className="block">
                    <h3 className="text-lg font-bold text-[var(--color-text-dark)] leading-snug mb-1 line-clamp-2 hover:text-[var(--color-primary)] transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-[var(--color-text-light)] font-medium">
                    {item.manufacturer} • {item.model}
                  </p>
                </div>

                <div className="mt-2 flex items-center text-[var(--color-text-body)] text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1 text-[var(--color-text-light)]" />
                  {item.city}
                </div>

                <div className="mt-auto pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--color-text-light)] uppercase font-semibold">Price</p>
                    <p className="text-xl font-bold text-[var(--color-secondary)]">{formatPrice(item.pricePKR)}</p>
                  </div>
                  
                  <a 
                    href={`https://wa.me/${item.whatsAppNumber}?text=Hi, I am interested in your listing: ${item.title} on Medixra.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="bg-[#25D366] hover:bg-[#1ebd59] text-white shadow-sm rounded-lg gap-2 font-semibold">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsSection;
