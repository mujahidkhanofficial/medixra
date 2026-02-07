import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Package, Plus, MessageSquare, User, TrendingUp, Edit, Trash2, FolderTree, Shield, Star, Globe, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { productAPI, inquiryAPI, verificationAPI, reviewAPI, userAPI } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import ProductFormModal from '@/components/ProductFormModal';
import VerificationBadge from '@/components/VerificationBadge';
import VendorTypeBadge from '@/components/VendorTypeBadge'; // Import Badge
import ReviewCard from '@/components/ReviewCard';
import { formatPKR } from '@/lib/utils';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth(); // Assuming updateProfile handles local state updates too
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  
  // Country Edit State
  const [isEditingCountry, setIsEditingCountry] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(user?.country || 'Other');

  useEffect(() => {
    loadData();
    if (user?.country) {
        setSelectedCountry(user.country);
    }
  }, [user]);

  const loadData = () => {
    if (user) {
      setProducts(productAPI.getAll({ vendorId: user.id }));
      setInquiries(inquiryAPI.getAll(user.id, 'vendor'));
      setReviews(reviewAPI.getVendorReviews(user.id));
      setVerificationStatus(verificationAPI.getStatus(user.id));
    }
  };

  const handleProductSubmit = (productData) => {
    if (!productData.categories?.length) {
      toast({ title: 'Select at least one category', variant: 'destructive' });
      return;
    }
    if (editingProduct) {
      productAPI.update(editingProduct.id, productData);
      toast({ title: 'Product updated successfully!' });
    } else {
      productAPI.create({ ...productData, vendorId: user.id });
      toast({ title: 'Product added successfully!' });
    }
    setShowProductForm(false);
    setEditingProduct(null);
    loadData();
  };

  const handleDocumentUpload = () => {
    // Simulated upload
    verificationAPI.submitDocuments(user.id, [
      { name: 'Business License.pdf', url: '#' },
      { name: 'Tax ID Certificate.jpg', url: '#' }
    ]);
    toast({ title: 'Documents submitted successfully!' });
    loadData();
  };

  const handleReply = (reviewId, text) => {
    reviewAPI.reply(reviewId, text);
    toast({ title: 'Reply posted' });
    loadData();
  };

  const handleCountryUpdate = async () => {
    const updatedUser = userAPI.update(user.id, { country: selectedCountry });
    if (updatedUser) {
        toast({ title: 'Manufacturing country updated!' });
        setIsEditingCountry(false);
        window.location.reload(); 
    }
  };

  const calculateReviewStats = () => {
    if (!reviews.length) return { average: 0, total: 0 };
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      average: (sum / reviews.length).toFixed(1),
      total: reviews.length
    };
  };

  const reviewStats = calculateReviewStats();

  return (
    <>
      <Helmet>
        <title>Vendor Dashboard - MedEquip</title>
      </Helmet>

      <div className="min-h-screen bg-cream-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            onClick={() => navigate(-1)} 
            className="mb-6 bg-olive-600 hover:bg-olive-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-olive-800">Vendor Dashboard</h1>
                {verificationStatus && <VerificationBadge status={verificationStatus.status} />}
                {user?.vendorType && <VendorTypeBadge type={user.vendorType} />}
              </div>
              <p className="text-charcoal-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex gap-2">
              <Link to="/admin/categories">
                <Button variant="outline" className="flex items-center gap-2 border-olive-600 text-olive-600 hover:bg-olive-50">
                  <FolderTree className="w-4 h-4" />
                  Categories
                </Button>
              </Link>
            </div>
          </div>

          {/* Region / Country Card */}
          <div className="bg-white rounded-xl shadow-sm border border-olive-100 p-6 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-olive-100 rounded-full">
                <Globe className="w-6 h-6 text-olive-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-charcoal-900">Manufacturing Region</h3>
                {!isEditingCountry ? (
                  <p className="text-charcoal-600">Current Region: <span className="font-semibold text-charcoal-900">{user?.country || 'Not Set'}</span></p>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <select 
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="border border-olive-300 rounded px-2 py-1 text-sm focus:ring-olive-500"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="China">China</option>
                      <option value="Other">Other</option>
                    </select>
                    <Button size="sm" onClick={handleCountryUpdate} className="bg-olive-600">Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditingCountry(false)}>Cancel</Button>
                  </div>
                )}
              </div>
            </div>
            {!isEditingCountry && (
              <Button variant="outline" size="sm" onClick={() => setIsEditingCountry(true)} className="border-olive-600 text-olive-600">
                Change Region
              </Button>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-cream-100 rounded-xl shadow-sm border border-olive-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-olive-600 rounded-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-charcoal-600">Products</p>
                  <p className="text-2xl font-bold text-charcoal-900">{products.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-cream-100 rounded-xl shadow-sm border border-olive-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-sage-500 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-charcoal-600">Inquiries</p>
                  <p className="text-2xl font-bold text-charcoal-900">{inquiries.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-cream-100 rounded-xl shadow-sm border border-olive-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gold-500 rounded-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-charcoal-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-charcoal-900">{reviewStats.average}</p>
                </div>
              </div>
            </div>
            <div className="bg-cream-100 rounded-xl shadow-sm border border-olive-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-charcoal-600 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-charcoal-600">Status</p>
                  <p className="text-lg font-bold text-charcoal-900">{verificationStatus?.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-olive-100">
            <div className="border-b border-olive-100 overflow-x-auto">
              <div className="flex gap-4 px-6 min-w-max">
                {['products', 'inquiries', 'reviews', 'verification'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-4 font-semibold capitalize transition-all whitespace-nowrap ${
                      activeTab === tab
                        ? 'text-olive-700 border-b-2 border-olive-600'
                        : 'text-charcoal-500 hover:text-olive-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-charcoal-900">My Products</h2>
                    <Button onClick={() => setShowProductForm(true)} className="bg-olive-600 hover:bg-olive-700 text-white">
                      <Plus className="w-4 h-4 mr-2" /> Add Product
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-olive-100 hover:border-olive-300 transition-colors shadow-sm">
                        <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <h3 className="font-semibold text-charcoal-900 truncate">{product.name}</h3>
                          <div className="flex justify-between items-center mt-4">
                            <span className="font-bold text-olive-700">{formatPKR(product.price)}</span>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => { setEditingProduct(product); setShowProductForm(true); }} className="border-olive-200 text-olive-600 hover:bg-olive-50">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => { productAPI.delete(product.id); loadData(); }}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4 text-charcoal-900">Customer Inquiries</h2>
                  {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="bg-cream-50 p-6 rounded-xl border border-olive-100">
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-charcoal-900">{inquiry.userName}</span>
                        <span className="text-sm text-charcoal-500">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-charcoal-600 mb-4">{inquiry.message}</p>
                      <Button size="sm" className="bg-sage-500 hover:bg-sage-600">Reply via Email</Button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-xl font-bold mb-6 text-charcoal-900">Customer Reviews</h2>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <ReviewCard 
                        key={review.id} 
                        review={review} 
                        isVendorView={true}
                        onReply={handleReply}
                      />
                    ))}
                    {reviews.length === 0 && <p className="text-charcoal-500">No reviews yet.</p>}
                  </div>
                </div>
              )}

              {activeTab === 'verification' && (
                <div className="max-w-2xl">
                  <h2 className="text-xl font-bold mb-6 text-charcoal-900">Verification Status</h2>
                  
                  <div className="bg-cream-50 p-6 rounded-xl border border-olive-200 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-full ${
                        verificationStatus?.status === 'Verified' ? 'bg-gold-100 text-gold-600' : 
                        verificationStatus?.status === 'Pending' ? 'bg-sage-100 text-sage-600' : 'bg-charcoal-200'
                      }`}>
                        <Shield className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-charcoal-900">Current Status: {verificationStatus?.status}</h3>
                        <p className="text-sm text-charcoal-600">
                          {verificationStatus?.status === 'Verified' ? 'Your account is fully verified.' : 'Please submit required documents.'}
                        </p>
                      </div>
                    </div>

                    {verificationStatus?.status !== 'Verified' && verificationStatus?.status !== 'Pending' && (
                      <Button onClick={handleDocumentUpload} className="bg-olive-600 hover:bg-olive-700">
                        Upload Documents (Simulated)
                      </Button>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-charcoal-900">Submission History</h3>
                    <div className="space-y-4">
                       {verificationStatus?.history?.map((h, i) => (
                         <div key={i} className="flex gap-4 text-sm">
                           <span className="text-charcoal-500 w-24">{new Date(h.date).toLocaleDateString()}</span>
                           <div>
                             <span className="font-medium block text-charcoal-900">{h.status}</span>
                             {h.comment && <span className="text-charcoal-600">{h.comment}</span>}
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {showProductForm && (
            <ProductFormModal
              product={editingProduct}
              onClose={() => setShowProductForm(false)}
              onSubmit={handleProductSubmit}
              title={editingProduct ? 'Edit Product' : 'Add New Product'}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;