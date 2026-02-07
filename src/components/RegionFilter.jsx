import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flag, Globe } from 'lucide-react';
import { productAPI } from '@/services/api';

const RegionFilter = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ Pakistan: 0, China: 0, All: 0 });

  useEffect(() => {
    // Calculate counts
    const products = productAPI.getAll(); // get all raw products
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const vendorMap = {};
    users.forEach(u => vendorMap[u.id] = u.country);

    const newCounts = { Pakistan: 0, China: 0, All: products.length };

    products.forEach(p => {
      const country = vendorMap[p.vendorId];
      if (country === 'Pakistan') newCounts.Pakistan++;
      else if (country === 'China') newCounts.China++;
      // Products from 'Other' countries are implicitly included in 'All'
    });

    setCounts(newCounts);
  }, []);

  const handleSelect = (region) => {
    if (region === 'All') {
      navigate('/products');
    } else {
      navigate(`/products?country=${encodeURIComponent(region)}`);
    }
  };

  const buttons = [
    { 
      id: 'Pakistan', 
      label: 'Pakistani Companies', 
      icon: Flag, 
      color: 'text-olive-700', 
      bg: 'bg-olive-50 hover:bg-olive-100',
      borderColor: 'border-olive-200'
    },
    { 
      id: 'China', 
      label: 'Chinese Companies', 
      icon: Flag, 
      color: 'text-blue-800', // Changed for better visibility and distinction
      bg: 'bg-blue-50 hover:bg-blue-100',
      borderColor: 'border-blue-200'
    },
    { 
      id: 'All', 
      label: 'All Companies', 
      icon: Globe, 
      color: 'text-charcoal-700', 
      bg: 'bg-cream-50 hover:bg-cream-100',
      borderColor: 'border-charcoal-200'
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-charcoal-900 mb-1">Browse by Region</h2>
        <p className="text-sm text-charcoal-600">Discover medical equipment from top manufacturing hubs</p>
      </div>
      
      {/* Adjusted grid for 3 buttons on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buttons.map((btn) => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.id}
              onClick={() => handleSelect(btn.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border ${btn.borderColor} ${btn.bg} transition-all duration-300 transform hover:scale-102 hover:shadow-md group min-h-[100px] sm:min-h-[120px]`}
            >
              <div className={`p-3 rounded-full bg-white shadow-sm mb-3 group-hover:shadow-md transition-shadow`}>
                <Icon className={`w-6 h-6 ${btn.color}`} />
              </div>
              <span className={`text-base font-bold ${btn.color} mb-0.5`}>{btn.label}</span>
              <span className="text-xs font-medium text-charcoal-500">{counts[btn.id] || 0} Products</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RegionFilter;