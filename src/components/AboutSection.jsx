import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Globe, HeartHandshake } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1685995833594-8c35ffa8ccb0)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-olive-900/90 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About Medixra.com
            </h2>
            <p className="text-lg text-olive-100 mb-6 leading-relaxed">
              Medixra is the world's leading digital marketplace dedicated exclusively to medical equipment and healthcare technology. We bridge the gap between healthcare providers and verified global manufacturers.
            </p>
            <p className="text-lg text-olive-100 mb-8 leading-relaxed">
              Our mission is to make quality medical equipment accessible, transparent, and affordable for clinics, hospitals, and laboratories worldwide.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-3xl font-bold text-gold-400">5000+</h4>
                <p className="text-sm text-olive-200">Products Listed</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-3xl font-bold text-gold-400">50+</h4>
                <p className="text-sm text-olive-200">Countries Served</p>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Vendors",
                desc: "Every supplier passes a strict verification process."
              },
              {
                icon: Award,
                title: "Quality Assurance",
                desc: "Premium equipment meeting international standards."
              },
              {
                icon: Globe,
                title: "Global Network",
                desc: "Connecting buyers and sellers across continents."
              },
              {
                icon: HeartHandshake,
                title: "Secure Trading",
                desc: "Safe transactions and reliable customer support."
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-olive-100 text-sm">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;