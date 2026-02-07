import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { reviewAPI } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';

const ReviewSection = ({ productId, vendorId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadReviews();
  }, [productId, vendorId]);

  const loadReviews = () => {
    let data = [];
    if (productId) {
      data = reviewAPI.getProductReviews(productId);
    } else if (vendorId) {
      data = reviewAPI.getVendorReviews(vendorId);
    }
    setReviews(data);
  };

  const handleReviewSubmit = (data) => {
    if (!user) {
      toast({ title: "Please login to review", variant: "destructive" });
      return;
    }

    reviewAPI.create({
      productId,
      vendorId, // Optional if strictly product review, but good for linking
      buyerId: user.id,
      buyerName: user.name,
      ...data,
      isVerifiedPurchase: true // Simulated for now
    });
    
    toast({ title: "Review submitted successfully!" });
    loadReviews();
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('Delete this review?')) {
      reviewAPI.delete(reviewId);
      loadReviews();
    }
  };

  const calculateStats = () => {
    if (reviews.length === 0) return { average: 0, total: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
    
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = (sum / total).toFixed(1);
    
    const distribution = reviews.reduce((acc, r) => {
      acc[r.rating] = (acc[r.rating] || 0) + 1;
      return acc;
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

    return { average, total, distribution };
  };

  const stats = calculateStats();

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Stats Header */}
      <div className="grid md:grid-cols-3 gap-8 items-center bg-gray-50 rounded-xl p-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-5xl font-bold text-gray-900">{stats.average}</span>
            <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
          </div>
          <p className="text-gray-600">Based on {stats.total} reviews</p>
        </div>

        <div className="col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.distribution[star];
            const percent = stats.total ? (count / stats.total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-4">
                <span className="w-12 text-sm text-gray-600 font-medium flex items-center gap-1">
                  {star} <Star className="w-3 h-3" />
                </span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-10 text-sm text-gray-400 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Form & List */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
           {user ? (
             <ReviewForm onSubmit={handleReviewSubmit} />
           ) : (
             <div className="bg-gray-50 rounded-xl p-6 text-center border border-dashed border-gray-300">
               <p className="text-gray-600 mb-2">Login to share your experience</p>
             </div>
           )}
        </div>

        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Reviews</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="newest">Newest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>

          <div className="space-y-2">
            {sortedReviews.map(review => (
              <ReviewCard 
                key={review.id} 
                review={review} 
                onDelete={handleDelete}
              />
            ))}
            {sortedReviews.length === 0 && (
              <p className="text-gray-500 text-center py-8">No reviews yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;