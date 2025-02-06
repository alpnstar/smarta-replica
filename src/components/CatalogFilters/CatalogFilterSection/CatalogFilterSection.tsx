import React, {Dispatch, FC, SetStateAction} from "react";
import {CatalogFiltersCheckbox} from "@/components/CatalogFiltersCheckbox/CatalogFiltersCheckbox";
import {FormGroup} from "@mui/material";
import {IAndFilter, IOrFilter} from "@/types/catalogFilters";

interface ICatalogFilterSectionProps {
    title: string,
    filterLabel: string,
    items: any[];
    params: IOrFilter | IAndFilter,
    setParams: Dispatch<SetStateAction<any>>
}

export const CatalogFilterSection: FC<ICatalogFilterSectionProps> = ({items, title, filterLabel, params, setParams}) => {
    return (
        <div className="catalog__filters-section">
            <span className="catalog__filters-title">{title}</span>
            <FormGroup>
                {items.map((item: any) => (
                    <CatalogFiltersCheckbox params={params} setParams={setParams} filterLabel={filterLabel}
                                            item={{title: item.title, id: item[filterLabel]}}
                                            key={item.id}
                    />
                ))}
            </FormGroup>
        </div>


    );
};