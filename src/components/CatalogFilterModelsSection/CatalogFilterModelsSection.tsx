import React, {FC} from "react";
import {FormGroup} from "@mui/material";
import {CatalogFilterModelsItem} from "@/components/CatalogFilterModelsItem/CatalogFilterModelsItem";

interface ICatalogFilterSectionProps {
    title: string,
    items: any[];
}

export const CatalogFilterModelsSection: FC<ICatalogFilterSectionProps> = ({
                                                                               items,
                                                                               title,
                                                                           }) => {
    return (
        <div className="catalog__filters-section">
            <span className="catalog__filters-filter-title">{title}</span>
            <FormGroup>
                {items.map((item: any) => (
                    <CatalogFilterModelsItem


                        item={{
                            title: item.title,
                            model_id: item.model_id,
                            brand_id: item.brand_id
                        }}
                        key={item.id}
                    />
                ))}
            </FormGroup>
        </div>


    );
};