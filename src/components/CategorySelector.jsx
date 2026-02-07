import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';
import { getCategories } from '@/services/api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CategorySelector = ({ 
  selectedCategories = [], 
  onChange, 
  className = "" 
}) => {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    const allCategories = getCategories();
    setCategories(allCategories);
  }, []);

  const toggleExpand = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const isSelected = (value) => selectedCategories.includes(value);

  const handleSelect = (value) => {
    if (isSelected(value)) {
      onChange(selectedCategories.filter(c => c !== value));
    } else {
      onChange([...selectedCategories, value]);
    }
  };

  const handleSelectAll = () => {
    const allValues = [];
    categories.forEach(cat => {
      allValues.push(cat.name);
      if (cat.subcategories) {
        allValues.push(...cat.subcategories);
      }
    });
    // Use Set to avoid duplicates if any
    onChange([...new Set(allValues)]);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className={cn("border border-olive-200 rounded-lg p-4 bg-white", className)}>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-bold text-charcoal-700">
          Categories & Subcategories
        </label>
        <div className="flex gap-2">
           <Button type="button" variant="ghost" size="xs" onClick={handleSelectAll} className="text-xs h-6 text-olive-600 hover:text-olive-700">
             Select All
           </Button>
           <Button type="button" variant="ghost" size="xs" onClick={handleClearAll} className="text-xs h-6 text-red-500 hover:text-red-600">
             Clear
           </Button>
        </div>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
        {categories.map(category => (
          <div key={category.id} className="select-none">
            <div className="flex items-center gap-2 py-1 hover:bg-cream-50 rounded px-1">
              <button
                type="button"
                onClick={() => toggleExpand(category.id)}
                className="p-1 hover:bg-olive-100 rounded text-charcoal-500"
              >
                {expandedCategories[category.id] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              <div 
                className="flex items-center gap-2 flex-1 cursor-pointer"
                onClick={() => handleSelect(category.name)}
              >
                <div className={cn(
                  "w-4 h-4 border rounded flex items-center justify-center transition-colors",
                  isSelected(category.name) ? "bg-olive-600 border-olive-600" : "border-olive-300"
                )}>
                  {isSelected(category.name) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm font-medium text-charcoal-900">{category.name}</span>
              </div>
            </div>

            {expandedCategories[category.id] && category.subcategories && (
              <div className="ml-9 space-y-1 mt-1 border-l-2 border-olive-100 pl-2">
                {category.subcategories.map(sub => (
                  <div 
                    key={sub}
                    className="flex items-center gap-2 py-1 hover:bg-cream-50 rounded px-1 cursor-pointer"
                    onClick={() => handleSelect(sub)}
                  >
                    <div className={cn(
                      "w-4 h-4 border rounded flex items-center justify-center transition-colors",
                      isSelected(sub) ? "bg-olive-600 border-olive-600" : "border-olive-300"
                    )}>
                      {isSelected(sub) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-charcoal-600">{sub}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-charcoal-500">
        {selectedCategories.length} selected
      </div>
    </div>
  );
};

export default CategorySelector;