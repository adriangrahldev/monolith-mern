import { Document, Schema, model } from "mongoose";


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
    tasksCounter: number;
    createdAt: Date;
    updatedAt: Date;
}

export const projectSchema = new Schema<IProject>({
    userId: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    tasksCounter: { type: Number, default: 0 },
    status: { type: String, required: true },
}, { timestamps: true });

export default model<IProject>("Project", projectSchema);
