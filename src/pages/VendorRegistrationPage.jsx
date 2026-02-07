import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building, ArrowRight, Factory, Ship, Truck, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VendorRegistrationPage = () => {
  return (
    <>
      <Helmet>
        <title>Become a Vendor - MedEquip</title>
        <meta name="description" content="Join MedEquip as a vendor and reach thousands of healthcare professionals" />
      </Helmet>

      <div className="min-h-screen bg-cream-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-block p-4 bg-olive-100 rounded-full mb-6">
              <Building className="w-12 h-12 text-olive-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-olive-800 mb-4">
              Become a Vendor
            </h1>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Join our platform and connect with healthcare professionals worldwide
            </p>
          </motion.div>

          {/* Vendor Types Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-charcoal-900 mb-8">Who Can Join?</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: Factory,
                  title: 'Manufacturer',
                  desc: 'Companies that produce medical equipment and devices directly.'
                },
                {
                  icon: Ship,
                  title: 'Importer',
                  desc: 'Authorized entities importing equipment from global manufacturers.'
                },
                {
                  icon: Truck,
                  title: 'Distributor',
                  desc: 'Local or regional distributors supplying to healthcare facilities.'
                },
                {
                  icon: Wrench,
                  title: 'Service Provider',
                  desc: 'Maintenance, repair, and calibration service providers.'
                }
              ].map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-olive-100 hover:border-olive-300 transition-all text-center"
                >
                  <div className="w-14 h-14 bg-olive-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <type.icon className="w-7 h-7 text-olive-600" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal-900 mb-2">{type.title}</h3>
                  <p className="text-charcoal-600 text-sm">{type.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-olive-100 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Why Join MedEquip?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    'Reach thousands of healthcare professionals',
                    'List unlimited products',
                    'Verified vendor badge',
                    'Direct inquiry management',
                    'Analytics and insights',
                    'Secure payment processing'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <ArrowRight className="w-4 h-4 text-sage-600" />
                      </div>
                      <p className="text-charcoal-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-olive-200 pt-8">
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Getting Started</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-olive-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                      1
                    </div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">Create Account</h3>
                    <p className="text-sm text-charcoal-600">Select your vendor type and sign up with business details</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-olive-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                      2
                    </div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">Verification</h3>
                    <p className="text-sm text-charcoal-600">Upload required documents to get verified status</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-olive-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                      3
                    </div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">Start Selling</h3>
                    <p className="text-sm text-charcoal-600">List products and receive inquiries directly</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 text-center">
                <Link to="/signup">
                  <Button className="bg-olive-600 hover:bg-olive-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all">
                    Register as Vendor
                  </Button>
                </Link>
                <p className="text-charcoal-600 mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="text-olive-600 hover:text-olive-700 font-semibold">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorRegistrationPage;