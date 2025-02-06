import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import {IOrFilter} from "@/types/catalogFilters";

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

export const CatalogFiltersCheckbox: FC<CatalogFiltersCheckboxProps> = ({item, filterLabel, params, setParams}) => {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if (checked) {
            setParams((prev: any) => ({
                $or: [...prev['$or'], {
                    [filterLabel]: item.id,
                }]
            }))

        } else {
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

    }, [checked]);
    return (
        <FormControlLabel sx={{'& .MuiFormControlLabel-label': {'font-weight': '300'},}} control={<Checkbox sx={{
            '&.MuiCheckbox-colorPrimary': {color: "#e23d66"},
            '.Mui-checked ': {
                color: "#e23d66",
            },
        }}/>} checked={checked}
                          onChange={(e) => setChecked(!checked)} label={item.title}/>
    );
};