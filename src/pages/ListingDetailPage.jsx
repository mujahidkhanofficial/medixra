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
  Stethoscope,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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

  const getConditionVariant = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'new': return 'default'; // primary color
      case 'used': return 'secondary';
      case 'refurbished': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {seo}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity" onClick={() => setIsLightboxOpen(false)}>
          <div className="relative max-w-7xl w-full h-full flex flex-col justify-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 z-50 text-white/70 hover:text-white" onClick={() => setIsLightboxOpen(false)}>
              <X size={32} />
            </button>
            <div className="relative flex items-center justify-center h-full">
              <img
                src={images[currentImageIndex]}
                alt={listing.title}
                className="max-h-full max-w-full object-contain"
              />
              {images.length > 1 && (
                <>
                  <button className="absolute left-0 p-2 text-white/50 hover:text-white transition-colors" onClick={prevImage}>
                    <ChevronLeft size={48} />
                  </button>
                  <button className="absolute right-0 p-2 text-white/50 hover:text-white transition-colors" onClick={nextImage}>
                    <ChevronRight size={48} />
                  </button>
                </>
              )}
            </div>
            <div className="text-center text-white/70 mt-4">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Listings</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-background group cursor-pointer shadow-sm" onClick={() => setIsLightboxOpen(true)}>
              <img
                src={images[currentImageIndex]}
                alt={`${listing.title} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />

              {images.length > 1 && (
                <>
                  <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100" onClick={prevImage}>
                    <ChevronLeft size={20} className="text-foreground" />
                  </button>
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100" onClick={nextImage}>
                    <ChevronRight size={20} className="text-foreground" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}

              <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm">
                <Maximize2 size={16} className="text-muted-foreground" />
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                      currentImageIndex === idx ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-200"
                    )}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{listing.title}</h1>

              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={getConditionVariant(listing.condition)} className="text-sm px-3 py-1">
                  {listing.condition === 'New' && <CheckCircle2 size={14} className="mr-1.5" />}
                  {listing.condition}
                </Badge>

                <Badge variant="outline" className="text-sm px-3 py-1 flex items-center gap-1.5 text-muted-foreground border-muted-foreground/30">
                  <MapPin size={14} /> {listing.city}
                </Badge>
              </div>

              {/* Specialties & Categories Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {listing.specialties?.map(s => (
                  <Badge key={s} variant="secondary" className="bg-secondary/40 text-secondary-foreground hover:bg-secondary/60">
                    {s}
                  </Badge>
                ))}
                {listing.categories?.map(c => (
                  <Badge key={c} variant="outline" className="text-xs">
                    {c}
                  </Badge>
                ))}
              </div>

              <div className="pt-4 pb-2">
                <div className="text-4xl font-bold text-primary tabular-nums tracking-tight">{formatPKR(listing.pricePKR)}</div>
                <p className="text-sm text-muted-foreground mt-1">Fixed Price (PKR) • Tax Included if applicable</p>
              </div>
            </div>

            <Separator />

            {/* Contact Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button size="lg" className="w-full gap-2 text-base h-12 bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-sm" asChild>
                <a
                  href={`https://wa.me/${contactNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} />
                  {vendor ? 'WhatsApp Vendor' : 'WhatsApp Seller'}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full gap-2 text-base h-12 border-2" asChild>
                <a href={`tel:${contactNumber}`}>
                  <Phone size={18} /> Call {contactNumber}
                </a>
              </Button>
            </div>

            {/* Disclaimer Box Inserted Here */}
            <MedicalDisclaimerBox />

            {/* Vendor Information Section */}
            {vendor && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" /> Vendor Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">{vendor.name}</h4>
                      <div className="flex flex-col gap-1 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User size={14} /> {vendor.contactPerson}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} /> {vendor.city}
                        </div>
                      </div>
                    </div>
                    <Link to={`/vendors/${vendor.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 -mr-2">
                        View Profile <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>

                  {vendor.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {vendor.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Specifications Grid */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-semibold text-lg text-foreground">
                <Activity size={20} className="text-primary" /> Key Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg border border-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Manufacturer</p>
                  <p className="font-medium text-foreground">{listing.manufacturer || 'N/A'}</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Model</p>
                  <p className="font-medium text-foreground">{listing.model || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-semibold text-lg text-foreground">
                <Info size={20} className="text-primary" /> Description
              </h3>
              <div className="prose prose-sm prose-slate max-w-none text-muted-foreground">
                <p>
                  {isDescriptionExpanded
                    ? listing.technicalDetails
                    : `${listing.technicalDetails.slice(0, 200)}${listing.technicalDetails.length > 200 ? '...' : ''}`
                  }
                </p>
              </div>
              {listing.technicalDetails.length > 200 && (
                <Button variant="link" onClick={toggleDescription} className="p-0 h-auto font-semibold text-primary">
                  {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                </Button>
              )}
            </div>

            {/* Safety Box */}
            <Card className="bg-blue-50/50 border-blue-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-blue-900">
                  <Shield className="w-4 h-4" /> Listing details & safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-sm text-blue-800/80">
                  <li className="flex items-start gap-2.5">
                    <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>Medixra does not handle payments - all transactions are between buyer and seller directly.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-green-600 shrink-0 mt-0.5" />
                    <span>Please verify equipment condition thoroughly before completing any purchase.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Related Listings Section */}
        {relatedListings.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">Related Equipment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedListings.map(item => (
                <Link to={`/listing/${item.id}`} key={item.id} className="group block">
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow border-muted">
                    <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                      <img
                        src={item.images[0] || 'https://via.placeholder.com/300x200'}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge className="absolute top-3 right-3" variant={getConditionVariant(item.condition)}>
                        {item.condition}
                      </Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">{item.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-xs">
                        <MapPin size={12} /> {item.city}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="font-bold text-primary">{formatPKR(item.pricePKR)}</div>
                    </CardContent>
                  </Card>
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
