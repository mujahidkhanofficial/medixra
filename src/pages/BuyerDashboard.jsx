import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Heart, ShoppingCart, MessageSquare, ArrowLeft, Trash2, Plus, Minus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistAPI, cartAPI, productAPI, inquiryAPI } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { formatPKR } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('cart');
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const seo = useSEO({
    title: "Buyer Dashboard - Medixra",
    description: "Manage your shopping cart, orders, and inquiries."
  });

  useEffect(() => {
    if (user) {
      loadData();
    } else if (!loading) {
      setIsDataLoading(false);
    }
  }, [user, loading]);

  const loadData = () => {
    setIsDataLoading(true);
    try {
      loadCart();
      const userWishlist = wishlistAPI.getByUserId(user.id);
      setWishlist(userWishlist || []);
      const userInquiries = inquiryAPI.getAll().filter(i => i.userId === user.id); // Assuming inquiryAPI needs client-side filtering or explicit getByUserId
      setInquiries(userInquiries || []);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      toast({ title: 'Error loading dashboard', variant: 'destructive' });
    } finally {
      setIsDataLoading(false);
    }
  };

  const loadCart = () => {
    if (!user) return;
    const userCart = cartAPI.getByUserId(user.id);
    setCart(userCart || []);

    const products = (userCart || []).map(item => {
      const product = productAPI.getById(item.listingId); // Changed from productId to listingId based on API
      if (!product) return null;
      return {
        ...product,
        quantity: item.quantity
      };
    }).filter(Boolean);

    setCartProducts(products);
  };

  const updateQuantity = (listingId, quantity) => {
    if (quantity < 1) return;
    cartAPI.updateQuantity(user.id, listingId, quantity); // Corrected API method signature check
    loadCart();
  };

  const removeFromCart = (listingId) => {
    cartAPI.removeItem(user.id, listingId);
    loadCart();
    toast({ title: 'Item removed from cart' });
  };

  const totalPrice = cartProducts.reduce((sum, p) => {
    const price = Number(p.pricePKR || 0); // Handle explicit pricePKR
    return sum + (price * (p.quantity || 1));
  }, 0);

  // Initial Auth Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Dashboard Data Loading (optional rendering or spinner)
  if (isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4 sm:px-6 lg:px-8">
      {seo}

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Buyer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cart Items</CardTitle>
              <ShoppingCart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cart.length}</div>
              <p className="text-xs text-muted-foreground">Items in your cart</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
              <Heart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wishlist.length}</div>
              <p className="text-xs text-muted-foreground">Saved items</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inquiries.length}</div>
              <p className="text-xs text-muted-foreground">Active conversations</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cart" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="cart">Cart</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="cart" className="space-y-4 mt-6">
            <Card className="border-none shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle>Shopping Cart</CardTitle>
                <CardDescription>Review items before purchase.</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                {cartProducts.length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-4">
                      {cartProducts.map((product) => (
                        <div key={product.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-4 rounded-xl border shadow-sm">
                          <div className="flex gap-4 items-center">
                            <div className="h-20 w-20 bg-muted/30 rounded-lg overflow-hidden border">
                              <img
                                src={product.images?.[0] || 'https://images.unsplash.com/photo-1584036561566-b9370001e9e3?auto=format&fit=crop&q=80&w=200'}
                                alt={product.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 line-clamp-1">{product.title}</h3>
                              <p className="text-sm text-muted-foreground mb-1 line-clamp-1">{product.manufacturer} {product.model}</p>
                              <p className="font-bold text-primary">{formatPKR(product.pricePKR)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="flex items-center border rounded-md bg-transparent">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-r-none hover:bg-muted"
                                onClick={() => updateQuantity(product.id, (product.quantity || 1) - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">{product.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-l-none hover:bg-muted"
                                onClick={() => updateQuantity(product.id, (product.quantity || 1) + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(product.id)}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl border shadow-sm">
                      <span className="text-lg font-medium">Total Amount</span>
                      <span className="text-2xl font-bold text-primary">{formatPKR(totalPrice)}</span>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/25">Proceed to Checkout</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-dashed">
                    <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground/20" />
                    <h3 className="mt-4 text-lg font-medium text-slate-900">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
                    <Link to="/products">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist" className="mt-6">
            <Card className="border-none shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle>Wishlist</CardTitle>
                <CardDescription>Items you have saved for later.</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                {wishlist.length > 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border">
                    <p className="text-muted-foreground mb-4">You have {wishlist.length} items in your wishlist.</p>
                    <Link to="/products">
                      <Button>Browse Products</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-dashed">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground/20" />
                    <p className="mt-4 text-muted-foreground">No items in wishlist yet.</p>
                    <Link to="/products" className="mt-4 inline-block">
                      <Button variant="outline">Browse Products</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries" className="mt-6">
            <Card className="border-none shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle>Inquiries</CardTitle>
                <CardDescription>Track status of your product inquiries.</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                {inquiries.length > 0 ? (
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="border rounded-xl p-4 bg-white shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-slate-900">Product Inquiry</h4>
                          <Badge variant={inquiry.status === 'open' ? 'default' : 'secondary'}>
                            {inquiry.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{inquiry.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-dashed">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/20" />
                    <h3 className="mt-4 text-lg font-medium text-slate-900">No Inquiries Found</h3>
                    <p className="text-muted-foreground">You haven't made any product inquiries yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyerDashboard;