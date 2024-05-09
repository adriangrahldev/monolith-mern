import { Document, Schema, model } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
  userId: string;
  avatar: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  projectsCounter: number;
}

export const clientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    userId: { type: String, required: true },
    avatar: { type: String },
    isDeleted: { type: Boolean, default: false },
    projectsCounter: { type: Number, default: 0 },
  },
  { timestamps: true }
);

//middleware para solo traer los completados
clientSchema.pre("find", function (next) {
  this.where({ isDeleted: false });
  next();
});

clientSchema.pre("findOne", function (next) {
  this.where({ isDeleted: false });
  next();
});

clientSchema.pre("findOneAndUpdate", function (next) {
  this.where({ isDeleted: false });
  next();
});

clientSchema.pre("updateOne", function (next) {
  this.where({ isDeleted: false });
  next();
});

clientSchema.pre("updateMany", function (next) {
  this.where({ isDeleted: false });
  next();
});

export default model<IClient>("Client", clientSchema);
