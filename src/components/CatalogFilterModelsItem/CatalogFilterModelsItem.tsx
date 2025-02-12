import React, {FC, useState} from "react";
import {CatalogFilterCheckbox} from "@/components/CatalogFilterCheckbox/CatalogFilterCheckbox";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {filtersActions} from "@/store/slices/filtersSlice";

interface CatalogFiltersCheckboxProps {
    item:
        {
            title: string,
            model_id: string,
            brand_id: string
        }

}

export const CatalogFilterModelsItem: FC<CatalogFiltersCheckboxProps> = ({
                                                                             item,
                                                                         }) => {
    const modelsParams = useAppSelector(state => state.filtersReducer.modelsParams);
    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState(setInitialChecked);

    function setInitialChecked() {
        return modelsParams.$or.findIndex((el: any) => el.model_id === item.model_id) !== -1
    }


    return (
        <CatalogFilterCheckbox checked={checked} onChange={() => {
            setChecked(!checked);
            if (!checked) {
                dispatch(filtersActions.addModelsParamsItem(item.model_id));
                dispatch(filtersActions.addBrandsParamsItem(item.brand_id));
            } else {
                dispatch(filtersActions.deleteModelsParamsItem(item.model_id));
            }
        }} label={item.title}/>

    );
};