
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { listingsAPI, vendorAPI, getSpecialties, getCategories, getCities } from '@/services/api';
import { Image as ImageIcon, Upload, CheckCircle, AlertCircle, Phone, DollarSign, Tag, Building, Info } from 'lucide-react';
import './AddListingPage.css';

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
    specialties: [], // Changed to array
    categories: [], // Changed to array
    city: '',
    condition: 'Used',
    pricePKR: '',
    manufacturer: '',
    model: '',
    technicalDetails: '',
    whatsAppNumber: '',
    images: [],
    isFeatured: false,
    vendorId: '' // Optional vendor association
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
    // Clear error for this field
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
    
    // Clear error if selection is made
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newListing = {
        ...formData,
        pricePKR: Number(formData.pricePKR),
        vendorId: formData.vendorId || null // Ensure null if empty string
      };
      
      listingsAPI.createListing(newListing);
      setIsSuccess(true);

      // Redirect after success
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
      <div className="add-listing-page">
        {seo}
        <div className="listing-container">
          <div className="success-message">
            <div className="success-icon"><CheckCircle size={64} color="#22c55e" /></div>
            <h2>Success!</h2>
            <p>Your listing has been submitted successfully.</p>
            <p>We'll review and publish it soon.</p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Redirecting to homepage...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {seo}
      
      <div className="add-listing-page">
        <div className="listing-container">
          <header className="page-header">
            <h1>Post a New Listing</h1>
            <p>Reach thousands of buyers across Pakistan instantly.</p>
          </header>

          {/* Safety Banner */}
          <div style={{ 
            backgroundColor: '#ECFEFF', 
            border: '1px solid #CFFAFE', 
            borderRadius: '8px', 
            padding: '12px 16px', 
            marginBottom: '24px',
            color: '#155E75',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
             <Info size={20} className="flex-shrink-0" />
             <span style={{ fontSize: '0.95rem' }}>
                Before posting, please read our <Link to="/safety-compliance" style={{ color: '#0E7490', fontWeight: 'bold', textDecoration: 'underline' }}>Safety & Compliance guidelines</Link>. 
                You are responsible for ensuring your listing complies with DRAP regulations.
             </span>
          </div>

          {Object.keys(errors).length > 0 && errors.submit && (
            <div className="validation-error">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={20} />
                <span>{errors.submit}</span>
              </div>
            </div>
          )}
          
          <form className="listing-form" onSubmit={handleSubmit}>
            
            {/* Vendor Association */}
            <section className="form-section">
              <h3><Building size={20} /> Vendor Association</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">Associate with Vendor Profile (Optional)</label>
                  <select 
                    name="vendorId" 
                    className="form-select" 
                    value={formData.vendorId} 
                    onChange={handleChange}
                  >
                    <option value="">-- No Vendor Profile --</option>
                    {approvedVendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>{vendor.name} ({vendor.city})</option>
                    ))}
                  </select>
                  <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
                    Link this listing to your vendor profile for better visibility.
                  </p>
                </div>
              </div>
            </section>

            {/* Basic Information */}
            <section className="form-section">
              <h3><Tag size={20} /> Basic Information</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">Listing Title <span className="required-star">*</span></label>
                  <input type="text" name="title" className="form-input" placeholder="e.g. Mindray Patient Monitor uMEC 10" value={formData.title} onChange={handleChange} />
                  {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Specialties <span className="required-star">*</span>
                    {formData.specialties.length > 0 && (
                      <span className="badge-count">{formData.specialties.length} selected</span>
                    )}
                  </label>
                  <div className="checkbox-group-container">
                    <div className="checkbox-grid">
                      {specialtiesList.map(spec => (
                        <label key={spec.id} className="checkbox-item">
                          <input 
                            type="checkbox" 
                            checked={formData.specialties.includes(spec.name)}
                            onChange={() => handleCheckboxChange('specialties', spec.name)}
                          />
                          <span className="checkbox-text">{spec.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {errors.specialties && <span className="error-message">{errors.specialties}</span>}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Categories <span className="required-star">*</span>
                    {formData.categories.length > 0 && (
                      <span className="badge-count">{formData.categories.length} selected</span>
                    )}
                  </label>
                  <div className="checkbox-group-container">
                    <div className="checkbox-grid">
                      {categoriesList.map(cat => (
                        <label key={cat.id} className="checkbox-item">
                          <input 
                            type="checkbox" 
                            checked={formData.categories.includes(cat.name)}
                            onChange={() => handleCheckboxChange('categories', cat.name)}
                          />
                          <span className="checkbox-text">{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {errors.categories && <span className="error-message">{errors.categories}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Manufacturer <span className="required-star">*</span></label>
                  <input type="text" name="manufacturer" className="form-input" placeholder="e.g. GE Healthcare" value={formData.manufacturer} onChange={handleChange} />
                  {errors.manufacturer && <span className="error-message">{errors.manufacturer}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Model <span className="required-star">*</span></label>
                  <input type="text" name="model" className="form-input" placeholder="e.g. Voluson E10" value={formData.model} onChange={handleChange} />
                  {errors.model && <span className="error-message">{errors.model}</span>}
                </div>
              </div>
            </section>

            {/* Product Details */}
            <section className="form-section">
              <h3><DollarSign size={20} /> Product Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">City <span className="required-star">*</span></label>
                  <select name="city" className="form-select" value={formData.city} onChange={handleChange}>
                    <option value="">Select Location</option>
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Price (PKR) <span className="required-star">*</span></label>
                  <div className="input-prefix-wrapper">
                    <span className="input-prefix">₨</span>
                    <input type="number" name="pricePKR" className="form-input has-prefix" placeholder="0.00" min="0" value={formData.pricePKR} onChange={handleChange} />
                  </div>
                  {errors.pricePKR && <span className="error-message">{errors.pricePKR}</span>}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Condition <span className="required-star">*</span></label>
                  <div className="radio-group">
                    {['New', 'Used', 'Refurbished'].map(cond => <label key={cond} className="radio-option">
                        <input type="radio" name="condition" value={cond} checked={formData.condition === cond} onChange={handleChange} />
                        {cond}
                      </label>)}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Technical Details <span className="required-star">*</span></label>
                  <textarea name="technicalDetails" className="form-textarea" placeholder="Describe the condition, features, and specifications..." value={formData.technicalDetails} onChange={handleChange}></textarea>
                  {errors.technicalDetails && <span className="error-message">{errors.technicalDetails}</span>}
                </div>
              </div>
            </section>

            {/* Images & Contact */}
            <section className="form-section">
              <h3><ImageIcon size={20} /> Images & Contact</h3>
              
              <div className="form-group">
                <label className="form-label">Product Image <span className="required-star">*</span></label>
                
                <div style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
                   <label className="radio-option" style={{ padding: '4px 12px', fontSize: '0.9rem' }}>
                      <input type="radio" name="imgType" checked={imageInputType === 'url'} onChange={() => setImageInputType('url')} /> Use Image URL
                   </label>
                   <label className="radio-option" style={{ padding: '4px 12px', fontSize: '0.9rem' }}>
                      <input type="radio" name="imgType" checked={imageInputType === 'upload'} onChange={() => setImageInputType('upload')} /> Upload Image
                   </label>
                </div>

                {formData.images.length === 0 ? (
                  imageInputType === 'upload' ? (
                    <div className="image-upload-area" onClick={() => document.getElementById('file-upload').click()}>
                      <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                      <Upload size={32} color="#666" />
                      <p style={{ marginTop: '10px', color: '#666' }}>Click to upload image</p>
                      <span style={{ fontSize: '0.8rem', color: '#999' }}>Max size: 5MB</span>
                    </div>
                  ) : (
                    <div className="url-input-group">
                      <input type="text" className="form-input" placeholder="Paste image URL here (https://...)" value={tempImageUrl} onChange={e => setTempImageUrl(e.target.value)} />
                      <button type="button" className="url-add-btn" onClick={handleAddImageUrl}>Add</button>
                    </div>
                  )
                ) : (
                  <div className="image-preview-container">
                    <img src={formData.images[0]} alt="Preview" className="image-preview" />
                    <button type="button" className="remove-image-btn" onClick={removeImage}>×</button>
                  </div>
                )}
                {errors.images && <span className="error-message">{errors.images}</span>}
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label className="form-label">WhatsApp Number <span className="required-star">*</span></label>
                <div className="input-prefix-wrapper">
                   <Phone size={18} className="input-prefix" />
                   <input type="tel" name="whatsAppNumber" className="form-input has-prefix" placeholder="923001234567" value={formData.whatsAppNumber} onChange={handleChange} />
                </div>
                <span style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>Format: 03XXXXXXXXX </span>
                {errors.whatsAppNumber && <span className="error-message">{errors.whatsAppNumber}</span>}
              </div>

              <div className="form-group toggle-label">
                <label className="toggle-switch">
                  <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
                  <span className="slider"></span>
                </label>
                <span className="form-label" style={{ fontWeight: 'normal' }}>Mark as Featured Listing</span>
              </div>
            </section>

            <div className="submit-section">
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Post Listing Now'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};
export default AddListingPage;
