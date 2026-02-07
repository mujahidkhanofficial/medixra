
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Activity, Heart, Wind, Scale, ArrowDown, Utensils, Stethoscope, Bone, Bus as Ambulance, Hand, AlignVerticalDistributeCenter, Brain, Target, Baby, Sparkles, ClipboardX as ClipboardPlus, Eye, Smile, Ear, Droplets, RefreshCw, Flower2, Footprints, GripHorizontal, Search, ChevronRight } from 'lucide-react';
import { getSurgicalSpecialties, productAPI } from '@/services/api';

// Mapping string icon names to Lucide components
const iconMap = {
  HeartPulse, Activity, Heart, Wind, Scale, ArrowDown, Utensils, Stethoscope,
  Bone, Ambulance, Hand, AlignVerticalDistributeCenter, Brain, Target, Baby,
  Sparkles, ClipboardPlus, Eye, Smile, Ear, Droplets, RefreshCw, Flower2,
  Footprints, GripHorizontal
};

const EquipmentCategories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const surgicalSpecialties = getSurgicalSpecialties();
  const productCounts = productAPI.getCountsBySpecialty();

  // Filter and flatten specialties based on search
  const filteredSpecialties = useMemo(() => {
    if (!searchQuery) return surgicalSpecialties;
    const lowerQuery = searchQuery.toLowerCase();
    // Assuming getSurgicalSpecialties returns a flat array in API, but this component was originally expecting grouped data.
    // The provided API returns a simple array.
    // However, the original component structure seems to expect grouped data.
    // Given the API implementation, we need to adapt.
    // Let's create a single "General" group if the data is flat, or adapt the structure.
    // The provided getSurgicalSpecialties returns an array of objects {id, name}.
    // This component logic `surgicalSpecialties.map(group => ...)` implies nested structure.
    // I'll wrap the flat list into a single group to maintain compatibility with the map logic below if needed,
    // OR simplify the component to just render the flat list.
    // Let's assume for now we render the flat list directly, modifying the component structure slightly.
    
    // Actually, looking at the previous version, getSurgicalSpecialties might have returned groups?
    // The provided API code shows it returns a flat array.
    // I will simplify this component to render the flat list directly since we don't have grouping info in API.
    
    return surgicalSpecialties.filter(item => 
       item.name.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, surgicalSpecialties]);

  return (
    <section className="py-20 bg-[var(--color-bg-light)]">
      <div className="container-base">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-dark)] mb-4">
              Browse by Surgical Specialty
            </h2>
            <p className="text-lg text-[var(--color-text-body)] max-w-2xl mx-auto mb-8">
              Explore equipment tailored for specific surgical procedures and medical departments
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-12">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-light)] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search specialty (e.g., Cardiology, Orthopedics)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-opacity-20 focus:ring-[var(--color-primary)] outline-none transition-all shadow-sm text-base bg-white"
                />
             </div>
          </div>
        </div>

        <div className="space-y-12">
          <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredSpecialties.map((specialty) => {
                    const IconComponent = iconMap[specialty.id] || Stethoscope; // Fallback to Stethoscope
                    const count = productCounts[specialty.name] || 0;

                    return (
                      <motion.div
                        key={specialty.id}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className="group cursor-pointer"
                        onClick={() => navigate(`/products?specialty=${encodeURIComponent(specialty.name)}`)}
                      >
                        <div className="card-base p-6 flex flex-col items-start h-full relative overflow-hidden bg-white">
                          <div className="flex justify-between items-start mb-4 w-full">
                              <div className="w-12 h-12 bg-[var(--color-bg-light)] rounded-xl flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-colors duration-300">
                                <IconComponent className="w-6 h-6 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" />
                              </div>
                              {count > 0 && (
                                <span className="bg-[var(--color-bg-light)] text-[var(--color-text-body)] text-xs font-bold px-2.5 py-1 rounded-full">
                                  {count}
                                </span>
                              )}
                          </div>
                          
                          <h4 className="text-lg font-bold text-[var(--color-text-dark)] group-hover:text-[var(--color-primary)] transition-colors mb-2">
                            {specialty.name}
                          </h4>
                          
                          <div className="flex items-center text-sm text-[var(--color-text-light)] font-medium mt-auto group-hover:text-[var(--color-primary)] transition-colors">
                            Browse Products <ChevronRight className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
          </AnimatePresence>
          
          {filteredSpecialties.length === 0 && (
             <div className="text-center py-12 text-[var(--color-text-light)]">
                <p className="text-lg">No specialties found matching "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-[var(--color-primary)] font-semibold hover:underline"
                >
                  Clear Search
                </button>
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EquipmentCategories;
