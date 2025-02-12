import React, {FC, useEffect, useState} from "react";
import {CatalogFilterCheckbox} from "@/components/CatalogFilterCheckbox/CatalogFilterCheckbox";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {filtersActions} from "@/store/slices/filtersSlice";

interface CatalogFiltersCheckboxProps {
    item:
        {
            title: string,
            id: string,
        }

}

export const CatalogFilterBrandsItem: FC<CatalogFiltersCheckboxProps> = ({item}) => {
    const brandsParams = useAppSelector(state => state.filtersReducer.brandsParams);
    const [checked, setChecked] = useState(setInitialChecked);
    const dispatch = useAppDispatch();

    function setInitialChecked() {
        return brandsParams.$or.findIndex((el: any) => el.brand_id === item.id) !== -1
    }

    useEffect(() => {
        setChecked(setInitialChecked());
    }, [brandsParams]);
    return (
        <CatalogFilterCheckbox checked={checked}
                               onChange={() => {
                                   setChecked(!checked);
                                   if (!checked) {
                                       dispatch(filtersActions.addBrandsParamsItem(item.id));
                                   } else {
                                       dispatch(filtersActions.deleteBrandsParamsItem(item.id));
                                   }
                               }} label={item.title}/>
    );
};


/*
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {IOrFilter} from "@/types/catalogFilters";
import {useSearchParams} from "next/navigation";
import {CatalogFilterCheckbox} from "@/components/CatalogFilterCheckbox/CatalogFilterCheckbox";

interface CatalogFiltersCheckboxProps {
    item:
        {
            title: string,
            id: string,
        }
    filterLabel: string,
    params: IOrFilter,
    setParams: Dispatch<SetStateAction<any>>

}

export const CatalogFilterBrandsItem: FC<CatalogFiltersCheckboxProps> = ({item, filterLabel, params, setParams}) => {
    const searchParams = useSearchParams();
    const [checked, setChecked] = useState(setInitialChecked);
    useEffect(() => {
        setChecked(setInitialChecked);
    }, [searchParams]);

    function setInitialChecked() {
        const or = params["$or"];
        if (or) return params['$or']?.findIndex((el: any) => el[filterLabel] === item.id) !== -1
        return false;
    }

    console.log(params);
    return (
        <CatalogFilterCheckbox checked={checked}
                               onChange={(e) => {
                                   if (!checked) {
                                       setParams((prev: any) => {
                                           const prevOr = prev['$or'] ? [...prev['$or']] : [];
                                           return {
                                               $or: [...prevOr, {
                                                   [filterLabel]: item.id,
                                               }]
                                           }
                                       })

                                   } else {
                                       if (params['$or']) {
                                           const find = params['$or'].findIndex((el: any) => el[filterLabel] === item.id);
                                           if (find !== -1) {
                                               setParams({
                                                   ...params,
                                                   '$or': [
                                                       ...params['$or'].slice(0, find),
                                                       ...params['$or'].slice(find + 1)
                                                   ]
                                               })
                                           }


                                       }

                                   }
                                   setChecked(!checked)
                               }} label={item.title}/>
    );
};
* */