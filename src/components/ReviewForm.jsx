import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const ReviewForm = ({ onSubmit, isSubmitting = false }) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive"
      });
      return;
    }
    onSubmit({ ...formData, rating });
    setRating(0);
    setFormData({ title: '', description: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-olive-100 p-6">
      <h3 className="text-lg font-semibold text-charcoal-900 mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={cn(
                    "w-6 h-6 transition-colors",
                    star <= (hoverRating || rating)
                      ? "fill-gold-400 text-gold-400"
                      : "text-gray-300"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white"
            placeholder="Summarize your experience"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-2">Review</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white"
            rows="4"
            placeholder="Tell us more about the product..."
            required
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-olive-600 hover:bg-olive-700 text-white"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;