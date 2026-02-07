import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight, Store } from 'lucide-react';
import { verificationAPI } from '@/services/api';
import VerificationBadge from '@/components/VerificationBadge';
import VendorTypeBadge from '@/components/VendorTypeBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const VendorsDirectory = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    // Fetch all vendors with their verification status
    const allVendors = verificationAPI.getAllVendors();
    setVendors(allVendors);
    setFilteredVendors(allVendors.slice(0, 4)); // Show top 4 initially
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
        setFilteredVendors(vendors.slice(0, 4));
    } else {
        const filtered = vendors.filter(v => v.vendorType === activeFilter);
        setFilteredVendors(filtered.slice(0, 4));
    }
  }, [activeFilter, vendors]);

  const filters = ['All', 'Manufacturer', 'Importer', 'Distributor', 'Service Provider'];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-3">
          <div>
            <h2 className="text-2xl font-bold text-charcoal-900 mb-1">
              Featured Vendors
            </h2>
            <p className="text-sm text-charcoal-600">
              Connect with verified top-rated suppliers
            </p>
          </div>
          <Link to="/vendors" className="hidden md:block">
            <Button variant="outline" size="sm" className="text-olive-600 border-olive-600 hover:bg-olive-50 text-xs">
              View All Vendors <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Vendor Type Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
            {filters.map(filter => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                        activeFilter === filter 
                            ? "bg-olive-600 text-white border-olive-600" 
                            : "bg-white text-charcoal-600 border-olive-200 hover:bg-olive-50"
                    )}
                >
                    {filter}
                </button>
            ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredVendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg border border-olive-100 p-4 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center mb-3 text-xl font-bold text-olive-700">
                  {vendor.name.charAt(0)}
                </div>
                
                <h3 className="text-base font-bold text-charcoal-900 mb-1 line-clamp-1">
                  {vendor.companyName || vendor.name}
                </h3>
                
                <div className="flex flex-col gap-1.5 items-center mb-2">
                  <VerificationBadge status={vendor.verification.status} />
                  {vendor.vendorType && <VendorTypeBadge type={vendor.vendorType} className="scale-90" />}
                </div>

                <div className="flex items-center gap-1 mb-2 text-xs text-charcoal-600">
                  <MapPin className="w-3 h-3 text-olive-500" />
                  <span>{vendor.country || 'Global'}</span>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <span className="text-xs text-charcoal-500">(4.8)</span>
                </div>

                <Link to={`/products?vendorId=${vendor.id}`} className="w-full">
                  <Button size="sm" className="w-full bg-white text-olive-600 border border-olive-200 hover:bg-olive-50 hover:border-olive-600 text-xs h-8">
                    <Store className="w-3 h-3 mr-2" /> View Profile
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
          {filteredVendors.length === 0 && (
            <div className="col-span-full text-center py-8 text-charcoal-500 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-sm">No vendors found matching "{activeFilter}"</p>
              <Button variant="link" onClick={() => setActiveFilter('All')} className="text-olive-600 mt-1 text-xs">
                 Clear Filter
              </Button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link to="/vendors">
            <Button variant="outline" size="sm" className="w-full text-olive-600 border-olive-600">
              View All Vendors <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VendorsDirectory;