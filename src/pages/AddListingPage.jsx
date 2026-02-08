
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { listingsAPI, vendorAPI, getSpecialties, getCategories, getCities } from '@/services/api';
import {
  Image as ImageIcon,
  Upload,
  CheckCircle,
  AlertCircle,
  Phone,
  DollarSign,
  Tag,
  Building,
  Info,
  Loader2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const AddListingPage = () => {
  const navigate = useNavigate();
  const specialtiesList = getSpecialties();
  const categoriesList = getCategories();
  const cities = getCities();

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageInputType, setImageInputType] = useState('url'); // 'url' or 'upload'
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [approvedVendors, setApprovedVendors] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    specialties: [],
    categories: [],
    city: '',
    condition: 'Used',
    pricePKR: '',
    manufacturer: '',
    model: '',
    technicalDetails: '',
    whatsAppNumber: '',
    images: [],
    isFeatured: false,
    vendorId: ''
  });

  const seo = useSEO({
    title: "Post Medical Equipment Listings in Pakistan | Medixra Vendor Portal",
    description: "Vendors and hospitals can post medical equipment for sale on Medixra. Add photos, technical details, condition and price to reach buyers across Pakistan.",
    canonicalUrl: "https://medixra.com/add-listing",
    ogType: "website"
  });

  useEffect(() => {
    // Fetch approved vendors for dropdown
    const vendors = vendorAPI.getApprovedVendors();
    setApprovedVendors(vendors);
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      const currentList = prev[field] || [];
      const newList = currentList.includes(value)
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      return { ...prev, [field]: newList };
    });

    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setErrors({ ...errors, images: 'Image size should be less than 5MB' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, images: [reader.result] });
        setErrors({ ...errors, images: null });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = () => {
    if (!tempImageUrl) return;
    setFormData({ ...formData, images: [tempImageUrl] });
    setTempImageUrl('');
    setErrors({ ...errors, images: null });
  };

  const removeImage = () => {
    setFormData({ ...formData, images: [] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Listing title is required';
    if (!formData.specialties || formData.specialties.length === 0) newErrors.specialties = 'At least one specialty is required';
    if (!formData.categories || formData.categories.length === 0) newErrors.categories = 'At least one category is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.pricePKR || Number(formData.pricePKR) <= 0) newErrors.pricePKR = 'Valid price is required';
    if (!formData.manufacturer.trim()) newErrors.manufacturer = 'Manufacturer is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.technicalDetails.trim()) newErrors.technicalDetails = 'Technical details are required';

    const phoneRegex = /^[0-9]{10,13}$/;
    if (!formData.whatsAppNumber.match(phoneRegex)) {
      newErrors.whatsAppNumber = 'Please enter a valid mobile number (e.g., 923001234567)';
    }
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newListing = {
        ...formData,
        pricePKR: Number(formData.pricePKR),
        vendorId: formData.vendorId || null
      };

      listingsAPI.createListing(newListing);
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        submit: 'Failed to submit listing. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        {seo}
        <Card className="max-w-md w-full shadow-xl border-green-100">
          <CardContent className="pt-10 pb-10 text-center space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Success!</h2>
            <p className="text-gray-600">Your listing has been submitted successfully.</p>
            <p className="text-gray-600">We'll review and publish it soon.</p>
            <p className="text-sm text-gray-400 mt-4">Redirecting to homepage...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {seo}

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Post a New Listing</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reach thousands of buyers across Pakistan instantly.
          </p>
        </div>

        {/* Safety Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 text-blue-800">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">
            Before posting, please read our <Link to="/safety-compliance" className="font-bold underline hover:text-blue-900">Safety & Compliance guidelines</Link>.
            You are responsible for ensuring your listing complies with DRAP regulations.
          </p>
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Vendor Association */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building className="w-5 h-5 text-primary" /> Vendor Association</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Associate with Vendor Profile (Optional)</Label>
                  <select
                    name="vendorId"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.vendorId}
                    onChange={handleChange}
                  >
                    <option value="">-- No Vendor Profile --</option>
                    {approvedVendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>{vendor.name} ({vendor.city})</option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground">
                    Link this listing to your vendor profile for better visibility.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Tag className="w-5 h-5 text-primary" /> Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Listing Title <span className="text-red-500">*</span></Label>
                <Input
                  name="title"
                  placeholder="e.g. Mindray Patient Monitor uMEC 10"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <span className="text-xs text-red-500 font-medium">{errors.title}</span>}
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between">
                  <span>Specialties <span className="text-red-500">*</span></span>
                  {formData.specialties.length > 0 && (
                    <span className="text-xs font-medium text-primary">{formData.specialties.length} selected</span>
                  )}
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specialtiesList.map(spec => (
                    <div key={spec.id} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors">
                      <Checkbox
                        id={`spec-${spec.id}`}
                        checked={formData.specialties.includes(spec.name)}
                        onCheckedChange={() => handleCheckboxChange('specialties', spec.name)}
                      />
                      <label htmlFor={`spec-${spec.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full">
                        {spec.name}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.specialties && <span className="text-xs text-red-500 font-medium">{errors.specialties}</span>}
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between">
                  <span>Categories <span className="text-red-500">*</span></span>
                  {formData.categories.length > 0 && (
                    <span className="text-xs font-medium text-primary">{formData.categories.length} selected</span>
                  )}
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categoriesList.map(cat => (
                    <div key={cat.id} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors">
                      <Checkbox
                        id={`cat-${cat.id}`}
                        checked={formData.categories.includes(cat.name)}
                        onCheckedChange={() => handleCheckboxChange('categories', cat.name)}
                      />
                      <label htmlFor={`cat-${cat.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full">
                        {cat.name}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.categories && <span className="text-xs text-red-500 font-medium">{errors.categories}</span>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Manufacturer <span className="text-red-500">*</span></Label>
                  <Input name="manufacturer" placeholder="e.g. GE Healthcare" value={formData.manufacturer} onChange={handleChange} className={errors.manufacturer ? 'border-red-500' : ''} />
                  {errors.manufacturer && <span className="text-xs text-red-500 font-medium">{errors.manufacturer}</span>}
                </div>
                <div className="space-y-2">
                  <Label>Model <span className="text-red-500">*</span></Label>
                  <Input name="model" placeholder="e.g. Voluson E10" value={formData.model} onChange={handleChange} className={errors.model ? 'border-red-500' : ''} />
                  {errors.model && <span className="text-xs text-red-500 font-medium">{errors.model}</span>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary" /> Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>City <span className="text-red-500">*</span></Label>
                  <select
                    name="city"
                    className={cn(
                      "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm",
                      errors.city ? "border-red-500" : "border-input"
                    )}
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="">Select Location</option>
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                  {errors.city && <span className="text-xs text-red-500 font-medium">{errors.city}</span>}
                </div>

                <div className="space-y-2">
                  <Label>Price (PKR) <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₨</span>
                    <Input
                      type="number"
                      name="pricePKR"
                      placeholder="0.00"
                      min="0"
                      value={formData.pricePKR}
                      onChange={handleChange}
                      className={cn("pl-8", errors.pricePKR ? 'border-red-500' : '')}
                    />
                  </div>
                  {errors.pricePKR && <span className="text-xs text-red-500 font-medium">{errors.pricePKR}</span>}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Condition <span className="text-red-500">*</span></Label>
                <div className="flex flex-wrap gap-4">
                  {['New', 'Used', 'Refurbished'].map(cond => (
                    <div key={cond} className="flex items-center space-x-2 border rounded-lg px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        id={cond}
                        name="condition"
                        value={cond}
                        checked={formData.condition === cond}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        className="appearance-none w-5 h-5 rounded-full border border-primary text-primary checked:bg-primary checked:border-transparent focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer grid place-content-center before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:bg-white before:scale-0 checked:before:scale-100 transition-all duration-200"
                      />
                      <label htmlFor={cond} className="cursor-pointer">{cond}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Technical Details <span className="text-red-500">*</span></Label>
                <Textarea
                  name="technicalDetails"
                  placeholder="Describe the condition, features, and specifications..."
                  value={formData.technicalDetails}
                  onChange={handleChange}
                  rows={5}
                  className={errors.technicalDetails ? 'border-red-500' : ''}
                />
                {errors.technicalDetails && <span className="text-xs text-red-500 font-medium">{errors.technicalDetails}</span>}
              </div>
            </CardContent>
          </Card>

          {/* Images & Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ImageIcon className="w-5 h-5 text-primary" /> Images & Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

              <div className="space-y-4">
                <Label>Product Image <span className="text-red-500">*</span></Label>

                <div className="flex gap-6 mb-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="img-url"
                      name="imageInputType"
                      value="url"
                      checked={imageInputType === 'url'}
                      onChange={(e) => setImageInputType(e.target.value)}
                      className="appearance-none w-5 h-5 rounded-full border border-primary text-primary checked:bg-primary checked:border-transparent focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer grid place-content-center before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:bg-white before:scale-0 checked:before:scale-100 transition-all duration-200"
                    />
                    <Label htmlFor="img-url">Use Image URL</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="img-upload"
                      name="imageInputType"
                      value="upload"
                      checked={imageInputType === 'upload'}
                      onChange={(e) => setImageInputType(e.target.value)}
                      className="appearance-none w-5 h-5 rounded-full border border-primary text-primary checked:bg-primary checked:border-transparent focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer grid place-content-center before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:bg-white before:scale-0 checked:before:scale-100 transition-all duration-200"
                    />
                    <Label htmlFor="img-upload">Upload Image</Label>
                  </div>
                </div>

                {formData.images.length === 0 ? (
                  imageInputType === 'upload' ? (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('file-upload').click()}
                    >
                      <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Upload className="w-6 h-6 text-gray-500" />
                      </div>
                      <p className="font-medium text-gray-700">Click to upload image</p>
                      <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Paste image URL here (https://...)"
                        value={tempImageUrl}
                        onChange={e => setTempImageUrl(e.target.value)}
                      />
                      <Button type="button" onClick={handleAddImageUrl} variant="secondary">Add</Button>
                    </div>
                  )
                ) : (
                  <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200 group">
                    <img src={formData.images[0]} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 text-white p-1.5 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {errors.images && <span className="text-xs text-red-500 font-medium">{errors.images}</span>}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label>WhatsApp Number <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                  <Input
                    type="tel"
                    name="whatsAppNumber"
                    placeholder="923001234567"
                    value={formData.whatsAppNumber}
                    onChange={handleChange}
                    className={cn("pl-9", errors.whatsAppNumber ? 'border-red-500' : '')}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Format: 923XXXXXXXXX</p>
                {errors.whatsAppNumber && <span className="text-xs text-red-500 font-medium">{errors.whatsAppNumber}</span>}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="featured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                />
                <label
                  htmlFor="featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                >
                  Mark as Featured Listing
                </label>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full h-12 text-lg font-bold shadow-lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
              </>
            ) : (
              'Post Listing Now'
            )}
          </Button>

        </form>
      </div>
    </div>
  );
};
export default AddListingPage;
