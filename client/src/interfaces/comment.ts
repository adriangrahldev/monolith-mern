
export interface Comment {
    _id?: string;
    author: string;
    admin: boolean;
    clientId: string;
    projectId: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}