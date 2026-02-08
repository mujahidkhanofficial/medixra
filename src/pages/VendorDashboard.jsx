import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Package, Plus, MessageSquare, User, TrendingUp, Edit, Trash2, FolderTree, Shield, Star, Globe, ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { productAPI, inquiryAPI, verificationAPI, reviewAPI, userAPI } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { formatPKR } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

// Sub-components (Assuming these migrate or we keep them compatible for now)
import ProductFormModal from '@/components/ProductFormModal';
import VerificationBadge from '@/components/VerificationBadge';
import VendorTypeBadge from '@/components/VendorTypeBadge';
import ReviewCard from '@/components/ReviewCard';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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

  const seo = useSEO({
    title: "Vendor Dashboard - Medixra",
    description: "Manage your products, inquiries, and store settings."
  });

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
      // Consider refreshing context instead of full reload if possible, but reload is safe fallback
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4 sm:px-6 lg:px-8">
      {seo}

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex items-start gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="mt-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
                {verificationStatus && <VerificationBadge status={verificationStatus.status} />}
                {user?.vendorType && <VendorTypeBadge type={user.vendorType} />}
              </div>
              <p className="text-muted-foreground">Manage your store and listings</p>
            </div>
          </div>

          <Link to="/admin/categories">
            <Button variant="outline" className="gap-2">
              <FolderTree className="w-4 h-4" />
              Manage Categories
            </Button>
          </Link>
        </div>

        {/* Region / Country Card */}
        <Card className="bg-muted/10 border-muted">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Manufacturing Region</h3>
                {!isEditingCountry ? (
                  <p className="text-sm text-muted-foreground">Current Region: <span className="font-medium text-foreground">{user?.country || 'Not Set'}</span></p>
                ) : (
                  <div className="flex items-center gap-2 mt-2">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="China">China</option>
                      <option value="Other">Other</option>
                    </select>
                    <Button size="sm" onClick={handleCountryUpdate}>Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditingCountry(false)}>Cancel</Button>
                  </div>
                )}
              </div>
            </div>
            {!isEditingCountry && (
              <Button variant="ghost" size="sm" onClick={() => setIsEditingCountry(true)}>
                Change Region
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inquiries.length}</div>
              <p className="text-xs text-muted-foreground">Customer messages</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviewStats.average}</div>
              <p className="text-xs text-muted-foreground">Based on {reviewStats.total} reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate text-base" title={verificationStatus?.status}>{verificationStatus?.status}</div>
              <p className="text-xs text-muted-foreground">Verification level</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="w-full" onValueChange={setActiveTab}>
          <div className="border-b overflow-x-auto">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger
                value="products"
                className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Products
              </TabsTrigger>
              <TabsTrigger
                value="inquiries"
                className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Inquiries
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="verification"
                className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Verification
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="products" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold tracking-tight">My Products</h2>
                <p className="text-sm text-muted-foreground">Manage your product catalog.</p>
              </div>
              <Button onClick={() => setShowProductForm(true)} className="gap-2">
                <Plus className="w-4 h-4" /> Add Product
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative bg-muted">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1 text-base">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-1">{product.model}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="font-bold text-lg text-primary">{formatPKR(product.price)}</div>
                  </CardContent>
                  <CardFooter className="p-4 bg-muted/20 flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => { setEditingProduct(product); setShowProductForm(true); }}>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => { productAPI.delete(product.id); loadData(); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {products.length === 0 && (
              <div className="text-center py-12 border rounded-lg bg-muted/10">
                <Package className="mx-auto h-12 w-12 text-muted-foreground/20" />
                <h3 className="mt-4 text-lg font-medium">No products listed</h3>
                <p className="text-muted-foreground mb-4">Get started by adding your first product.</p>
                <Button onClick={() => setShowProductForm(true)}>Add Product</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6 mt-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Inquiries</h2>
              <p className="text-sm text-muted-foreground">Messages from potential buyers.</p>
            </div>
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{inquiry.userName}</CardTitle>
                    <span className="text-xs text-muted-foreground">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{inquiry.message}</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">Reply via Email</Button>
                </CardFooter>
              </Card>
            ))}
            {inquiries.length === 0 && (
              <div className="text-center py-12 border rounded-lg bg-muted/10">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/20" />
                <p className="mt-4 text-muted-foreground">No inquiries yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6 mt-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Reviews</h2>
              <p className="text-sm text-muted-foreground">Feedback from your customers.</p>
            </div>
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  isVendorView={true}
                  onReply={handleReply}
                />
              ))}
              {reviews.length === 0 && (
                <div className="text-center py-12 border rounded-lg bg-muted/10">
                  <Star className="mx-auto h-12 w-12 text-muted-foreground/20" />
                  <p className="mt-4 text-muted-foreground">No reviews yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6 mt-6">
            <div className="max-w-3xl">
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight">Verification</h2>
                <p className="text-sm text-muted-foreground">Manage your account verification status.</p>
              </div>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full mt-1 ${verificationStatus?.status === 'Verified' ? 'bg-green-100 text-green-600' :
                        verificationStatus?.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-muted text-muted-foreground'
                      }`}>
                      <Shield className="w-6 h-6" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-lg">Current Status: {verificationStatus?.status}</h3>
                      <p className="text-sm text-muted-foreground">
                        {verificationStatus?.status === 'Verified' ? 'Your account is fully verified and trusted.' : 'Please submit the required documents to unlock full vendor features.'}
                      </p>
                    </div>
                    {verificationStatus?.status !== 'Verified' && verificationStatus?.status !== 'Pending' && (
                      <Button onClick={handleDocumentUpload}>
                        Upload Documents
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <h3 className="font-semibold mb-4">Submission History</h3>
              <div className="space-y-4">
                {verificationStatus?.history?.map((h, i) => (
                  <div key={i} className="flex gap-4 text-sm border-b pb-4 last:border-0 last:pb-0">
                    <span className="text-muted-foreground w-24 shrink-0">{new Date(h.date).toLocaleDateString()}</span>
                    <div>
                      <Badge variant="outline" className="mb-1">{h.status}</Badge>
                      {h.comment && <p className="text-muted-foreground mt-1">{h.comment}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

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
  );
};

export default VendorDashboard;