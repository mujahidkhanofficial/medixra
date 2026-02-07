import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, FolderTree, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { categoryAPI } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

const CategoryManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    id: '',
    name: '',
    description: '',
    subcategories: []
  });
  const [subcategoryInput, setSubcategoryInput] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setCategories(categoryAPI.getAll());
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentCategory({
      id: '',
      name: '',
      description: '',
      subcategories: []
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      categoryAPI.delete(id);
      loadCategories();
      toast({ title: 'Category deleted successfully' });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentCategory.name) {
      toast({ title: 'Name is required', variant: 'destructive' });
      return;
    }

    if (currentCategory.id) {
      categoryAPI.update(currentCategory.id, currentCategory);
      toast({ title: 'Category updated successfully' });
    } else {
      categoryAPI.create(currentCategory);
      toast({ title: 'Category created successfully' });
    }
    
    setIsEditing(false);
    loadCategories();
  };

  const handleAddSubcategory = () => {
    if (subcategoryInput.trim()) {
      setCurrentCategory({
        ...currentCategory,
        subcategories: [...(currentCategory.subcategories || []), subcategoryInput.trim()]
      });
      setSubcategoryInput('');
    }
  };

  const handleRemoveSubcategory = (index) => {
    const newSubs = [...currentCategory.subcategories];
    newSubs.splice(index, 1);
    setCurrentCategory({
      ...currentCategory,
      subcategories: newSubs
    });
  };

  return (
    <>
      <Helmet>
        <title>Category Management - MedEquip</title>
        <meta name="description" content="Manage product categories and subcategories" />
      </Helmet>

      <div className="min-h-screen bg-cream-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            onClick={() => navigate(-1)} 
            className="mb-6 bg-olive-600 hover:bg-olive-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-olive-800 mb-2">Category Management</h1>
              <p className="text-charcoal-600">Organize your marketplace categories</p>
            </div>
            <Button onClick={handleCreate} className="bg-olive-600 hover:bg-olive-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-olive-100">
            {categories.map((category) => (
              <div key={category.id} className="border-b border-olive-100 last:border-0 p-6 hover:bg-cream-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-charcoal-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-charcoal-600 mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories && category.subcategories.map((sub, idx) => (
                        <span key={idx} className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-xs font-medium">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(category)} variant="ghost" size="sm" className="hover:bg-olive-50">
                      <Edit className="w-4 h-4 text-olive-600" />
                    </Button>
                    <Button onClick={() => handleDelete(category.id)} variant="ghost" size="sm" className="hover:bg-red-50">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edit/Create Modal */}
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full my-8 border border-olive-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-charcoal-900">
                    {currentCategory.id ? 'Edit Category' : 'New Category'}
                  </h2>
                  <Button onClick={() => setIsEditing(false)} variant="ghost" size="sm">
                    <X className="w-5 h-5 text-charcoal-500" />
                  </Button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">Category Name</label>
                    <input
                      type="text"
                      value={currentCategory.name}
                      onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                      className="w-full px-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white text-charcoal-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">Description</label>
                    <textarea
                      value={currentCategory.description}
                      onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                      className="w-full px-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white text-charcoal-900"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">Subcategories</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={subcategoryInput}
                        onChange={(e) => setSubcategoryInput(e.target.value)}
                        placeholder="Add subcategory..."
                        className="flex-1 px-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white text-charcoal-900"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSubcategory();
                          }
                        }}
                      />
                      <Button type="button" onClick={handleAddSubcategory} variant="secondary" className="bg-sage-500 hover:bg-sage-600 text-white">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentCategory.subcategories && currentCategory.subcategories.map((sub, idx) => (
                        <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-cream-100 rounded-full text-sm text-charcoal-700 border border-olive-100">
                          {sub}
                          <button
                            type="button"
                            onClick={() => handleRemoveSubcategory(idx)}
                            className="text-charcoal-400 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" onClick={() => setIsEditing(false)} variant="outline" className="border-olive-600 text-olive-600 hover:bg-olive-50">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-olive-600 hover:bg-olive-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save Category
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryManagement;