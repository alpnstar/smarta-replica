import {ApiResponse} from "@/types/api";

export interface Model {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    model_id: string;
}

export  type ModelsResponse = ApiResponse<Model[]>;