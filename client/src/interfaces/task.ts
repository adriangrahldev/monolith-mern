export interface Task {
    _id?: string;
    title: string;
    description?: string;
    status: "in-progress" | "complete" | "in-backlog";
    startDate: string;
    endDate: string;
    projectId: string;
    createdAt?: string;
    updatedAt?: string;
}