export interface Task {
    _id?: string;
    title: string;
    description?: string;
    status: "in-progress" | "complete" | "in-backlog";
    image?: string;
    startDate: string;
    endDate: string;
    projectID: string;
    createdAt?: string;
    updatedAt?: string;
}