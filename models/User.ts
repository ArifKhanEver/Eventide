import mongoose, { Schema, type Document, type Model } from "mongoose";
import type { UserRole } from "@/types";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  image?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    image: { type: String },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;