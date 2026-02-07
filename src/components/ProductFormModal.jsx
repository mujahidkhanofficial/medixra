import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSpecialties } from '@/services/api';
import CategorySelector from '@/components/CategorySelector';
import { cn } from '@/lib/utils';

const ProductFormModal = ({ product, onClose, onSubmit, title }) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: '',
    manufacturer: '',
    specialties: [],
    categories: [],
    condition: 'New',
    price: '',
    availability: 'In Stock',
    description: '',
    images: ['https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800']
  });

  const availableSpecialties = getSpecialties();

  useEffect(() => {
    if (product) {
      // Ensure we have arrays
      setFormData({
        ...product,
        specialties: Array.isArray(product.specialties) ? product.specialties : (product.specialty ? [product.specialty] : []),
        categories: Array.isArray(product.categories) ? product.categories : (product.category ? [product.category] : [])
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-cream-50 rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto border border-olive-100"
      >
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-cream-50 z-10 pb-4 border-b border-olive-200">
          <h2 className="text-2xl font-bold text-charcoal-900">{title}</h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-5 h-5 text-charcoal-500" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">Model *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">Year *</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">Manufacturer *</label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">Condition *</label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white"
                      required
                    >
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Refurbished">Refurbished</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">Price *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white"
                      required
                    />
                 </div>
              </div>
            </div>

            {/* Categorization */}
            <div className="space-y-4">
              <CategorySelector
                selectedCategories={formData.categories}
                onChange={(cats) => setFormData(prev => ({ ...prev, categories: cats }))}
              />

              <div className="border border-olive-200 rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center mb-3">
                   <label className="block text-sm font-bold text-charcoal-700">Specialties</label>
                   <span className="text-xs text-charcoal-500">{formData.specialties.length} selected</span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                  {availableSpecialties.map(spec => (
                    <div 
                      key={spec.id}
                      className="flex items-center gap-2 py-1 px-2 hover:bg-cream-50 rounded cursor-pointer"
                      onClick={() => handleSpecialtyToggle(spec.name)}
                    >
                      <div className={cn(
                        "w-4 h-4 border rounded flex items-center justify-center transition-colors flex-shrink-0",
                        formData.specialties.includes(spec.name) ? "bg-olive-600 border-olive-600" : "border-olive-300"
                      )}>
                        {formData.specialties.includes(spec.name) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm text-charcoal-700 truncate">{spec.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white"
              required
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-olive-200">
            <Button type="button" onClick={onClose} variant="outline" className="flex-1 border-olive-600 text-olive-600 hover:bg-olive-50">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-olive-600 hover:bg-olive-700 text-white">
              Save Product
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductFormModal;