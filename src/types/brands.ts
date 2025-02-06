import {ApiResponse} from "@/types/api";

export interface Brand {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    brand_id: string;
}

export  type BrandsResponse = ApiResponse<Brand[]>;