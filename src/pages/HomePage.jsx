import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { ShieldCheck, Lock, MapPin } from 'lucide-react';

// New Components
import HomeHero from '@/components/home/HomeHero';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedEquipmentGrid from '@/components/home/FeaturedEquipmentGrid';
import VendorSplitSection from '@/components/home/VendorSplitSection';
import SponsoredBanner from '@/components/home/SponsoredBanner';

const HomePage = () => {
  const seo = useSEO({
    title: "Medixra – Medical Equipment Marketplace in Pakistan | Buy & Sell New & Used Devices",
    description: "Medixra is Pakistan's dedicated medical equipment marketplace. Browse and post listings for new and used hospital equipment, instruments, and devices. Connect directly with verified vendors via WhatsApp.",
    canonicalUrl: "https://medixra.com/",
    ogType: "website"
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {seo}

      {/* 1. Hero Section Refactor */}
      <HomeHero />

      {/* 2. Browse by Category */}
      <CategoryGrid />

      {/* 3. Featured Equipment Grid (4 Cols) */}
      <FeaturedEquipmentGrid />

      {/* 4. Sponsored Ad Space */}
      <SponsoredBanner />

      {/* 5. Vendor/Seller Split Section */}
      <VendorSplitSection />

      {/* 6. Trust Signals (Retained) */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container-base">
          <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Why Trusted by 500+ Hospitals?</h2>
            <p className="text-lg text-slate-500">We are standardizing the medical supply chain with transparency and verification.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Verified Vendors</h4>
              <p className="text-slate-500">Every seller passes a business verification check before they can list equipment.</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center text-[#0096D6] mb-2">
                <Lock className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Secure Direct Deals</h4>
              <p className="text-slate-500">Connect directly via WhatsApp. Negotiate terms without middleman interference.</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-16 w-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
                <MapPin className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Pakistan-Wide Reach</h4>
              <p className="text-slate-500">Sourcing from Karachi, Lahore, Islamabad, and shipping to every corner of the country.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
