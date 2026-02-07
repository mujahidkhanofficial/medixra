import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, TrendingUp, ShieldCheck, Globe, ArrowRight, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SellYourProductSection = () => {
  const benefits = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with thousands of healthcare professionals and institutions worldwide."
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Expand your market presence and increase sales with our dedicated platform."
    },
    {
      icon: Store,
      title: "Easy Management",
      description: "Intuitive dashboard to manage inventory, track orders, and handle inquiries."
    },
    {
      icon: ShieldCheck,
      title: "Secure Platform",
      description: "Trusted environment with verified buyers and secure transaction support."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white to-cream-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-olive-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal-900 mb-6 leading-tight">
                Sell Your Products on <span className="text-olive-600">Medixra</span>
              </h2>
              <p className="text-lg text-charcoal-600 mb-8 max-w-xl">
                Join the fastest-growing medical equipment marketplace. Transform how you sell medical devices with our comprehensive vendor tools.
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid sm:grid-cols-2 gap-6 mb-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="flex gap-4 p-4 rounded-xl bg-white border border-olive-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-olive-50 rounded-lg">
                        <Icon className="w-6 h-6 text-olive-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal-900 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-charcoal-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link to="/vendor-registration" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto min-h-[56px] px-8 text-lg bg-gradient-to-r from-olive-600 to-olive-700 hover:from-olive-700 hover:to-olive-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Start Selling
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/vendor/dashboard" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto min-h-[56px] px-8 text-lg border-2 border-gold-400 text-gold-600 hover:bg-gold-50 hover:text-gold-700 rounded-xl transition-all duration-300">
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  View Dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-full flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Background Shapes */}
              <div className="absolute inset-0 bg-gradient-to-tr from-olive-600 to-gold-400 rounded-2xl rotate-6 opacity-10 scale-95" />
              <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl border border-olive-100 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-olive-500 to-gold-500" />
                
                {/* Simulated Dashboard UI */}
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-8 bg-olive-100 rounded-full" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-olive-50 rounded-xl border border-olive-100">
                      <div className="h-8 w-8 bg-olive-200 rounded mb-2" />
                      <div className="h-4 w-16 bg-olive-200 rounded mb-1" />
                      <div className="h-6 w-24 bg-olive-300 rounded" />
                    </div>
                    <div className="p-4 bg-gold-50 rounded-xl border border-gold-100">
                      <div className="h-8 w-8 bg-gold-200 rounded mb-2" />
                      <div className="h-4 w-16 bg-gold-200 rounded mb-1" />
                      <div className="h-6 w-24 bg-gold-300 rounded" />
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-3">
                    <div className="h-4 w-1/3 bg-gray-200 rounded" />
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                        <div className="h-10 w-10 bg-gray-200 rounded" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-3/4 bg-gray-200 rounded" />
                          <div className="h-2 w-1/2 bg-gray-100 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-olive-100 max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-full">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-bold text-charcoal-900">+127%</span>
                </div>
                <p className="text-xs text-charcoal-500 font-medium">Monthly Sales Growth for Verified Vendors</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SellYourProductSection;