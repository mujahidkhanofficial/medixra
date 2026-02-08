import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const VendorSplitSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container-base">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

                    {/* Buyer Side */}
                    <div className="relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 p-8 md:p-12 flex flex-col justify-center space-y-6">
                        <div className="space-y-4 relative z-10">
                            <span className="text-[#0096D6] font-extrabold tracking-wider uppercase text-sm">For Buyers</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Source Equipment with Confidence</h2>
                            <p className="text-slate-600 text-lg">Connect directly with verified sellers. No hidden fees, no commission marks.</p>

                            <ul className="space-y-3 pt-2">
                                {[
                                    "Verified Vendor Network",
                                    "Direct WhatsApp Communication",
                                    "Compare Prices Instantly",
                                    "Secure & Transparent"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-slate-700 font-medium">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-6">
                                <Link to="/products">
                                    <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 px-8 rounded-full">
                                        Start Buying
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Decorative BG */}
                        <div className="absolute right-0 bottom-0 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl -mr-16 -mb-16"></div>
                    </div>

                    {/* Seller Side */}
                    <div className="relative rounded-3xl overflow-hidden bg-[#0096D6] text-white p-8 md:p-12 flex flex-col justify-center space-y-6">
                        <div className="space-y-4 relative z-10">
                            <span className="text-blue-200 font-extrabold tracking-wider uppercase text-sm">For Sellers</span>
                            <h2 className="text-3xl md:text-4xl font-bold">Expand Your Reach Nationwide</h2>
                            <p className="text-blue-100 text-lg">List your inventory in minutes and reach thousands of hospitals and clinics.</p>

                            <ul className="space-y-3 pt-2">
                                {[
                                    "Zero Listing Fees (Limited Time)",
                                    "Direct Deals with Buyers",
                                    "Analytics Dashboard",
                                    "Mobile-First Exposure"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-white/90 font-medium">
                                        <CheckCircle className="w-5 h-5 text-white mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-6">
                                <Link to="/vendor/register">
                                    <Button size="lg" className="bg-white hover:bg-blue-50 text-[#0096D6] font-bold h-12 px-8 rounded-full shadow-lg border-none">
                                        Become a Seller <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Decorative BG */}
                        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-12 -mt-12"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default VendorSplitSection;
