import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BuySellSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Buy Equipment Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative overflow-hidden rounded-2xl shadow-xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-olive-600 to-olive-800 opacity-95 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-10 h-full flex flex-col items-start justify-center text-white">
              <div className="bg-white/20 p-4 rounded-full mb-6 backdrop-blur-sm">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Buy Equipment</h3>
              <p className="text-olive-100 text-lg mb-8 max-w-md">
                Browse thousands of verified medical devices from trusted global manufacturers and suppliers.
              </p>
              <Link to="/products">
                <Button className="bg-white text-olive-700 hover:bg-cream-50 font-bold px-8 py-6 text-lg rounded-full">
                  Start Browsing <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Sell Equipment Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative overflow-hidden rounded-2xl shadow-xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500 to-gold-700 opacity-95 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-10 h-full flex flex-col items-start justify-center text-white">
              <div className="bg-white/20 p-4 rounded-full mb-6 backdrop-blur-sm">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Sell Equipment</h3>
              <p className="text-white/90 text-lg mb-8 max-w-md">
                Reach thousands of healthcare providers. List your products on Medixra and grow your business.
              </p>
              <Link to="/vendor-registration">
                <Button className="bg-charcoal-900 text-white hover:bg-charcoal-800 font-bold px-8 py-6 text-lg rounded-full border-none">
                  Become a Vendor <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BuySellSection;