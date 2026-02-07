import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getSpecialties } from '@/services/api';
import { cn } from '@/lib/utils';

const VendorOnboarding = () => {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyRegistration: '',
    country: '',
    address: '',
    bankDetails: '',
    taxId: '',
    specialties: []
  });

  const availableSpecialties = getSpecialties();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecialtyToggle = (specialtyName) => {
    setFormData(prev => {
      const current = prev.specialties || [];
      if (current.includes(specialtyName)) {
        return { ...prev, specialties: current.filter(s => s !== specialtyName) };
      } else {
        return { ...prev, specialties: [...current, specialtyName] };
      }
    });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    const result = await updateProfile(formData);
    if (result.success) {
      toast({ title: 'Onboarding completed successfully!' });
      navigate('/vendor/dashboard');
    }
  };

  return (
    <>
      <Helmet>
        <title>Vendor Onboarding - MedEquip</title>
        <meta name="description" content="Complete your vendor profile setup" />
      </Helmet>

      <div className="min-h-screen bg-cream-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Button 
            onClick={() => navigate(-1)} 
            className="mb-6 bg-olive-600 hover:bg-olive-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-olive-800 mb-4">Complete Your Profile</h1>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 rounded-full ${s <= step ? 'bg-olive-600' : 'bg-olive-200'}`}
                />
              ))}
            </div>
            <p className="text-sm text-charcoal-500 mt-2">Step {step} of 4</p>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-olive-100"
          >
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-charcoal-900">Company Details</h2>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Company Registration Number
                  </label>
                  <input
                    type="text"
                    name="companyRegistration"
                    value={formData.companyRegistration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white text-charcoal-900"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-charcoal-900">Address Information</h2>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Business Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white text-charcoal-900"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-charcoal-900">Bank Details</h2>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Bank Account Information
                  </label>
                  <input
                    type="text"
                    name="bankDetails"
                    value={formData.bankDetails}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Tax ID
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white text-charcoal-900"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
               <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-charcoal-900">Specialties</h2>
                    <span className="text-sm text-charcoal-500">{formData.specialties.length} selected</span>
                 </div>
                 <p className="text-charcoal-600 mb-4">Select the primary medical specialties your equipment covers. You can change this later.</p>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                   {availableSpecialties.map(spec => (
                      <div 
                        key={spec.id}
                        className={cn(
                          "flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all",
                          formData.specialties.includes(spec.name) 
                            ? "border-olive-500 bg-olive-50 ring-1 ring-olive-500" 
                            : "border-olive-200 hover:border-olive-300"
                        )}
                        onClick={() => handleSpecialtyToggle(spec.name)}
                      >
                        <div className={cn(
                          "w-4 h-4 border rounded flex items-center justify-center flex-shrink-0 transition-colors",
                          formData.specialties.includes(spec.name) ? "bg-olive-600 border-olive-600" : "border-olive-300 bg-white"
                        )}>
                           {formData.specialties.includes(spec.name) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-sm font-medium text-charcoal-800">{spec.name}</span>
                      </div>
                   ))}
                 </div>
               </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <Button onClick={() => setStep(step - 1)} variant="outline" className="border-olive-600 text-olive-600 hover:bg-olive-50">
                  Back
                </Button>
              )}
              <Button onClick={handleNext} className="ml-auto bg-olive-600 hover:bg-olive-700 text-white">
                {step === 4 ? 'Complete Onboarding' : 'Next'}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default VendorOnboarding;