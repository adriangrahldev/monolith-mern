import { Document, Schema, model } from "mongoose";
import Client, { IClient } from "./client.model";
// Define the project schema
export interface IProject extends Document {
  userId: string;
  client: any;
  name: string;
  description: string;
  image: string;
  startDate: Date;
  endDate: Date;
  status: string;
  demoUrl: string;
  tasksCounter: number;
  isDeleted: boolean;
  completedTasksCounter: number;
  createdAt: Date;
  updatedAt: Date;
  isOnline: boolean;
}

export const projectSchema = new Schema<IProject>(
  {
    userId: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    tasksCounter: { type: Number, default: 0 },
    completedTasksCounter: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    status: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    demoUrl: { type: String, required: false },
  },
  { timestamps: true }
);

// Middleware para incrementar contador de proyectos del cliente
projectSchema.post("save", function (doc: IProject, next) {
  Client.findByIdAndUpdate(doc.client, {
    $inc: { projectsCounter: 1 },
  })
    .exec()
    .then(() => next())
    .catch((err) => next(err));
});

// Middleware para decrementar el contador de proyectos del cliente cuando se elimina un proyecto
projectSchema.post("findOneAndUpdate", function (doc: IProject, next) {
  if (doc.isDeleted) {
    Client.findByIdAndUpdate(doc.client, {
      $inc: { projectsCounter: -1 },
    })
      .exec()
      .then(() => {
        next();
      })
      .catch((err) => next(err));
  } else {
    next();
  }
});

//solo devolver los que no estan eliminados
projectSchema.pre("find", function (next) {
  this.where({ isDeleted: false });
  next();
});

projectSchema.pre("findOne", function (next) {
  this.where({ isDeleted: false });
  next();
});

projectSchema.pre("findOneAndUpdate", function (next) {
  this.where({ isDeleted: false });
  next();
});

projectSchema.pre("updateOne", function (next) {
  this.where({ isDeleted: false });
  next();
});

export default model<IProject>("Project", projectSchema);
