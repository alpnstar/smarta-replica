import {combineReducers} from "@reduxjs/toolkit/react";
import {filtersReducer} from "@/store/slices/filtersSlice";

export const rootReducer = combineReducers({
    filtersReducer,


});
export type RootState = ReturnType<typeof rootReducer>