import { Document, Schema, model } from "mongoose";
import Project from "./project.model";

// Define the task schema
export interface ITask extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  projectId: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    status: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    projectId: { type: String, required: true },
  },
  { timestamps: true }
);

// Middleware para incrementar el contador de tareas cuando se crea una nueva tarea
taskSchema.post("save", function (doc: ITask, next) {
  Project.findByIdAndUpdate(doc.projectId, {
    $inc: { tasksCounter: 1 },
  })
    .exec()
    .then(() => {
      if (doc.status === "completed") {
        Project.findByIdAndUpdate(doc.projectId, {
          $inc: { tasksCounter: 1, completedTasksCounter: 1 },
        })
          .exec()
          .then(() => next())
          .catch((err) => next(err));
      }
      next();
    })
    .catch((err) => next(err));
});

// Middleware para decrementar el contador de tareas cuando se elimina una tarea y si esta completada decrementar el contador de tareas completadas
taskSchema.post("findOneAndUpdate", function (doc: ITask, next) {
  if (doc.isDeleted && doc.status === "completed") {
    Project.findByIdAndUpdate(doc.projectId, {
      $inc: { tasksCounter: -1, completedTasksCounter: -1 },
    })
      .exec()
      .then(() => next())
      .catch((err) => next(err));
  } else if (doc.isDeleted) {
    Project.findByIdAndUpdate(doc.projectId, {
      $inc: { tasksCounter: -1 },
    })
      .exec()
      .then(() => next())
      .catch((err) => next(err));
  } else {
    next();
  }
});

//middleware para aumentar el contador de tareas completadas
taskSchema.post("findOneAndUpdate", function (doc: ITask, next) {
  if (doc.status === "completed") {
    Project.findByIdAndUpdate(doc.projectId, {
      $inc: { completedTasksCounter: 1 },
    })
      .exec()
      .then(() => next())
      .catch((err) => next(err));
  }
});

//middleware para solo traer las tareas no eliminadas
taskSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

taskSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});

taskSchema.pre("findOneAndUpdate", function () {
  this.where({ isDeleted: false });
});

taskSchema.pre("updateOne", function () {
  this.where({ isDeleted: false });
});

taskSchema.pre("updateMany", function () {
  this.where({ isDeleted: false });
});

export default model<ITask>("Task", taskSchema);
