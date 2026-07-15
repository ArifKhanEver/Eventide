import { Schema, model, models, Types } from "mongoose";

export interface IReview {
  _id: Types.ObjectId;
  eventId: Types.ObjectId;
  userId: string; 
  userName: string; 
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, minlength: 5 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

reviewSchema.index({ eventId: 1, userId: 1 }, { unique: true });

const Review = models.Review || model<IReview>("Review", reviewSchema);
export default Review;