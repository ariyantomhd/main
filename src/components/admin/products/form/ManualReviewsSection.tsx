import React from "react";
import { Plus, X } from "lucide-react";
import { Product } from "../../../../types/product";

interface ManualReviewsSectionProps {
  formData: Partial<Product>;
  addReview: () => void;
  updateReview: (index: number, field: string, value: any) => void;
  removeReview: (index: number) => void;
}

export default function ManualReviewsSection({ formData, addReview, updateReview, removeReview }: ManualReviewsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-app-border pb-2">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-accent">Manual Reviews</h3>
        <button 
          type="button"
          onClick={addReview}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-app-accent hover:text-app-primary transition-colors"
        >
          <Plus size={14} />
          Add Review
        </button>
      </div>

      <div className="space-y-4">
        {formData.reviews?.map((review, idx) => (
          <div key={review.id} className="p-4 bg-app-bg border border-app-border space-y-4 relative group">
            <button 
              type="button"
              onClick={() => removeReview(idx)}
              className="absolute top-2 right-2 text-app-danger opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-widest text-app-secondary">User Name</label>
                <input 
                  type="text"
                  value={review.userName}
                  onChange={(e) => updateReview(idx, "userName", e.target.value)}
                  className="w-full bg-app-surface border border-app-border px-2 py-1 text-[10px] font-bold outline-none focus:border-app-accent"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-widest text-app-secondary">Rating (1-5)</label>
                <input 
                  type="number"
                  min="1"
                  max="5"
                  value={Number.isNaN(review.rating) ? 5 : (review.rating || 5)}
                  onChange={(e) => updateReview(idx, "rating", parseInt(e.target.value) || 5)}
                  className="w-full bg-app-surface border border-app-border px-2 py-1 text-[10px] font-bold outline-none focus:border-app-accent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase tracking-widest text-app-secondary">Comment</label>
              <textarea 
                rows={2}
                value={review.comment}
                onChange={(e) => updateReview(idx, "comment", e.target.value)}
                className="w-full bg-app-surface border border-app-border px-2 py-1 text-[10px] font-bold outline-none focus:border-app-accent resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-widest text-app-secondary">Date</label>
                <input 
                  type="text"
                  value={review.date}
                  onChange={(e) => updateReview(idx, "date", e.target.value)}
                  className="w-full bg-app-surface border border-app-border px-2 py-1 text-[10px] font-bold outline-none focus:border-app-accent"
                  placeholder="e.g. 2 days ago"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-widest text-app-secondary">Likes</label>
                <input 
                  type="number"
                  value={Number.isNaN(review.likes) ? 0 : (review.likes || 0)}
                  onChange={(e) => updateReview(idx, "likes", parseInt(e.target.value) || 0)}
                  className="w-full bg-app-surface border border-app-border px-2 py-1 text-[10px] font-bold outline-none focus:border-app-accent"
                />
              </div>
            </div>
          </div>
        ))}
        {(!formData.reviews || formData.reviews.length === 0) && (
          <p className="text-[10px] font-bold text-app-secondary uppercase tracking-widest text-center py-4 opacity-40">
            No manual reviews added yet.
          </p>
        )}
      </div>
    </div>
  );
}
