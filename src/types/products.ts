import {ApiResponse} from "@/types/api";

export interface TextNode {
    type: "text";
    text: string;
}

// Тип для параграфа в описании
export interface ParagraphNode {
    type: "paragraph";
    children: TextNode[];
}

// Тип для элемента массива "description"
type DescriptionNode = ParagraphNode;

// Тип для форматов изображения
export interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

// Тип для объекта "image"
export interface Image {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail: ImageFormat;
        medium: ImageFormat;
        small: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: Record<string, any> | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

// Интерфейс для объекта внутри массива "data"
export interface Product {
    id: number;
    documentId: string;
    title: string;
    price: number;
    old_price: number;
    createdAt: string; // Используем строку, так как это ISO-8601 формат даты
    updatedAt: string; // Используем строку, так как это ISO-8601 формат даты
    publishedAt: string; // Используем строку, так как это ISO-8601 формат даты
    description: DescriptionNode[];
    in_stock: boolean;
    image: Image; // Новый тип для изображения
    currency: string;
    brand_id: string;
    model_id: string;
}

export  type ProductResponse = ApiResponse<Product>;
export  type ProductsResponse = ApiResponse<Product[]>;
