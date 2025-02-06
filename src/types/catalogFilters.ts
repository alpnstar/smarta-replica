// Тип для условий (например, price: { $gte: "1", $lte: "1" })
export interface ICondition {
    $gte?: string;
    $lte?: string;
}

// Тип для отдельного фильтра (например, { brand_id: "apple" })
type FieldFilter = {
    [key: string]: string | ICondition;
};

// Тип для $or
export interface IOrFilter {
    $or: Array<FieldFilter | IAndFilter | IOrFilter>;
}

// Тип для $and
export interface IAndFilter {
    $and: Array<FieldFilter | IAndFilter | IOrFilter>;
}

// Основной интерфейс для структуры
export interface IFilters {
    filters: {
        $and: Array<IAndFilter | IOrFilter | FieldFilter>;
    };
}

// Пример использования
const filters: IFilters = {
    filters: {
        $and: [
            {
                $or: [
                    { brand_id: "apple" },
                    { brand_id: "samsung" }
                ]
            },
            {
                $or: [
                    { model_id: "iphone-16-pro-max" }
                ]
            },
            {
                $and: [
                    {
                        price: {
                            $gte: "1",
                            $lte: "1"
                        }
                    }
                ]
            }
        ]
    }
};