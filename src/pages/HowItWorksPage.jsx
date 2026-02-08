
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import {
  Search,
  MessageCircle,
  ShieldCheck,
  Truck,
  UserPlus,
  Upload,
  DollarSign,
  ChevronDown,
  CheckCircle,
  ShoppingBag,
  FileText,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

const HowItWorksPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const seo = useSEO({
    title: "How Medixra Works – Medical Equipment Marketplace in Pakistan",
    description: "Learn how Medixra connects medical equipment buyers and vendors in Pakistan. Understand listing, contacting via WhatsApp, and responsibilities of each party.",
    canonicalUrl: "https://medixra.com/how-it-works",
    ogTitle: "How Medixra Works – Medical Equipment Marketplace in Pakistan",
    ogDescription: "Guide to using Medixra: The medical equipment marketplace for Pakistan.",
    ogImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    ogType: "article"
  });

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const buyerSteps = [
    {
      icon: Search,
      title: "1. Search Equipment",
      description: "Browse thousands of listings by specialty, category, or keyword to find exactly what you need."
    },
    {
      icon: FileText,
      title: "2. Review Details",
      description: "Check technical specifications, condition (New/Used/Refurbished), and photos provided by the seller."
    },
    {
      icon: MessageCircle,
      title: "3. Contact Seller",
      description: "Click the WhatsApp button to chat directly with the vendor. No middlemen, no delays."
    },
    {
      icon: Truck,
      title: "4. Deal & Delivery",
      description: "Negotiate price, inspect the item (if possible), and arrange delivery directly with the seller."
    }
  ];

  const vendorSteps = [
    {
      icon: UserPlus,
      title: "1. Create Account",
      description: "Sign up as a vendor for free. Complete your profile to build trust with potential buyers."
    },
    {
      icon: Upload,
      title: "2. Post Listings",
      description: "Upload high-quality photos and detailed descriptions of your medical equipment."
    },
    {
      icon: MessageCircle,
      title: "3. Receive Inquiries",
      description: "Get direct messages from doctors and hospital administrators via WhatsApp."
    },
    {
      icon: DollarSign,
      title: "4. Sell & Grow",
      description: "Close deals directly. We don't charge commissions on your sales."
    }
  ];

  const faqs = [
    {
      question: "Is it free to join Medixra?",
      answer: "Yes! Creating an account for both buyers and vendors is completely free. We aim to connect the medical community without barriers."
    },
    {
      question: "Does Medixra charge a commission on sales?",
      answer: "No. Medixra is a connection platform. We do not take a commission on any sales made between buyers and sellers."
    },
    {
      question: "How do I contact a seller?",
      answer: "Every listing has a 'Contact via WhatsApp' button. Clicking this will open a direct chat with the seller on WhatsApp."
    },
    {
      question: "Does Medixra handle shipping and delivery?",
      answer: "No. Shipping and delivery terms must be negotiated and arranged directly between the buyer and the seller."
    },
    {
      question: "How can I trust a vendor?",
      answer: "Look for the 'Verified' badge on vendor profiles. We also recommend meeting in person to inspect expensive equipment before payment."
    },
    {
      question: "Can I sell used or refurbished equipment?",
      answer: "Absolutely. There is a high demand for quality used and refurbished medical equipment. Just mark the condition clearly in your listing."
    },
    {
      question: "How long does my listing stay active?",
      answer: "Your listing remains active until you mark it as sold or delete it from your dashboard."
    },
    {
      question: "What if I encounter a suspicious listing?",
      answer: "Please report any suspicious activity to our support team immediately via the Contact Us page."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {seo}

      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container-base relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              How Medixra Works
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              The simplest way to buy and sell medical equipment in Pakistan.
              Connecting doctors, hospitals, and suppliers seamlessly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-20 bg-white">
        <div className="container-base">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">For Buyers</span>
            <h2 className="text-3xl font-bold text-gray-900">Find Equipment, Fast.</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Sourcing medical equipment used to be hard. We made it simple.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {buyerSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
                <div className="absolute top-6 right-6 text-6xl font-black text-gray-200/50 pointer-events-none select-none">
                  0{index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Vendors */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container-base relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">For Vendors</span>
            <h2 className="text-3xl font-bold text-white">Grow Your Business</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Medixra is the digital storefront for Pakistan's medical equipment suppliers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vendorSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center text-primary mb-6 ring-1 ring-slate-600">
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees & Features */}
      <section className="py-20 bg-cream-50">
        <div className="container-base">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Transparency First</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">No Hidden Fees.<br />Just Business.</h2>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Free Vendor Registration</h4>
                      <p className="text-gray-600 text-sm mt-1">Create your profile, upload your logo, and get verified without paying a rupee. Forever.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">0% Commission Sales</h4>
                      <p className="text-gray-600 text-sm mt-1">We don't take a cut. You keep 100% of the sale price you negotiate with the buyer.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Unlimited Free Listings</h4>
                      <p className="text-gray-600 text-sm mt-1">Post as many products as you want during our promotional launch period.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Safety & Trust</h3>
                <div className="grid gap-4">
                  {[
                    { icon: ShieldCheck, title: "Verify Before You Pay", desc: "Never transfer large sums without verifying the vendor or inspecting goods." },
                    { icon: CheckCircle, title: "Check Condition", desc: "Ask for live video calls or current dated photos for used equipment." },
                    { icon: MessageCircle, title: "Keep Records", desc: "Use WhatsApp for written records of negotiation and warranty terms." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div className="shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container-base max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:border-gray-200 transition-colors"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-5"></div>
        <div className="container-base relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Join Pakistan's fastest-growing medical equipment marketplace today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/add-listing">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 hover:text-black font-bold h-12 px-8 rounded-full shadow-lg shadow-black/20">
                <Upload className="mr-2 w-5 h-5" /> Post a Listing
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold h-12 px-8 rounded-full transition-all duration-300">
                <ShoppingBag className="mr-2 w-5 h-5" /> Browse Listings
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
