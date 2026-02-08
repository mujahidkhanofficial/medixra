import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { listingsAPI } from '@/services/api';

const FeaturedEquipmentGrid = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Helper to format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            maximumFractionDigits: 0
        }).format(price).replace('PKR', '₨');
    };

    const getConditionVariant = (condition) => {
        switch (condition?.toLowerCase()) {
            case 'new': return 'default';
            case 'refurbished': return 'secondary';
            case 'used': return 'outline';
            default: return 'outline';
        }
    };

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 600));

                let data = listingsAPI.getFeaturedListings();
                if (!data || data.length === 0) {
                    data = listingsAPI.getLatestListings(8); // Get 8 items for 4 col grid
                }
                setListings(data.slice(0, 8)); // Limit to 8 items
            } catch (error) {
                console.error("Failed to fetch listings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    if (loading) {
        return (
            <section className="py-12 bg-background">
                <div className="container-base">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i} className="overflow-hidden h-[380px]">
                                <Skeleton className="h-48 w-full" />
                                <CardContent className="p-4 space-y-3">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-background">
            <div className="container-base">

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Featured Equipment</h2>
                    <Link to="/products" className="text-[#0096D6] hover:underline text-sm font-semibold flex items-center">
                        View All <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {listings.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                        >
                            <Card className="h-full flex flex-col overflow-hidden rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 group bg-white">

                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-slate-100">
                                    <img
                                        src={item.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <Badge variant={getConditionVariant(item.condition)} className="text-[10px] uppercase font-bold shadow-sm">
                                            {item.condition}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Content */}
                                <CardContent className="p-4 flex-grow space-y-2">
                                    <Link to={`/listing/${item.id}`} className="block block group-hover:text-[#0096D6] transition-colors">
                                        <h3 className="font-bold text-slate-900 line-clamp-2 leading-snug h-10 text-sm md:text-base">
                                            {item.title}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span className="truncate max-w-[120px]">{item.manufacturer}</span>
                                        <div className="flex items-center text-amber-500">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span className="ml-1 font-medium text-slate-700">4.8</span>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <p className="text-lg font-extrabold text-[#0096D6]">{formatPrice(item.pricePKR)}</p>
                                    </div>
                                </CardContent>

                                <CardFooter className="p-4 pt-0 mt-auto">
                                    <Link to={`/listing/${item.id}`} className="w-full">
                                        <Button variant="outline" className="w-full border-[#0096D6] text-[#0096D6] hover:bg-[#0096D6] hover:text-white font-semibold transition-colors h-9 text-sm">
                                            View Details
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedEquipmentGrid;
