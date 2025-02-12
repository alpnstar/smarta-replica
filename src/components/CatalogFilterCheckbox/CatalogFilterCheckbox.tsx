import React, {FC} from "react";
import {Checkbox, FormControlLabel} from "@mui/material";

interface ICatalogFilterCheckboxProps {
    checked: boolean;
    onChange: (event: any) => void,
    label: string,
}

export const CatalogFilterCheckbox: FC<ICatalogFilterCheckboxProps> = (props) => {

    return (
        <FormControlLabel sx={{'& .MuiFormControlLabel-label': {'font-weight': '300'},}} control={<Checkbox sx={{
            '&.MuiCheckbox-colorPrimary': {color: "#e23d66"},
            '.Mui-checked ': {
                color: "#e23d66",
            },
        }}/>} {...props}/>
    );
};