import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Star, Folder, Stethoscope, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { productAPI, getVendorById, inquiryAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import ReviewSection from '@/components/ReviewSection';
import VerificationBadge from '@/components/VerificationBadge';
import VendorTypeBadge from '@/components/VendorTypeBadge';
import { formatPKR } from '@/lib/utils';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiry, setInquiry] = useState({ message: '' });

  useEffect(() => {
    const prod = productAPI.getById(id);
    if (prod) {
      setProduct(prod);
      const vend = getVendorById(prod.vendorId);
      setVendor(vend);
    }
  }, [id]);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Login Required', variant: 'destructive' });
      return;
    }
    inquiryAPI.create({
      productId: product.id,
      vendorId: product.vendorId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      message: inquiry.message
    });
    toast({ title: 'Inquiry sent successfully!' });
    setShowInquiryForm(false);
  };

  const getList = (arr, single) => {
    const list = Array.isArray(arr) ? arr : (single ? [single] : []);
    return list.filter(Boolean);
  };

  if (!product) return <div>Loading...</div>;

  const specialties = getList(product.specialties, product.specialty);
  const categories = getList(product.categories, product.category);

  return (
    <>
      <Helmet>
        <title>{product.name} - MedEquip</title>
      </Helmet>

      <div className="min-h-screen bg-cream-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            onClick={() => navigate(-1)} 
            className="mb-6 bg-olive-600 hover:bg-olive-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-olive-100">
                <img src={product.images[0]} alt={product.name} className="w-full h-96 object-cover" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <div className="flex gap-2 mb-2">
                  <span className="px-3 py-1 bg-olive-100 text-olive-700 rounded-full text-sm font-semibold">{product.condition}</span>
                </div>
                <h1 className="text-4xl font-bold text-charcoal-900 mb-2">{product.name}</h1>
                <p className="text-xl text-charcoal-600">{product.model}</p>
              </div>

              <div className="space-y-3">
                 {categories.length > 0 && (
                   <div className="flex flex-wrap gap-2 items-center">
                      <Folder className="w-4 h-4 text-olive-500" />
                      {categories.map((cat, idx) => (
                        <span key={idx} className="bg-cream-100 text-xs px-2 py-1 rounded-full text-charcoal-700">{cat}</span>
                      ))}
                   </div>
                 )}
                 {specialties.length > 0 && (
                   <div className="flex flex-wrap gap-2 items-center">
                      <Stethoscope className="w-4 h-4 text-olive-500" />
                      {specialties.map((spec, idx) => (
                        <span key={idx} className="bg-sage-100 text-sage-600 text-xs px-2 py-1 rounded-full font-medium">{spec}</span>
                      ))}
                   </div>
                 )}
              </div>

              <div className="bg-olive-50 rounded-xl p-6 border border-olive-100">
                <p className="text-3xl font-bold text-olive-700">{formatPKR(product.price)}</p>
              </div>

              <p className="text-charcoal-600">{product.description}</p>

              <div className="flex gap-4">
                <Button onClick={() => setShowInquiryForm(true)} className="flex-1 bg-olive-600 hover:bg-olive-700 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" /> Send Inquiry
                </Button>
                <Button className="flex-1 bg-sage-500 hover:bg-sage-600 text-white">
                  <Phone className="w-4 h-4 mr-2" /> WhatsApp
                </Button>
              </div>

              {vendor && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-olive-100">
                  <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-charcoal-900">Sold by</h3>
                      {vendor.vendorType && <VendorTypeBadge type={vendor.vendorType} />}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center font-bold text-olive-700 text-xl">
                      {vendor.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-charcoal-900">{vendor.name}</p>
                        <VerificationBadge status={vendor.verificationStatus} showText={false} />
                      </div>
                      <p className="text-sm text-charcoal-500">{vendor.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="border-t border-olive-200 pt-12">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-8">Ratings & Reviews</h2>
            <ReviewSection productId={product.id} vendorId={product.vendorId} />
          </div>

          {showInquiryForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-olive-100 shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-charcoal-900">Send Inquiry</h2>
                <textarea
                  value={inquiry.message}
                  onChange={(e) => setInquiry({ message: e.target.value })}
                  className="w-full p-3 border border-olive-200 rounded-lg mb-4 focus:ring-2 focus:ring-olive-500 outline-none"
                  rows="4"
                  placeholder="Message..."
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowInquiryForm(false)} className="flex-1 border-olive-200 text-charcoal-700">Cancel</Button>
                  <Button onClick={handleInquirySubmit} className="flex-1 bg-olive-600 hover:bg-olive-700 text-white">Send</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;