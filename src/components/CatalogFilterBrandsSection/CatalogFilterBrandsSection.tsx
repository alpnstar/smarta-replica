import React, {Dispatch, FC, SetStateAction} from "react";
import {CatalogFilterBrandsItem} from "@/components/CatalogFilterBrandsItem/CatalogFilterBrandsItem";
import {FormGroup} from "@mui/material";
import {IAndFilter, IOrFilter} from "@/types/catalogFilters";

interface ICatalogFilterSectionProps {
    title: string,

    items: any[];
}

export const    CatalogFilterBrandsSection: FC<ICatalogFilterSectionProps> = ({items, title}) => {
    return (
        <div className="catalog__filters-section">
            <span className="catalog__filters-filter-title">{title}</span>
            <FormGroup>
                {items.map((elem) => (
                    <CatalogFilterBrandsItem
                                             item={{title: elem.title, id: elem.brand_id}}
                                             key={elem.id}
                    />
                ))}
            </FormGroup>
        </div>


    );
};