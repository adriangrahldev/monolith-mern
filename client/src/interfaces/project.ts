import { Client } from "./client";
import { Comment } from "./comment";

export interface Project {
    _id?: string;
    userId: string;
    client: string | Client;
    name: string;
    description: string;
    image?: string;
    startDate: string;
    endDate: string;
    status: "pending" | "in-progress" | "completed";
    createdAt?: Date;
    updatedAt?: Date;
    tasksCounter?: number;
    comments?: Comment[];
}