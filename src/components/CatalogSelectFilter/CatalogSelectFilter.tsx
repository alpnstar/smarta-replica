import React, {FC} from "react";
import {FormGroup} from "@mui/material";
import {CatalogFiltersCheckbox} from "@/components/CatalogFiltersCheckbox/CatalogFiltersCheckbox";

interface ICatalogSelectFilterProps {
    title: string;
    children: React.ReactNode;
}

export const CatalogSelectFilter: FC<ICatalogSelectFilterProps> = ({title, children}) => {

    return (
        <div className="catalog__filters-section">
            <span className="catalog__filters-title">{title}</span>
            <FormGroup>
                {children}
            </FormGroup>
        </div>

    );
};