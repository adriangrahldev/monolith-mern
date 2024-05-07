import { Document, Schema, model } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
  userId: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  projectsCounter: number;
}

export const clientSchema = new Schema<IClient>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  userId: { type: String, required: true },
  avatar: { type: String },
  projectsCounter: { type: Number, default: 0 },
}, { timestamps: true });

export default model<IClient>("Client", clientSchema);
