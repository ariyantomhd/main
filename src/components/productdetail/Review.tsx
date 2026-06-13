import { Star, ThumbsUp, MessageSquare, User } from "lucide-react";

interface ReviewItem {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

interface ReviewProps {
  reviews: ReviewItem[];
  averageRating: number;
  totalReviews: number;
}

export default function Review({ reviews, averageRating, totalReviews }: ReviewProps) {
  return (
    <div className="space-y-10">
      {/* Review Summary */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-app-bg/20 border border-app-border rounded-lg">
        <div className="text-center space-y-2">
          <div className="text-6xl font-black text-app-primary tracking-tighter">{averageRating.toFixed(1)}</div>
          <div className="flex items-center justify-center gap-1 text-app-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={20} 
                fill={i < Math.floor(averageRating) ? "currentColor" : "none"} 
                className={i < Math.floor(averageRating) ? "text-app-accent" : "text-app-border"}
              />
            ))}
          </div>
          <p className="text-[10px] font-black text-app-secondary uppercase tracking-widest">Based on {totalReviews} reviews</p>
        </div>

        <div className="flex-1 w-full space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-4">
              <div className="text-[10px] font-black text-app-secondary uppercase tracking-widest w-12">{star} Stars</div>
              <div className="flex-1 h-2 bg-app-bg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-app-accent rounded-full" 
                  style={{ width: `${(star / 5) * 100}%` }} // Mocking distribution
                />
              </div>
              <div className="text-[10px] font-black text-app-secondary uppercase tracking-widest w-8">
                {Math.floor(Math.random() * 50)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-app-surface border border-app-border rounded-lg flex items-center justify-center text-app-accent">
            <MessageSquare size={20} />
          </div>
          <h2 className="text-2xl font-black text-app-primary tracking-tight uppercase">Customer Reviews</h2>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="p-6 bg-app-surface border border-app-border rounded-lg space-y-4 hover:border-app-accent transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-app-bg rounded-lg flex items-center justify-center text-app-secondary">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-app-primary uppercase tracking-tight text-sm">{review.userName}</h4>
                    <p className="text-[10px] font-black text-app-secondary uppercase tracking-widest">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-app-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < review.rating ? "currentColor" : "none"} 
                      className={i < review.rating ? "text-app-accent" : "text-app-border"}
                    />
                  ))}
                </div>
              </div>

              <p className="text-app-secondary font-medium leading-relaxed">
                {review.comment}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-app-border">
                <button className="flex items-center gap-2 text-[10px] font-black text-app-secondary uppercase tracking-widest hover:text-app-accent transition-colors">
                  <ThumbsUp size={14} />
                  Helpful ({review.likes})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
