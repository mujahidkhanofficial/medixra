import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Heart, MessageSquare, Package, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistAPI, productAPI, inquiryAPI } from '@/services/api';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('wishlist');
  const [wishlist, setWishlist] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (user) {
      const userWishlist = wishlistAPI.get(user.id);
      setWishlist(userWishlist);
      const products = userWishlist.map(id => productAPI.getById(id)).filter(Boolean);
      setWishlistProducts(products);
      const userInquiries = inquiryAPI.getAll(user.id);
      setInquiries(userInquiries);
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Doctor Dashboard - MedEquip</title>
        <meta name="description" content="Manage your wishlist and inquiries" />
      </Helmet>

      <div className="min-h-screen bg-cream-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            onClick={() => navigate(-1)} 
            className="mb-6 bg-olive-600 hover:bg-olive-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-olive-800 mb-2">Doctor Dashboard</h1>
            <p className="text-charcoal-600">Welcome back, Dr. {user?.name}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-olive-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-charcoal-600">Wishlist</p>
                  <p className="text-2xl font-bold text-charcoal-900">{wishlist.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-olive-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-sage-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <p className="text-sm text-charcoal-600">Inquiries</p>
                  <p className="text-2xl font-bold text-charcoal-900">{inquiries.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-olive-100">
            <div className="border-b border-olive-100">
              <div className="flex gap-4 px-6">
                {['wishlist', 'inquiries', 'browse'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-4 font-semibold capitalize transition-all ${
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
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-bold text-charcoal-900 mb-6">My Wishlist</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map((product) => (
                      <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-olive-100 shadow-sm hover:shadow-md transition-shadow">
                        <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <h3 className="font-semibold text-charcoal-900 mb-2">{product.name}</h3>
                          <p className="text-xl font-bold text-olive-700 mb-4">${product.price.toLocaleString()}</p>
                          <Link to={`/product/${product.id}`}>
                            <Button className="w-full bg-olive-600 hover:bg-olive-700 text-white">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  {wishlistProducts.length === 0 && (
                    <p className="text-center text-charcoal-500 py-8">Your wishlist is empty</p>
                  )}
                </div>
              )}

              {activeTab === 'inquiries' && (
                <div>
                  <h2 className="text-xl font-bold text-charcoal-900 mb-6">My Inquiries</h2>
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="bg-cream-50 rounded-xl p-6 border border-olive-100">
                        <div className="flex justify-between items-start mb-4">
                          <p className="font-semibold text-charcoal-900">Product Inquiry</p>
                          <span className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm">
                            {inquiry.status}
                          </span>
                        </div>
                        <p className="text-charcoal-700 mb-2">{inquiry.message}</p>
                        <p className="text-sm text-charcoal-500">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                      </div>
                    ))}
                    {inquiries.length === 0 && (
                      <p className="text-center text-charcoal-500 py-8">No inquiries yet</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'browse' && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-charcoal-900 mb-2">Browse Products</h3>
                  <p className="text-charcoal-600 mb-6">Discover medical equipment for your specialty</p>
                  <Link to="/products">
                    <Button className="bg-olive-600 hover:bg-olive-700 text-white">View All Products</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;