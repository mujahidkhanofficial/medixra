import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { listingsAPI } from '@/services/api';
import { cn } from '@/lib/utils';

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

  const getConditionVariant = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'new': return 'default'; // Primary color for New
      case 'refurbished': return 'secondary';
      case 'used': return 'outline';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-muted/40">
        <div className="container-base">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (listings.length === 0) return null;

  return (
    <section className="py-24 bg-background border-t">
      <div className="container-base">

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-border/40 pb-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Featured Listings</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">Discover premium medical equipment verified for quality and performance.</p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="gap-2 group border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5">
              View All Listings <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 border-border/50 bg-card group">
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden bg-muted/30">
                  <img
                    src={item.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant={getConditionVariant(item.condition)} className="uppercase tracking-wider font-bold text-[10px] bg-white/90 backdrop-blur-sm shadow-sm border-0 text-foreground">
                      {item.condition}
                    </Badge>
                  </div>
                  {item.isFeatured && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground gap-1 shadow-md border-0">
                        <ShieldCheck className="w-3 h-3" /> Featured
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <CardContent className="flex-grow p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary/80 uppercase tracking-wide bg-primary/5 px-2 py-1 rounded-md">
                      {item.categories && item.categories.length > 0 ? item.categories[0] : (item.category || 'Equipment')}
                    </span>
                  </div>

                  <Link to={`/listing/${item.id}`} className="block">
                    <h3 className="text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="flex items-center text-sm text-muted-foreground font-medium">
                    <span className="truncate">{item.manufacturer} • {item.model}</span>
                  </div>

                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1.5 opacity-70" />
                    {item.city}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex justify-between items-center border-t bg-muted/20 mt-auto">
                  <div className="py-2">
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Price</p>
                    <p className="text-xl font-bold text-primary">{formatPrice(item.pricePKR)}</p>
                  </div>

                  <a
                    href={`https://wa.me/${item.whatsAppNumber}?text=Hi, I am interested in your listing: ${item.title} on Medixra.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="bg-[#25D366] hover:bg-[#1ebd59] text-white shadow-sm gap-2 whitespace-nowrap">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsSection;
