
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { listingsAPI, vendorAPI } from '@/services/api';
import { formatPKR, cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import MedicalDisclaimerBox from '@/components/MedicalDisclaimerBox';
import { 
  MapPin, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Building2,
  Tag,
  Activity,
  User,
  Stethoscope
} from 'lucide-react';
import './ListingDetailPage.css';

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [listing, setListing] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [relatedListings, setRelatedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Fetch listing data
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      window.scrollTo(0, 0);

      try {
        const item = listingsAPI.getListingById(id);
        
        if (!item) {
          toast({
            variant: "destructive",
            title: "Listing not found",
            description: "The requested listing could not be found.",
          });
          navigate('/products');
          return;
        }

        setListing(item);
        
        // Fetch vendor if exists
        if (item.vendorId) {
          const vendorData = vendorAPI.getVendorById(item.vendorId);
          setVendor(vendorData);
        }
        
        // Fetch related listings
        const allListings = listingsAPI.getAll();
        const related = allListings
          .filter(l => 
            l.id !== item.id && 
            (
                (l.specialties && l.specialties.some(s => item.specialties?.includes(s))) || 
                (l.categories && l.categories.some(c => item.categories?.includes(c)))
            )
          )
          .slice(0, 4);
        setRelatedListings(related);

      } catch (error) {
        console.error("Error fetching listing:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load listing details.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate, toast]);

  const seo = useSEO({
    title: listing ? `${listing.title} for Sale in ${listing.city}, Pakistan | Medixra Listing` : 'Loading... – Medixra',
    description: listing ? `View full details, specifications, condition and price for ${listing.title}. Contact the vendor directly via WhatsApp on Medixra to discuss availability, inspection and purchase.` : 'Loading listing details...',
    ogTitle: listing ? `${listing.title} for Sale in ${listing.city}, Pakistan | Medixra` : 'Loading...',
    ogDescription: listing ? `Buy ${listing.title} in ${listing.city}. Price: ${formatPKR(listing.pricePKR)}. Condition: ${listing.condition}.` : '',
    ogImage: listing?.images?.[0],
    canonicalUrl: listing ? `https://medixra.com/listing/${listing.id}` : '',
    ogType: 'product'
  });

  // Gallery Navigation Handlers
  const nextImage = (e) => {
    e?.stopPropagation();
    if (listing?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
    }
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (listing?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
    }
  };

  const toggleDescription = () => setIsDescriptionExpanded(!isDescriptionExpanded);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!listing) return null;

  const images = listing.images && listing.images.length > 0 
    ? listing.images 
    : ['https://via.placeholder.com/800x600?text=No+Image+Available'];

  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in ${listing.title} listed on Medixra.`
  );
  
  // Determine contact number: use vendor's if linked, otherwise use listing's
  const contactNumber = vendor ? vendor.whatsAppNumber : listing.whatsAppNumber;

  return (
    <div className="detail-page">
      {seo}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>
              <X size={32} />
            </button>
            <img 
              src={images[currentImageIndex]} 
              alt={listing.title} 
              className="lightbox-image" 
            />
            {images.length > 1 && (
              <>
                <button className="gallery-nav-btn gallery-nav-prev" onClick={prevImage} style={{left: '-60px'}}>
                  <ChevronLeft size={24} />
                </button>
                <button className="gallery-nav-btn gallery-nav-next" onClick={nextImage} style={{right: '-60px'}}>
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="detail-container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link to="/">Home</Link> 
          <span className="separator">/</span> 
          <Link to="/products">Listings</Link>
          <span className="separator">/</span>
          <span className="current">{listing.title}</span>
        </div>

        <div className="detail-grid">
          {/* Left Column: Image Gallery */}
          <div className="gallery-section">
            <div className="main-image-container" onClick={() => setIsLightboxOpen(true)}>
              <img 
                src={images[currentImageIndex]} 
                alt={`${listing.title} - View ${currentImageIndex + 1}`} 
                className="main-image"
              />
              
              {images.length > 1 && (
                <>
                  <button className="gallery-nav-btn gallery-nav-prev" onClick={prevImage}>
                    <ChevronLeft size={20} />
                  </button>
                  <button className="gallery-nav-btn gallery-nav-next" onClick={nextImage}>
                    <ChevronRight size={20} />
                  </button>
                  <div className="image-counter">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
              
              <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full pointer-events-none">
                <Maximize2 size={16} className="text-gray-700" />
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="thumbnail-strip">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={cn("thumbnail-btn", currentImageIndex === idx && "active")}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="thumbnail-img" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information */}
          <div className="info-section">
            <div className="listing-header">
              <h1 className="listing-title">{listing.title}</h1>
              
              <div className="listing-meta-row">
                <span className={`condition-badge badge-${listing.condition}`}>
                  {listing.condition === 'New' && <CheckCircle2 size={14} />}
                  {listing.condition}
                </span>
                
                <span className="location-tag">
                  <MapPin size={16} /> {listing.city}
                </span>
              </div>

              {/* Specialties & Categories Badges */}
              <div className="mt-4">
                 {listing.specialties && listing.specialties.length > 0 && (
                     <div className="badge-group">
                         <span className="badge-label">Specialties</span>
                         <div className="badge-list">
                             {listing.specialties.map(s => (
                                 <span key={s} className="tech-badge">{s}</span>
                             ))}
                         </div>
                     </div>
                 )}
                 {listing.categories && listing.categories.length > 0 && (
                     <div className="badge-group">
                         <span className="badge-label">Categories</span>
                         <div className="badge-list">
                             {listing.categories.map(c => (
                                 <span key={c} className="tech-badge">{c}</span>
                             ))}
                         </div>
                     </div>
                 )}
              </div>

              <div className="price-section">
                <div className="price-value">{formatPKR(listing.pricePKR)}</div>
                <div className="price-label">Fixed Price (PKR)</div>
              </div>
            </div>

            {/* Disclaimer Box Inserted Here */}
            <MedicalDisclaimerBox />

            {/* Vendor Information Section */}
            {vendor ? (
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="text-blue-600" size={20} /> Vendor Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{vendor.name}</h4>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <User size={14} /> {vendor.contactPerson}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <MapPin size={14} /> {vendor.city}
                      </div>
                    </div>
                  </div>
                  
                  {vendor.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {vendor.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {vendor.specialties && vendor.specialties.slice(0, 3).map((spec, i) => (
                      <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 mt-3 border-t border-gray-100 flex gap-3">
                    <Link to="/vendors" className="text-blue-600 text-sm font-medium hover:underline">
                      View All Vendors
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Specifications Grid */}
            <div className="specs-container">
              <h3 className="section-heading"><Activity size={20} className="text-blue-600" /> Key Details</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Manufacturer</span>
                  <span className="spec-value">{listing.manufacturer || 'N/A'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Model</span>
                  <span className="spec-value">{listing.model || 'N/A'}</span>
                </div>
              </div>

              {/* Description */}
              <div className="description-container">
                <h3 className="section-heading"><Info size={20} className="text-blue-600" /> Description</h3>
                <div className="description-text">
                  {isDescriptionExpanded 
                    ? listing.technicalDetails 
                    : `${listing.technicalDetails.slice(0, 200)}${listing.technicalDetails.length > 200 ? '...' : ''}`
                  }
                </div>
                {listing.technicalDetails.length > 200 && (
                  <button onClick={toggleDescription} className="read-more-btn">
                    {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>
            </div>

            {/* Contact Section */}
            <div className="contact-section">
              <a 
                href={`https://wa.me/${contactNumber}?text=${whatsappMessage}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-btn"
              >
                <MessageCircle size={24} /> 
                {vendor ? 'Contact Vendor via WhatsApp' : 'Contact Seller via WhatsApp'}
              </a>
              <a href={`tel:${contactNumber}`} className="contact-alt-link">
                or call {contactNumber}
              </a>
            </div>

            {/* Safety Box */}
            <div className="safety-box">
              <div className="safety-title">
                <Shield size={18} className="text-blue-600" /> Listing details & safety
              </div>
              <ul className="safety-list">
                <li className="safety-item">
                  <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>Medixra does not handle payments - all transactions are between buyer and seller directly.</span>
                </li>
                <li className="safety-item">
                  <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <span>Please verify equipment condition thoroughly before completing any purchase.</span>
                </li>
                <li className="safety-item">
                  <MessageCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>Deals are negotiated and completed directly via WhatsApp.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Related Listings Section */}
        {relatedListings.length > 0 && (
          <div className="related-listings-section">
            <div className="related-header">
              <h2 className="text-2xl font-bold text-gray-900">Related Equipment</h2>
            </div>
            <div className="related-grid">
              {relatedListings.map(item => (
                <Link to={`/listing/${item.id}`} key={item.id} className="related-card group">
                   <div className="related-img-container">
                      <img 
                        src={item.images[0] || 'https://via.placeholder.com/300x200'} 
                        alt={item.title} 
                        className="related-img group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className={`related-badge badge-${item.condition}`}>
                        {item.condition}
                      </span>
                   </div>
                   <div className="related-content">
                      <h3 className="related-title group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <div className="related-location">
                        <MapPin size={14} /> {item.city}
                      </div>
                      <div className="related-price">{formatPKR(item.pricePKR)}</div>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingDetailPage;
