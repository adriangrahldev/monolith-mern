
import { Document, Schema, model } from "mongoose";


// Define the project schema
export interface IComment extends Document {
    // algun parametro para saber si el comentario es del admin o del cliente
    admin: boolean;
    author: string;
    clientId: string;
    projectId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export const commentSchema = new Schema<IComment>({
    admin: { type: Boolean, required: true },
    author: { type: String, required: true },
    clientId: { type: String },
    projectId: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

export default model<IComment>("Comment", commentSchema);
