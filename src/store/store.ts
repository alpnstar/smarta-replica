import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer";
import {onChangeSearchParams} from "@/store/slices/filtersSlice";


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(onChangeSearchParams),
});


export default store;

