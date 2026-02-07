
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Heart, Star, Check, ShieldCheck, Globe, X, ChevronDown, ChevronUp, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { listingsAPI, getSpecialties, getCategories, reviewAPI, getVendorById, getCities } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistAPI } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import VendorTypeBadge from '@/components/VendorTypeBadge';

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    specialties: searchParams.get('specialty') ? [searchParams.get('specialty')] : [],
    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    city: searchParams.get('location') || '', // Mapped from 'location' URL param to 'city'
    condition: '',
    minPrice: '',
    maxPrice: '',
    verifiedOnly: false,
    vendorType: '' 
  });
  const [wishlist, setWishlist] = useState([]);
  const [productRatings, setProductRatings] = useState({});
  const [productVendors, setProductVendors] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('specialties'); 

  const specialties = getSpecialties();
  const categories = getCategories();
  const cities = getCities();

  useEffect(() => {
    // Update filters if URL params change
    const newLocation = searchParams.get('location');
    const newSearch = searchParams.get('search');
    const newSpecialty = searchParams.get('specialty');
    const newCategory = searchParams.get('category');
    
    setFilters(prev => ({
        ...prev,
        city: newLocation || prev.city,
        search: newSearch !== null ? newSearch : prev.search,
        specialties: newSpecialty ? [newSpecialty] : prev.specialties,
        categories: newCategory ? [newCategory] : prev.categories
    }));
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
    if (user) {
      setWishlist(wishlistAPI.get(user.id));
    }
  }, [filters, user]);

  const loadProducts = () => {
    const filtered = listingsAPI.searchListings(filters);
    setProducts(filtered);
    
    // Load extra data (ratings, vendor info)
    const ratings = {};
    const vendors = {};
    filtered.forEach(p => {
      try {
        // Use the new getProductReviews method with error handling
        const reviews = reviewAPI.getProductReviews(p.id);
        if (Array.isArray(reviews) && reviews.length > 0) {
          const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
          ratings[p.id] = { avg: avg.toFixed(1), count: reviews.length };
        }
      } catch (err) {
        console.error("Failed to load reviews for product", p.id, err);
      }

      if(p.vendorId) {
          vendors[p.id] = getVendorById(p.vendorId);
      }
    });
    setProductRatings(ratings);
    setProductVendors(vendors);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => {
      const current = prev[key] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const handleWishlist = (productId) => {
    if (!user) {
      toast({ title: 'Login Required', variant: 'destructive' });
      return;
    }
    if (wishlist.includes(productId)) {
      const updated = wishlistAPI.remove(user.id, productId);
      setWishlist(updated);
      toast({ title: 'Removed from wishlist' });
    } else {
      const updated = wishlistAPI.add(user.id, productId);
      setWishlist(updated);
      toast({ title: 'Added to wishlist' });
    }
  };

  const clearAllFilters = () => {
    setFilters({ 
      search: '', 
      specialties: [], 
      categories: [], 
      city: '', 
      condition: '', 
      minPrice: '', 
      maxPrice: '', 
      verifiedOnly: false, 
      vendorType: '' 
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        maximumFractionDigits: 0
    }).format(price).replace('PKR', '₨');
  };

  const hasActiveFilters = () => {
    return filters.specialties.length > 0 || 
           filters.categories.length > 0 || 
           filters.city || 
           filters.verifiedOnly || 
           filters.condition || 
           filters.search;
  };

  return (
    <>
      <Helmet>
        <title>Browse Medical Equipment - Medixra</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Search */}
          <div className="text-center mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Browse Equipment
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.1 }}
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Discover premium medical devices from verified sellers across Pakistan.
            </motion.p>

            <div className="max-w-2xl mx-auto relative mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-olive-600 w-5 h-5" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search products, brands, or equipment types..."
                  className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-olive-100 focus:border-olive-500 focus:outline-none focus:ring-2 focus:ring-olive-200 shadow-lg text-lg bg-white/90 backdrop-blur-sm transition-all"
                />
              </div>
            </div>

            <Button 
              onClick={() => setShowFilters(!showFilters)} 
              variant="outline" 
              className={cn(
                "rounded-full border-olive-200 text-olive-700 hover:bg-olive-50 transition-all",
                showFilters && "bg-olive-50 border-olive-400"
              )}
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Advanced Filters'}
              {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </div>

          {/* Centered Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-12"
              >
                <div className="bg-white rounded-2xl shadow-xl border border-olive-100 p-6 md:p-8 max-w-5xl mx-auto">
                  
                  {/* Filter Tabs */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-100 pb-4">
                    {['Specialties', 'Categories', 'Locations', 'Condition'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={cn(
                          "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                          activeTab === tab.toLowerCase()
                            ? "bg-olive-600 text-white shadow-md transform scale-105"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Filter Content Area */}
                  <div className="min-h-[200px]">
                    {/* Specialties Tab */}
                    {activeTab === 'specialties' && (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                      >
                        {specialties.map(s => (
                          <div 
                            key={s.id} 
                            onClick={() => toggleArrayFilter('specialties', s.name)}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm",
                              filters.specialties.includes(s.name) 
                                ? "bg-olive-50 border-olive-500 shadow-sm" 
                                : "bg-white border-gray-100 hover:border-olive-200"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                              filters.specialties.includes(s.name) ? "bg-olive-600 border-olive-600" : "border-gray-300 bg-white"
                            )}>
                              {filters.specialties.includes(s.name) && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <span className={cn("text-sm font-medium", filters.specialties.includes(s.name) ? "text-olive-900" : "text-gray-600")}>
                              {s.name}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Categories Tab */}
                    {activeTab === 'categories' && (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                      >
                        {categories.map(c => (
                          <div 
                            key={c.id} 
                            onClick={() => toggleArrayFilter('categories', c.name)}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm",
                              filters.categories.includes(c.name) 
                                ? "bg-olive-50 border-olive-500 shadow-sm" 
                                : "bg-white border-gray-100 hover:border-olive-200"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                              filters.categories.includes(c.name) ? "bg-olive-600 border-olive-600" : "border-gray-300 bg-white"
                            )}>
                              {filters.categories.includes(c.name) && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <span className={cn("text-sm font-medium", filters.categories.includes(c.name) ? "text-olive-900" : "text-gray-600")}>
                              {c.name}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Locations Tab */}
                    {activeTab === 'locations' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            <div 
                                onClick={() => handleFilterChange('city', '')}
                                className={cn(
                                    "px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all text-center",
                                    filters.city === '' 
                                    ? "bg-olive-600 text-white border-olive-600" 
                                    : "bg-white text-gray-600 border-gray-200 hover:border-olive-300"
                                )}
                            >
                                All Pakistan
                            </div>
                            {cities.map(city => (
                                <div 
                                    key={city} 
                                    onClick={() => handleFilterChange('city', city)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all text-center",
                                        filters.city === city 
                                        ? "bg-olive-600 text-white border-olive-600" 
                                        : "bg-white text-gray-600 border-gray-200 hover:border-olive-300"
                                    )}
                                >
                                    {city}
                                </div>
                            ))}
                         </div>
                      </motion.div>
                    )}

                    {/* Condition Tab */}
                    {activeTab === 'condition' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center gap-4">
                             {['New', 'Used', 'Refurbished'].map(condition => (
                                 <div 
                                    key={condition}
                                    onClick={() => handleFilterChange('condition', filters.condition === condition ? '' : condition)}
                                    className={cn(
                                        "px-6 py-3 rounded-xl border-2 text-base font-semibold cursor-pointer transition-all text-center min-w-[120px]",
                                        filters.condition === condition 
                                        ? "bg-olive-50 border-olive-600 text-olive-800" 
                                        : "bg-white text-gray-600 border-gray-200 hover:border-olive-300"
                                    )}
                                >
                                    {condition}
                                </div>
                             ))}
                        </motion.div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <button 
                      onClick={clearAllFilters}
                      className="text-sm text-gray-500 hover:text-red-600 font-medium underline decoration-dotted underline-offset-4"
                    >
                      Clear all filters
                    </button>
                    <div className="text-sm font-medium text-olive-700 bg-olive-50 px-4 py-1.5 rounded-full">
                       {products.length} Results Found
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filter Badges */}
          {hasActiveFilters() && !showFilters && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
               {filters.city && (
                 <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 text-sage-800 border border-sage-200">
                   <MapPin className="w-3 h-3" /> {filters.city}
                   <X className="w-3 h-3 cursor-pointer ml-1" onClick={() => handleFilterChange('city', '')} />
                 </span>
               )}
               {filters.condition && (
                 <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                   Condition: {filters.condition}
                   <X className="w-3 h-3 cursor-pointer ml-1" onClick={() => handleFilterChange('condition', '')} />
                 </span>
               )}
               {filters.specialties.map(s => (
                 <span key={s} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                   {s}
                   <X className="w-3 h-3 cursor-pointer ml-1" onClick={() => toggleArrayFilter('specialties', s)} />
                 </span>
               ))}
               {filters.categories.map(c => (
                 <span key={c} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                   {c}
                   <X className="w-3 h-3 cursor-pointer ml-1" onClick={() => toggleArrayFilter('categories', c)} />
                 </span>
               ))}
               <button onClick={clearAllFilters} className="text-xs text-gray-500 hover:text-red-600 underline ml-2">Clear All</button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {products.map((product) => {
                const rating = productRatings[product.id];
                const vendor = productVendors[product.id];
                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-olive-200 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    <div className="relative h-56 overflow-hidden bg-gray-50">
                      <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                      />
                      
                      {/* Floating Actions */}
                      <button 
                        onClick={(e) => { e.preventDefault(); handleWishlist(product.id); }} 
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 transition-colors z-10"
                      >
                        <Heart className={cn("w-5 h-5 transition-colors", wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400')} />
                      </button>

                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                         <span className={cn(
                             "px-3 py-1 text-xs font-bold rounded-full shadow-sm border",
                             product.condition === 'New' ? "bg-emerald-100 text-emerald-800 border-emerald-200" : 
                             product.condition === 'Refurbished' ? "bg-blue-100 text-blue-800 border-blue-200" :
                             "bg-amber-100 text-amber-800 border-amber-200"
                         )}>
                           {product.condition}
                         </span>
                         {vendor?.verificationStatus === 'Verified' && (
                           <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded-full shadow-sm flex items-center gap-1 w-fit">
                             <ShieldCheck className="w-3 h-3" /> Verified
                           </span>
                         )}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="mb-2">
                         <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                             <MapPin className="w-3 h-3 text-olive-500" />
                             {product.city}
                         </div>
                         <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-2 group-hover:text-olive-700 transition-colors">
                           {product.title}
                         </h3>
                         <p className="text-sm text-gray-500 mt-1">{product.manufacturer} • {product.model}</p>
                      </div>
                      
                      {/* Vendor Info */}
                      <div className="flex items-center justify-between mb-4 text-xs mt-auto">
                          {vendor?.vendorType && <VendorTypeBadge type={vendor.vendorType} className="scale-90 origin-left" />}
                          {rating && (
                            <div className="flex items-center gap-1 text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="font-bold">{rating.avg}</span>
                                <span className="text-gray-400">({rating.count})</span>
                            </div>
                          )}
                      </div>
                      
                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div>
                           <p className="text-xs text-gray-400 uppercase font-semibold">Price</p>
                           <p className="text-xl font-bold text-olive-700">{formatPrice(product.pricePKR)}</p>
                        </div>
                         <a 
                            href={`https://wa.me/${product.whatsAppNumber}?text=Hi, I am interested in your listing: ${product.title} on Medixra.`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="icon" className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md w-10 h-10">
                                <MessageCircle className="w-5 h-5" />
                            </Button>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {products.length === 0 && (
                <div className="col-span-full py-20 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                    <Button onClick={clearAllFilters} variant="outline" className="border-olive-300 text-olive-700 hover:bg-olive-50">
                        Clear All Filters
                    </Button>
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListingPage;
