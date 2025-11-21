import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctorName: string;
  doctorId: string;
  appointmentId: string;
  onRatingSubmit?: (rating: number, review: string) => void;
}

export const RatingDialog: React.FC<RatingDialogProps> = ({
  open,
  onOpenChange,
  doctorName,
  doctorId,
  appointmentId,
  onRatingSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setSubmitting(true);
    
    try {
      // In a real app, this would submit to the backend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (onRatingSubmit) {
        onRatingSubmit(rating, review);
      }
      
      toast.success('Rating submitted successfully!');
      onOpenChange(false);
      
      // Reset form
      setRating(0);
      setReview('');
    } catch (error) {
      toast.error('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" aria-describedby="rating-description">
        <DialogHeader>
          <DialogTitle>Rate {doctorName}</DialogTitle>
          <DialogDescription id="rating-description">
            How was your experience with this doctor?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Star Rating */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2" role="radiogroup" aria-label="Doctor rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none focus:ring-2 focus:ring-pink-500 rounded transition-transform hover:scale-110"
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  role="radio"
                  aria-checked={rating === star}
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400" aria-live="polite">
              {rating === 0 && 'Select a rating'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          </div>

          {/* Review Textarea */}
          <div className="space-y-2">
            <label htmlFor="review" className="text-gray-700 dark:text-gray-300">
              Review (Optional)
            </label>
            <Textarea
              id="review"
              placeholder="Share your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="resize-none"
              aria-label="Write your review"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
            aria-label="Cancel rating"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || rating === 0}
            className="bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            aria-label="Submit rating"
          >
            {submitting ? 'Submitting...' : 'Submit Rating'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
