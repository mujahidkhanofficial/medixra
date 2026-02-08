import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';



const HeroBentoGrid = () => {
    return (
        <section className="py-8 md:py-12 bg-background">
            <div className="container-base">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:grid-rows-2 auto-rows-[minmax(180px,auto)]">

                    {/* Box 1: Main Search & Value Prop (Large, Top-Left) - Spans 2 cols, 2 rows on lg */}
                    <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 flex flex-col justify-between group">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>

                        <div className="relative z-10 space-y-6">
                            <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-md">
                                Pakistan's #1 Marketplace
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                                Equip Your <br />
                                <span className="text-white/80">Medical Facility.</span>
                            </h1>
                            <p className="text-lg text-primary-foreground/80 max-w-sm">
                                Buy & sell verified medical equipment directly from trusted vendors.
                            </p>
                        </div>

                        <div className="relative z-10 mt-8 bg-white/10 backdrop-blur-md p-2 rounded-xl flex items-center border border-white/20">
                            <Search className="ml-3 w-5 h-5 text-white/70" />
                            <Input
                                className="border-none bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
                                placeholder="Search MRI, Ultrasound, Surgical..."
                            />
                            <Button size="sm" className="bg-white text-primary hover:bg-white/90 font-bold shadow-sm">
                                Search
                            </Button>
                        </div>
                    </div>

                    {/* Box 2: Featured Product (Tall, Right) */}
                    <div className="md:col-span-1 lg:col-span-1 lg:row-span-2 relative overflow-hidden rounded-[2rem] bg-white border border-slate-100/50 p-5 flex flex-col group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
                        <div className="flex justify-between items-start mb-4">
                            <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-semibold rounded-full px-3 py-1 shadow-none">Featured</Badge>
                            <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 hover:bg-slate-100 -mr-2 -mt-2">
                                <ArrowUpRight className="w-4 h-4 text-slate-400" />
                            </Button>
                        </div>

                        <div className="flex-grow relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 mb-5 group-hover:scale-[1.02] transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop"
                                alt="GE Voluson E8 Ultrasound System"
                                className="object-cover h-full w-full opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                        </div>

                        <div className="space-y-3 mt-auto">
                            <div>
                                <h3 className="font-bold text-lg leading-tight text-slate-900">GE Voluson E8</h3>
                                <p className="text-sm text-slate-500 font-medium">Premium Women's Health</p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                <span className="font-extrabold text-sky-600 text-xl tracking-tight">₨ 2.5M</span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md tracking-wide">Refurbished</span>
                            </div>
                        </div>
                    </div>

                    {/* Box 3: Stats/Trust (Community) */}
                    <div className="md:col-span-1 lg:col-span-1 rounded-[2rem] bg-[#F0FDF9] p-6 flex flex-col justify-center space-y-1 hover:bg-[#E6FBF5] transition-colors group">
                        <div className="flex items-center gap-2 text-emerald-600 mb-3">
                            <Users className="w-5 h-5 opacity-80" />
                            <span className="font-bold text-[10px] uppercase tracking-widest opacity-70">Community</span>
                        </div>
                        <div className="text-5xl font-extrabold text-emerald-950 tracking-tighter group-hover:translate-x-1 transition-transform">500+</div>
                        <p className="text-sm text-emerald-700/80 font-medium">Verified Vendors & Hospitals</p>
                    </div>

                    {/* Box 4: Sell CTA */}
                    <div className="md:col-span-2 lg:col-span-1 rounded-[2rem] bg-gradient-to-br from-white to-blue-50/50 border border-slate-100 p-6 flex flex-col justify-between group overflow-hidden relative shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                        <div className="relative z-10">
                            <h3 className="font-bold text-xl mb-1 text-slate-900 tracking-tight">Sell Equipment?</h3>
                            <p className="text-slate-500 text-sm font-medium">Reach verified buyers.</p>
                        </div>

                        {/* Subtle background graphic */}
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                            <TrendingUp className="w-32 h-32" />
                        </div>

                        <Link to="/add-listing" className="relative z-10 mt-4">
                            <Button className="w-full justify-between shadow-lg shadow-sky-500/20 font-bold bg-sky-500 hover:bg-sky-600 text-white rounded-xl h-12 px-6 border-none">
                                Start Selling <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroBentoGrid;
