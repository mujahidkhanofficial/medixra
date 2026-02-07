
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { vendorAPI, getCities, getSpecialties } from '@/services/api';
import { CheckCircle, AlertCircle, Building2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import './VendorRegisterPage.css';

const VendorRegisterPage = () => {
  const { toast } = useToast();
  const cities = getCities();
  const specialtyOptions = getSpecialties();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    whatsAppNumber: '',
    city: '',
    specialties: [],
    description: '',
    website: ''
  });

  const seo = useSEO({
    title: "Register as a Medical Equipment Vendor in Pakistan | Medixra",
    description: "Create your Medixra vendor profile and start listing medical equipment for buyers across Pakistan. Add your company details, specialties and WhatsApp contact.",
    canonicalUrl: "https://medixra.com/vendor/register",
    ogType: "website"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSpecialtyChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, specialties: [...prev.specialties, value] };
      } else {
        return { ...prev, specialties: prev.specialties.filter(s => s !== value) };
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Company Name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact Person is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (formData.specialties.length === 0) newErrors.specialties = 'Select at least one specialty';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (11 digits for Pakistan 03XXXXXXXXX)
    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(formData.whatsAppNumber)) {
      newErrors.whatsAppNumber = 'Enter valid 11-digit mobile (e.g., 03001234567)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo(0, 0);
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors in the form.",
      });
      return;
    }

    if (!termsAccepted) {
        toast({
            variant: "destructive",
            title: "Terms Required",
            description: "Please agree to the Terms & Conditions to register.",
        });
        return;
    }

    setIsSubmitting(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      vendorAPI.createVendor(formData);
      
      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="vendor-register-page">
        {seo}
        <div className="vr-container">
          <div className="vr-card vr-success-card">
            <div className="vr-success-icon">
              <CheckCircle size={48} />
            </div>
            <h2>Registration Pending!</h2>
            <p>
              Thank you for registering <strong>{formData.name}</strong>! Your vendor profile is currently under review. 
              We will contact you via WhatsApp at <strong>{formData.whatsAppNumber}</strong> within 24-48 hours.
            </p>
            <div className="vr-actions">
              <Link to="/" className="btn-secondary">Return Home</Link>
              <Link to="/products" className="vr-submit-btn" style={{ marginTop: 0, textDecoration: 'none', display: 'inline-block' }}>Browse Listings</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vendor-register-page">
      {seo}
      <div className="vr-container">
        <div className="vr-card">
          <header className="vr-header">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: '#0066CC' }}>
              <Building2 size={48} />
            </div>
            <h1>Register as a Vendor</h1>
            <p>Join Pakistan's premier medical equipment marketplace</p>
          </header>

          <form className="vr-form" onSubmit={handleSubmit}>
            <div className="vr-form-group">
              <label className="vr-label">Company Name <span className="vr-required">*</span></label>
              <input 
                type="text" 
                name="name" 
                className="vr-input" 
                placeholder="e.g. MedTech Solutions"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="vr-error">{errors.name}</span>}
            </div>

            <div className="vr-form-group">
              <label className="vr-label">Contact Person <span className="vr-required">*</span></label>
              <input 
                type="text" 
                name="contactPerson" 
                className="vr-input" 
                placeholder="Full Name"
                value={formData.contactPerson}
                onChange={handleChange}
              />
              {errors.contactPerson && <span className="vr-error">{errors.contactPerson}</span>}
            </div>

            <div className="vr-form-group">
              <label className="vr-label">WhatsApp Number <span className="vr-required">*</span></label>
              <input 
                type="text" 
                name="whatsAppNumber" 
                className="vr-input" 
                placeholder="03XXXXXXXXX"
                value={formData.whatsAppNumber}
                onChange={handleChange}
              />
              {errors.whatsAppNumber && <span className="vr-error">{errors.whatsAppNumber}</span>}
            </div>

            <div className="vr-form-group">
              <label className="vr-label">Email Address <span className="vr-required">*</span></label>
              <input 
                type="email" 
                name="email" 
                className="vr-input" 
                placeholder="email@company.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="vr-error">{errors.email}</span>}
            </div>

            <div className="vr-form-group">
              <label className="vr-label">City <span className="vr-required">*</span></label>
              <select 
                name="city" 
                className="vr-select"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <span className="vr-error">{errors.city}</span>}
            </div>

            <div className="vr-form-group">
              <label className="vr-label">Specialty Focus <span className="vr-required">*</span></label>
              <div className="vr-checkbox-group">
                {specialtyOptions.map(spec => (
                  <label key={spec.id} className="vr-checkbox-label">
                    <input 
                      type="checkbox" 
                      value={spec.name}
                      checked={formData.specialties.includes(spec.name)}
                      onChange={handleSpecialtyChange}
                    />
                    {spec.name}
                  </label>
                ))}
              </div>
              {errors.specialties && <span className="vr-error">{errors.specialties}</span>}
            </div>

            <div className="vr-form-group">
              <label className="vr-label">Description (Optional)</label>
              <textarea 
                name="description" 
                className="vr-textarea" 
                placeholder="Tell us about your company and products..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="vr-form-group">
              <label className="vr-label">Website / Social Link (Optional)</label>
              <input 
                type="text" 
                name="website" 
                className="vr-input" 
                placeholder="https://..."
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="vr-form-group" style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <input 
                    type="checkbox" 
                    id="terms" 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    style={{ marginTop: '4px' }}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <Link to="/terms" className="text-teal-600 hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>.
                </label>
            </div>

            <button type="submit" className="vr-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorRegisterPage;
