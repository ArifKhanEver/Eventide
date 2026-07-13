import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";
import type { EventCategory, EventStatus } from "@/types";

export interface IEvent extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: EventCategory;
  date: Date;
  time: string;
  venue: string;
  city: string;
  price: number;
  capacity: number;
  seatsLeft: number;
  coverImage: string;
  gallery: string[];
  organizerId: Types.ObjectId;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    fullDescription: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Conference", "Concert", "Workshop", "Sports", "Networking", "Festival"],
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    seatsLeft: { type: Number, required: true, min: 0 },
    coverImage: { type: String, required: true },
    gallery: { type: [String], default: [] },
    organizerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

export default Event;