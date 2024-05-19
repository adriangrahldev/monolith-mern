export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: "in-progress" | "completed" | "in-backlog";
  startDate: string;
  endDate: string;
  projectId: string;
  projectName?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
}
