import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Heart, ShoppingCart, MessageSquare, Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistAPI, cartAPI, productAPI, inquiryAPI } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { formatPKR } from '@/lib/utils';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('cart');
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (user) {
      loadCart();
      const userWishlist = wishlistAPI.get(user.id);
      setWishlist(userWishlist);
      const userInquiries = inquiryAPI.getAll(user.id);
      setInquiries(userInquiries);
    }
  }, [user]);

  const loadCart = () => {
    const userCart = cartAPI.get(user.id);
    setCart(userCart);
    const products = userCart.map(item => ({
      ...productAPI.getById(item.productId),
      quantity: item.quantity
    })).filter(p => p.id);
    setCartProducts(products);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    cartAPI.update(user.id, productId, quantity);
    loadCart();
  };

  const removeFromCart = (productId) => {
    cartAPI.remove(user.id, productId);
    loadCart();
    toast({ title: 'Item removed from cart' });
  };

  const totalPrice = cartProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  return (
    <>
      <Helmet>
        <title>Buyer Dashboard - MedEquip</title>
        <meta name="description" content="Manage your cart and orders" />
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
            <h1 className="text-3xl font-bold text-olive-800 mb-2">Buyer Dashboard</h1>
            <p className="text-charcoal-600">Welcome back, {user?.name}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-olive-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-olive-100 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-olive-600" />
                </div>
                <div>
                  <p className="text-sm text-charcoal-600">Cart Items</p>
                  <p className="text-2xl font-bold text-charcoal-900">{cart.length}</p>
                </div>
              </div>
            </div>
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
                {['cart', 'wishlist', 'inquiries'].map((tab) => (
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
              {activeTab === 'cart' && (
                <div>
                  <h2 className="text-xl font-bold text-charcoal-900 mb-6">Shopping Cart</h2>
                  {cartProducts.length > 0 ? (
                    <>
                      <div className="space-y-4 mb-8">
                        {cartProducts.map((product) => (
                          <div key={product.id} className="bg-cream-50 rounded-xl p-6 flex gap-6 border border-olive-100">
                            <img src={product.images[0]} alt={product.name} className="w-32 h-32 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-charcoal-900 mb-2">{product.name}</h3>
                              <p className="text-charcoal-600 mb-2">{product.model}</p>
                              <p className="text-xl font-bold text-olive-600">{formatPKR(product.price)}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                  size="sm"
                                  variant="outline"
                                >
                                  -
                                </Button>
                                <span className="w-12 text-center font-semibold text-charcoal-900">{product.quantity}</span>
                                <Button
                                  onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                  size="sm"
                                  variant="outline"
                                >
                                  +
                                </Button>
                              </div>
                              <Button
                                onClick={() => removeFromCart(product.id)}
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-cream-50 rounded-xl p-6 border border-olive-200">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-xl font-semibold text-charcoal-900">Total</span>
                          <span className="text-3xl font-bold text-olive-700">{formatPKR(totalPrice)}</span>
                        </div>
                        <Button className="w-full bg-olive-600 hover:bg-olive-700 text-white py-6 text-lg">
                          Proceed to Checkout
                        </Button>
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-charcoal-500 py-8">Your cart is empty</p>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-charcoal-900 mb-2">Your Wishlist</h3>
                  <p className="text-charcoal-600 mb-6">Save products you're interested in</p>
                  <Link to="/products">
                    <Button className="bg-olive-600 hover:bg-olive-700 text-white">Browse Products</Button>
                  </Link>
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
                        <p className="text-charcoal-700">{inquiry.message}</p>
                      </div>
                    ))}
                    {inquiries.length === 0 && (
                      <p className="text-center text-charcoal-500 py-8">No inquiries yet</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerDashboard;