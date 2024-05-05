
export interface Project {
    _id: string;
    userID: string;
    clientID: string;
    name: string;
    description: string;
    image?: string;
    startDate: string;
    endDate: string;
    comments?: string[];
    status: "pending" | "in-progress" | "completed";
    createdAt: Date;
    updatedAt: Date;
}