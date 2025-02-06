import {ApiResponse} from "@/types/api";

export interface Memory {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    memory_id: string;
}

export  type MemoriesResponse = ApiResponse<Memory[]>;