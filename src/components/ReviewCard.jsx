import React, { useState } from 'react';
import { Star, ThumbsUp, Trash2, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const ReviewCard = ({ review, onDelete, onReply, isVendorView = false }) => {
  const { user } = useAuth();
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onReply(review.id, replyText);
      setShowReplyForm(false);
      setReplyText('');
    }
  };

  const isAdmin = user?.role === 'admin'; // Simulated admin check
  const isMyReview = user?.id === review.buyerId;

  return (
    <div className="border-b border-olive-100 py-6 last:border-0 bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < review.rating ? "fill-gold-400 text-gold-400" : "text-gray-200"
                )}
              />
            ))}
          </div>
          <span className="font-semibold text-charcoal-900">{review.title}</span>
        </div>
        <span className="text-sm text-charcoal-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-charcoal-700">{review.buyerName || 'Buyer'}</span>
        {review.isVerifiedPurchase && (
          <span className="text-xs flex items-center gap-1 text-olive-600 bg-olive-50 px-2 py-0.5 rounded-full border border-olive-200">
            <CheckCircle className="w-3 h-3" /> Verified Purchase
          </span>
        )}
      </div>

      <p className="text-charcoal-600 mb-4">{review.description}</p>

      {/* Vendor Reply Display */}
      {review.reply && (
        <div className="bg-cream-50 rounded-lg p-4 mb-4 border-l-4 border-olive-500">
          <p className="text-sm font-semibold text-charcoal-900 mb-1">Response from Vendor</p>
          <p className="text-sm text-charcoal-600">{review.reply.text}</p>
          <p className="text-xs text-charcoal-400 mt-2">
            {new Date(review.reply.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm text-charcoal-500 hover:text-olive-600 transition-colors">
            <ThumbsUp className="w-4 h-4" />
            Helpful ({review.likes || 0})
          </button>
          
          {isVendorView && !review.reply && (
            <button 
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 text-sm text-charcoal-500 hover:text-olive-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Reply
            </button>
          )}
        </div>

        {(isAdmin || isMyReview) && onDelete && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(review.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Vendor Reply Form */}
      {showReplyForm && isVendorView && (
        <form onSubmit={handleReplySubmit} className="mt-4">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-3 border border-olive-200 rounded-lg text-sm focus:ring-2 focus:ring-olive-500 mb-2"
            placeholder="Write your response..."
            rows="3"
            required
          />
          <div className="flex gap-2 justify-end">
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={() => setShowReplyForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="bg-olive-600 hover:bg-olive-700 text-white">
              Post Reply
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewCard;