
// API Service Layer for managing all data operations

// Initialize sample data if not exists
const initializeSampleData = () => {
  // Initialize vendors
  if (!localStorage.getItem('vendors')) {
    const sampleVendors = [
      {
        id: 'vendor1',
        name: 'Prime Medical Supplies',
        contactPerson: 'Ahmed Khan',
        city: 'Karachi',
        specialties: ['Cardiology', 'General Surgery'],
        whatsAppNumber: '03001234567',
        email: 'prime@medixra.com',
        description: 'Leading supplier of cardiology and surgical equipment in Karachi. We provide high-quality imported machinery with warranty.',
        website: 'https://primemedical.example.com',
        isApproved: true,
        createdAt: new Date(Date.now() - 10000000).toISOString()
      },
      {
        id: 'vendor2',
        name: 'Orthopedic Solutions',
        contactPerson: 'Dr. Fatima',
        city: 'Lahore',
        specialties: ['Orthopedic Surgery', 'Neurology'],
        whatsAppNumber: '03021234567',
        email: 'ortho@medixra.com',
        description: 'Specializing in orthopedic implants, surgical instruments, and rehabilitation equipment.',
        website: '',
        isApproved: true,
        createdAt: new Date(Date.now() - 9000000).toISOString()
      },
      {
        id: 'vendor3',
        name: 'Pediatric Care Hub',
        contactPerson: 'Dr. Hassan',
        city: 'Islamabad',
        specialties: ['Pediatrics'],
        whatsAppNumber: '03051234567',
        email: 'pediatric@medixra.com',
        description: 'Dedicated to providing the best pediatric medical equipment for hospitals and clinics across Islamabad.',
        website: 'https://peds-care.example.com',
        isApproved: true,
        createdAt: new Date(Date.now() - 8000000).toISOString()
      },
      {
        id: 'vendor4',
        name: 'Surgical Equipment Co',
        contactPerson: 'Muhammad Ali',
        city: 'Rawalpindi',
        specialties: ['General Surgery', 'Orthopedic Surgery'],
        whatsAppNumber: '03111234567',
        email: 'surgical@medixra.com',
        description: 'Your trusted partner for all types of surgical instruments and OT furniture.',
        website: '',
        isApproved: true,
        createdAt: new Date(Date.now() - 7000000).toISOString()
      },
      {
        id: 'vendor5',
        name: 'Cardiology Specialists',
        contactPerson: 'Dr. Ayesha',
        city: 'Multan',
        specialties: ['Cardiology'],
        whatsAppNumber: '03001234568',
        email: 'cardio@medixra.com',
        description: 'Premium cardiology equipment including ECG machines, patient monitors, and defibrillators.',
        website: '',
        isApproved: true,
        createdAt: new Date(Date.now() - 6000000).toISOString()
      }
    ];
    localStorage.setItem('vendors', JSON.stringify(sampleVendors));
  }

  // Initialize users (Legacy/Auth context)
  if (!localStorage.getItem('users')) {
    const sampleUsers = [
      { 
        id: 'user_vendor1', 
        name: 'MedTech Solutions', 
        email: 'sales@medtech.com', 
        role: 'vendor', 
        vendorId: 'vendor1',
        resetToken: null,
        resetTokenExpiry: null
      }
    ];
    localStorage.setItem('users', JSON.stringify(sampleUsers));
  }

  // Initialize Listings with Array support for Specialties and Categories
  if (!localStorage.getItem('listings')) {
    const sampleListings = [
      {
        id: '1',
        title: 'Mindray Patient Monitor uMEC 10',
        specialties: ['Cardiology', 'Internal Medicine'],
        categories: ['Monitoring Devices', 'Diagnostic Equipment'],
        city: 'Lahore',
        condition: 'Used',
        pricePKR: 125000,
        manufacturer: 'Mindray',
        model: 'uMEC 10',
        technicalDetails: '10.4 inch screen, multi-parameter monitoring, 4 hours battery life.',
        whatsAppNumber: '923001234567',
        images: ['https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800'],
        isFeatured: true,
        vendorId: 'vendor1',
        createdAt: new Date(Date.now() - 10000000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Digital X-Ray System XR-5000',
        specialties: ['Radiology', 'Orthopedic Surgery'],
        categories: ['Imaging Equipment', 'Diagnostic Equipment'],
        city: 'Karachi',
        condition: 'New',
        pricePKR: 2800000,
        manufacturer: 'RadiCare',
        model: 'XR-5000',
        technicalDetails: 'High-resolution digital detector, 50kW generator, ceiling suspension.',
        whatsAppNumber: '923007654321',
        images: ['https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800'],
        isFeatured: true,
        vendorId: 'vendor1',
        createdAt: new Date(Date.now() - 5000000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Surgical Microscope Leica M525',
        specialties: ['Neurology', 'General Surgery', 'ENT (Otolaryngology)'],
        categories: ['Surgical Instruments', 'Hospital Furniture'],
        city: 'Islamabad',
        condition: 'Refurbished',
        pricePKR: 1500000,
        manufacturer: 'Leica',
        model: 'M525 F50',
        technicalDetails: 'Advanced optics for neurosurgery, integrated HD camera.',
        whatsAppNumber: '923331112222',
        images: ['https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800'],
        isFeatured: true,
        vendorId: 'vendor2',
        createdAt: new Date(Date.now() - 2000000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('listings', JSON.stringify(sampleListings));
  }

  // Initialize detailed categories if not exist
  if (!localStorage.getItem('categories')) {
    const detailedCategories = [
      { id: 'diagnostic-imaging', name: 'Diagnostic Imaging' },
      { id: 'surgical-equipment', name: 'Surgical Equipment' },
      { id: 'patient-monitoring', name: 'Patient Monitoring' },
      { id: 'dental-equipment', name: 'Dental Equipment' },
      { id: 'laboratory-equipment', name: 'Laboratory Equipment' }
    ];
    localStorage.setItem('categories', JSON.stringify(detailedCategories));
  }

  // Initialize reviews
  if (!localStorage.getItem('reviews')) {
    localStorage.setItem('reviews', JSON.stringify([]));
  }

  // Initialize wishlists
  if (!localStorage.getItem('wishlists')) {
    localStorage.setItem('wishlists', JSON.stringify([]));
  }

  // Initialize carts
  if (!localStorage.getItem('carts')) {
    localStorage.setItem('carts', JSON.stringify([]));
  }

  // Initialize inquiries
  if (!localStorage.getItem('inquiries')) {
    localStorage.setItem('inquiries', JSON.stringify([]));
  }

  // Initialize verifications
  if (!localStorage.getItem('verifications')) {
    localStorage.setItem('verifications', JSON.stringify([]));
  }
};

initializeSampleData();

// Vendor API
export const vendorAPI = {
  getVendors: () => JSON.parse(localStorage.getItem('vendors') || '[]'),
  
  getApprovedVendors: () => {
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    return vendors.filter(v => v.isApproved);
  },
  
  getVendorById: (vendorId) => {
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    return vendors.find(v => v.id === vendorId);
  },
  
  createVendor: (vendorData) => {
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    const newVendor = {
      ...vendorData,
      id: crypto.randomUUID ? crypto.randomUUID() : `vendor_${Date.now()}`,
      isApproved: false, // Default to false
      createdAt: new Date().toISOString()
    };
    vendors.push(newVendor);
    localStorage.setItem('vendors', JSON.stringify(vendors));
    return newVendor;
  },
  
  updateVendor: (vendorId, vendorData) => {
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    const index = vendors.findIndex(v => v.id === vendorId);
    if (index !== -1) {
      vendors[index] = { ...vendors[index], ...vendorData };
      localStorage.setItem('vendors', JSON.stringify(vendors));
      return vendors[index];
    }
    return null;
  },
  
  deleteVendor: (vendorId) => {
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    const filtered = vendors.filter(v => v.id !== vendorId);
    localStorage.setItem('vendors', JSON.stringify(filtered));
    return true;
  },
  
  getVendorsByCity: (city) => {
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    return vendors.filter(v => v.isApproved && v.city === city);
  },
  
  getVendorsBySpecialty: (specialty) => {
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    return vendors.filter(v => v.isApproved && v.specialties.includes(specialty));
  }
};

// Listings API
export const listingsAPI = {
  getAll: () => JSON.parse(localStorage.getItem('listings') || '[]'),

  getFeaturedListings: () => {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    return listings
      .filter(l => l.isFeatured)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  },

  getLatestListings: (limit = 6) => {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    return listings
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  },

  getListingById: (id) => {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const listing = listings.find(l => l.id === id);
    if (listing) {
      // Ensure arrays exist for legacy data compatibility
      if (!listing.specialties && listing.specialty) listing.specialties = [listing.specialty];
      if (!listing.categories && listing.category) listing.categories = [listing.category];
      if (!listing.specialties) listing.specialties = [];
      if (!listing.categories) listing.categories = [];
    }
    return listing;
  },

  searchListings: (filters = {}) => {
    let listings = JSON.parse(localStorage.getItem('listings') || '[]');

    // Normalize listings for searching
    listings = listings.map(l => ({
      ...l,
      specialties: Array.isArray(l.specialties) ? l.specialties : (l.specialty ? [l.specialty] : []),
      categories: Array.isArray(l.categories) ? l.categories : (l.category ? [l.category] : [])
    }));

    if (filters.search) {
      const search = filters.search.toLowerCase();
      listings = listings.filter(l => 
        l.title.toLowerCase().includes(search) || 
        l.model?.toLowerCase().includes(search) ||
        l.manufacturer?.toLowerCase().includes(search) ||
        l.specialties.some(s => s.toLowerCase().includes(search)) ||
        l.categories.some(c => c.toLowerCase().includes(search))
      );
    }

    if (filters.specialty && filters.specialty !== 'All') {
      listings = listings.filter(l => l.specialties.includes(filters.specialty));
    }
    if (filters.specialties && filters.specialties.length > 0) {
        listings = listings.filter(l => 
          filters.specialties.some(s => l.specialties.includes(s))
        );
    }
    
    if (filters.category && filters.category !== 'All') {
      listings = listings.filter(l => l.categories.includes(filters.category));
    }
    if (filters.categories && filters.categories.length > 0) {
        listings = listings.filter(l => 
            filters.categories.some(c => l.categories.includes(c))
        );
    }

    if (filters.city && filters.city !== 'All') {
      listings = listings.filter(l => l.city === filters.city);
    }
    if (filters.condition && filters.condition !== 'All') {
      listings = listings.filter(l => l.condition === filters.condition);
    }
    if (filters.minPrice) {
      listings = listings.filter(l => l.pricePKR >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      listings = listings.filter(l => l.pricePKR <= Number(filters.maxPrice));
    }
    if (filters.vendorId) {
      listings = listings.filter(l => l.vendorId === filters.vendorId);
    }

    return listings;
  },

  createListing: (data) => {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const newListing = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFeatured: data.isFeatured || false,
      vendorId: data.vendorId || null,
      specialties: Array.isArray(data.specialties) ? data.specialties : (data.specialty ? [data.specialty] : []),
      categories: Array.isArray(data.categories) ? data.categories : (data.category ? [data.category] : [])
    };
    listings.push(newListing);
    localStorage.setItem('listings', JSON.stringify(listings));
    return newListing;
  },

  updateListing: (id, data) => {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const index = listings.findIndex(l => l.id === id);
    if (index !== -1) {
      const updatedListing = { 
        ...listings[index], 
        ...data, 
        updatedAt: new Date().toISOString()
      };
      
      // Ensure array consistency
      if (data.specialties) updatedListing.specialties = data.specialties;
      if (data.categories) updatedListing.categories = data.categories;

      listings[index] = updatedListing;
      localStorage.setItem('listings', JSON.stringify(listings));
      return listings[index];
    }
    return null;
  },

  deleteListing: (id) => {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const filtered = listings.filter(l => l.id !== id);
    localStorage.setItem('listings', JSON.stringify(filtered));
    return true;
  }
};

// Product API
export const productAPI = {
  getAll: () => JSON.parse(localStorage.getItem('listings') || '[]'),

  getById: (id) => {
    return listingsAPI.getListingById(id);
  },

  search: (filters = {}) => {
    return listingsAPI.searchListings(filters);
  },

  create: (data) => {
    return listingsAPI.createListing(data);
  },

  update: (id, data) => {
    return listingsAPI.updateListing(id, data);
  },

  delete: (id) => {
    return listingsAPI.deleteListing(id);
  },

  getCountsBySpecialty: () => {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const counts = {};
    listings.forEach(l => {
        const specs = Array.isArray(l.specialties) ? l.specialties : (l.specialty ? [l.specialty] : []);
        specs.forEach(s => {
            counts[s] = (counts[s] || 0) + 1;
        });
    });
    return counts;
  }
};

// Review API
export const reviewAPI = {
  getAll: () => JSON.parse(localStorage.getItem('reviews') || '[]'),

  getByListingId: (listingId) => {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    return reviews.filter(r => r.listingId === listingId);
  },

  getProductReviews: (productId) => {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    return reviews.filter(r => r.listingId === productId);
  },

  getByVendorId: (vendorId) => {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    return reviews.filter(r => r.vendorId === vendorId);
  },

  create: (data) => {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const newReview = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : `review_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    return newReview;
  },

  update: (id, data) => {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const index = reviews.findIndex(r => r.id === id);
    if (index !== -1) {
      reviews[index] = { ...reviews[index], ...data };
      localStorage.setItem('reviews', JSON.stringify(reviews));
      return reviews[index];
    }
    return null;
  },

  delete: (id) => {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const filtered = reviews.filter(r => r.id !== id);
    localStorage.setItem('reviews', JSON.stringify(filtered));
    return true;
  }
};

// Verification API
export const verificationAPI = {
  getAll: () => JSON.parse(localStorage.getItem('verifications') || '[]'),

  getByVendorId: (vendorId) => {
    const verifications = JSON.parse(localStorage.getItem('verifications') || '[]');
    return verifications.find(v => v.vendorId === vendorId);
  },

  create: (data) => {
    const verifications = JSON.parse(localStorage.getItem('verifications') || '[]');
    const newVerification = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : `verification_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    verifications.push(newVerification);
    localStorage.setItem('verifications', JSON.stringify(verifications));
    return newVerification;
  },

  update: (id, data) => {
    const verifications = JSON.parse(localStorage.getItem('verifications') || '[]');
    const index = verifications.findIndex(v => v.id === id);
    if (index !== -1) {
      verifications[index] = { ...verifications[index], ...data };
      localStorage.setItem('verifications', JSON.stringify(verifications));
      return verifications[index];
    }
    return null;
  },

  delete: (id) => {
    const verifications = JSON.parse(localStorage.getItem('verifications') || '[]');
    const filtered = verifications.filter(v => v.id !== id);
    localStorage.setItem('verifications', JSON.stringify(filtered));
    return true;
  }
};

// Wishlist API
export const wishlistAPI = {
  getAll: () => JSON.parse(localStorage.getItem('wishlists') || '[]'),

  getByUserId: (userId) => {
    const wishlists = JSON.parse(localStorage.getItem('wishlists') || '[]');
    return wishlists.filter(w => w.userId === userId);
  },

  addItem: (userId, listingId) => {
    const wishlists = JSON.parse(localStorage.getItem('wishlists') || '[]');
    const existingItem = wishlists.find(w => w.userId === userId && w.listingId === listingId);
    
    if (!existingItem) {
      const newItem = {
        id: crypto.randomUUID ? crypto.randomUUID() : `wishlist_${Date.now()}`,
        userId,
        listingId,
        createdAt: new Date().toISOString()
      };
      wishlists.push(newItem);
      localStorage.setItem('wishlists', JSON.stringify(wishlists));
      return newItem;
    }
    return existingItem;
  },

  removeItem: (userId, listingId) => {
    const wishlists = JSON.parse(localStorage.getItem('wishlists') || '[]');
    const filtered = wishlists.filter(w => !(w.userId === userId && w.listingId === listingId));
    localStorage.setItem('wishlists', JSON.stringify(filtered));
    return true;
  },

  isInWishlist: (userId, listingId) => {
    const wishlists = JSON.parse(localStorage.getItem('wishlists') || '[]');
    return wishlists.some(w => w.userId === userId && w.listingId === listingId);
  }
};

// Cart API
export const cartAPI = {
  getAll: () => JSON.parse(localStorage.getItem('carts') || '[]'),

  getByUserId: (userId) => {
    const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    return carts.filter(c => c.userId === userId);
  },

  addItem: (userId, listingId, quantity = 1) => {
    const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    const existingItem = carts.find(c => c.userId === userId && c.listingId === listingId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = {
        id: crypto.randomUUID ? crypto.randomUUID() : `cart_${Date.now()}`,
        userId,
        listingId,
        quantity,
        createdAt: new Date().toISOString()
      };
      carts.push(newItem);
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    return carts.find(c => c.userId === userId && c.listingId === listingId);
  },

  removeItem: (userId, listingId) => {
    const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    const filtered = carts.filter(c => !(c.userId === userId && c.listingId === listingId));
    localStorage.setItem('carts', JSON.stringify(filtered));
    return true;
  },

  updateQuantity: (userId, listingId, quantity) => {
    const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    const item = carts.find(c => c.userId === userId && c.listingId === listingId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem('carts', JSON.stringify(carts));
      return item;
    }
    return null;
  },

  clearCart: (userId) => {
    const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    const filtered = carts.filter(c => c.userId !== userId);
    localStorage.setItem('carts', JSON.stringify(filtered));
    return true;
  }
};

// Inquiry API
export const inquiryAPI = {
  getAll: () => JSON.parse(localStorage.getItem('inquiries') || '[]'),

  getByListingId: (listingId) => {
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    return inquiries.filter(i => i.listingId === listingId);
  },

  getByVendorId: (vendorId) => {
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    return inquiries.filter(i => i.vendorId === vendorId);
  },

  create: (data) => {
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const newInquiry = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : `inquiry_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    return newInquiry;
  },

  update: (id, data) => {
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const index = inquiries.findIndex(i => i.id === id);
    if (index !== -1) {
      inquiries[index] = { ...inquiries[index], ...data };
      localStorage.setItem('inquiries', JSON.stringify(inquiries));
      return inquiries[index];
    }
    return null;
  },

  delete: (id) => {
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const filtered = inquiries.filter(i => i.id !== id);
    localStorage.setItem('inquiries', JSON.stringify(filtered));
    return true;
  }
};

// Category API
export const categoryAPI = {
  getAll: () => JSON.parse(localStorage.getItem('categories') || '[]'),

  getById: (id) => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    return categories.find(c => c.id === id);
  },

  create: (data) => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const newCategory = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : `category_${Date.now()}`
    };
    categories.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));
    return newCategory;
  },

  update: (id, data) => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...data };
      localStorage.setItem('categories', JSON.stringify(categories));
      return categories[index];
    }
    return null;
  },

  delete: (id) => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const filtered = categories.filter(c => c.id !== id);
    localStorage.setItem('categories', JSON.stringify(filtered));
    return true;
  }
};

// Auth API for Password Reset
export const authAPI = {
  forgotPassword: (contact, type = 'email') => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let userIndex = -1;
    
    if (type === 'email') {
      userIndex = users.findIndex(u => u.email === contact);
    } else {
      userIndex = users.findIndex(u => u.whatsAppNumber === contact || u.phone === contact);
    }
    
    if (userIndex === -1) {
      return { success: false, error: 'No account found with this contact information.' };
    }
    
    // Generate a random token
    const token = Array.from(crypto.getRandomValues(new Uint8Array(24)), b => b.toString(16).padStart(2, "0")).join("");
    const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
    
    users[userIndex].resetToken = token;
    users[userIndex].resetTokenExpiry = expiry;
    
    localStorage.setItem('users', JSON.stringify(users));
    
    // In a real application, you would trigger an email or SMS here
    console.log(`[Mock Email/SMS] Password reset link for ${contact}: /reset-password/${token}`);
    
    return { success: true, message: 'Reset instructions sent.', token }; 
  },
  
  validateResetToken: (token) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.resetToken === token && u.resetTokenExpiry > Date.now());
    
    if (!user) {
      return { success: false, error: 'This reset link is invalid or has expired.' };
    }
    
    return { success: true, user: { email: user.email, id: user.id } };
  },
  
  resetPassword: (token, newPassword) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.resetToken === token && u.resetTokenExpiry > Date.now());
    
    if (userIndex === -1) {
      return { success: false, error: 'This reset link is invalid or has expired. Please request a new one.' };
    }
    
    // Update password and clear token
    users[userIndex].password = newPassword; 
    users[userIndex].resetToken = null;
    users[userIndex].resetTokenExpiry = null;
    
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, message: 'Password has been reset successfully.' };
  },

  resendResetInstructions: (contact, type = 'email') => {
    return authAPI.forgotPassword(contact, type);
  }
};


// User API
export const userAPI = {
  getAll: () => JSON.parse(localStorage.getItem('users') || '[]'),

  getById: (id) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(u => u.id === id);
  },

  getByEmail: (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(u => u.email === email);
  },

  create: (data) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
      resetToken: null,
      resetTokenExpiry: null
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  },

  update: (id, data) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      localStorage.setItem('users', JSON.stringify(users));
      return users[index];
    }
    return null;
  },

  delete: (id) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(filtered));
    return true;
  }
};

// Utilities for Dropdowns
export const getSpecialties = () => [
  { id: 'internal-medicine', name: 'Internal Medicine' },
  { id: 'general-surgery', name: 'General Surgery' },
  { id: 'pediatrics', name: 'Pediatrics' },
  { id: 'obstetrics-gynecology', name: 'Obstetrics & Gynecology' },
  { id: 'cardiology', name: 'Cardiology' },
  { id: 'neurology', name: 'Neurology' },
  { id: 'orthopedic-surgery', name: 'Orthopedic Surgery' },
  { id: 'radiology', name: 'Radiology' },
  { id: 'anesthesiology', name: 'Anesthesiology' },
  { id: 'dentistry', name: 'Dentistry' },
  { id: 'psychiatry', name: 'Psychiatry' },
  { id: 'dermatology', name: 'Dermatology' },
  { id: 'oncology', name: 'Oncology' },
  { id: 'urology', name: 'Urology' },
  { id: 'ent', name: 'ENT (Otolaryngology)' },
  { id: 'ophthalmology', name: 'Ophthalmology' }
];

export const getSurgicalSpecialties = () => [
  { id: 'general-surgery', name: 'General Surgery' },
  { id: 'orthopedic-surgery', name: 'Orthopedic Surgery' },
  { id: 'neurosurgery', name: 'Neurosurgery' },
  { id: 'cardiovascular-surgery', name: 'Cardiovascular Surgery' },
  { id: 'thoracic-surgery', name: 'Thoracic Surgery' },
  { id: 'vascular-surgery', name: 'Vascular Surgery' },
  { id: 'urological-surgery', name: 'Urological Surgery' },
  { id: 'gynecological-surgery', name: 'Gynecological Surgery' },
  { id: 'pediatric-surgery', name: 'Pediatric Surgery' },
  { id: 'plastic-surgery', name: 'Plastic Surgery' }
];

export const getCategories = () => [
  { id: 'diagnostic-equipment', name: 'Diagnostic Equipment' },
  { id: 'surgical-instruments', name: 'Surgical Instruments' },
  { id: 'hospital-furniture', name: 'Hospital Furniture' },
  { id: 'monitoring-devices', name: 'Monitoring Devices' },
  { id: 'imaging-equipment', name: 'Imaging Equipment' },
  { id: 'laboratory-equipment', name: 'Laboratory Equipment' },
  { id: 'dental-equipment', name: 'Dental Equipment' },
  { id: 'rehabilitation-physiotherapy', name: 'Rehabilitation & Physiotherapy' },
  { id: 'consumables-disposables', name: 'Consumables & Disposables' },
  { id: 'used-refurbished', name: 'Used/Refurbished Equipment' }
];

export const getCities = () => [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Hyderabad', 
  'Gujranwala', 'Sialkot', 'Sargodha', 'Bahawalpur', 'Jhang', 'Mardan', 'Abbottabad', 'Dera Ghazi Khan', 
  'Sukkur', 'Larkana', 'Mirpur Khas'
];

// Export getVendorById as a standalone function for backward compatibility
export const getVendorById = (vendorId) => {
  return vendorAPI.getVendorById(vendorId);
};
