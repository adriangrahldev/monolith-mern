import { Document, Schema, model } from "mongoose";

// Define the task schema
export interface ITask extends Document {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: string;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const taskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    status: { type: String, required: true },
    projectId: { type: String, required: true },
}, { timestamps: true });

export default model<ITask>("Task", taskSchema);
