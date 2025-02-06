// Интерфейс для объекта "pagination"
export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

// Интерфейс для объекта "meta"
export interface Meta {
    pagination: Pagination;
}

// Основной интерфейс для всей структуры
export interface ApiResponse<T> {
    data: T;
    meta: Meta;
}
