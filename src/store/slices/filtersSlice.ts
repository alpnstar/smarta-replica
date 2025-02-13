import {createAsyncThunk, createSlice, Middleware} from "@reduxjs/toolkit";
import {Brand, BrandsResponse} from "@/types/brands";
import axios from "axios";
import {MemoriesResponse, Memory} from "@/types/memories";
import {Model, ModelsResponse} from "@/types/models";
import {IAndFilter, IOrFilter} from "@/types/catalogFilters";
import qs from "qs";
import {RootState} from "@/store/rootReducer";


export const onChangeSearchParams: Middleware<object, RootState> = store => next => (action) => {
    const typedAction = action as { type: string };
    next(action);
    if (
        typedAction.type === filtersActions.addBrandsParamsItem.type
        || typedAction.type === filtersActions.deleteBrandsParamsItem.type
        || typedAction.type === filtersActions.setBrandsParams.type
        || typedAction.type === filtersActions.setModelsParams.type
        || typedAction.type === filtersActions.deleteModelsParamsItem.type
        || typedAction.type === filtersActions.addModelsParamsItem.type
        || typedAction.type === filtersActions.setPriceParams.type
        || typedAction.type === filtersActions.setSortParam.type
        || typedAction.type === filtersActions.setPageParam.type

    ) {
        store.dispatch(filtersActions.generateSearchParams());
    }
};


export const getBrands = createAsyncThunk<
    BrandsResponse                // Тип данных, возвращаемых при успешном выполнении
>(
    'brands/getBrands',
    async () => {
        const res = await axios.get<BrandsResponse>('http://localhost:1337/api/brands', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return res.data;
    }
);
export const getMemories = createAsyncThunk<MemoriesResponse>('models/getMemories', async () => {
    const res = await axios.get<MemoriesResponse>('http://localhost:1337/api/memories', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    return res.data;
})

export const getModels = createAsyncThunk<ModelsResponse>('models/getModels', async () => {
    const res = await axios.get<ModelsResponse>('http://localhost:1337/api/models', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    return res.data;
})

interface InitialState {
    brandsData: Brand[],
    modelsData: Model[],
    memoriesData: Memory[],
    generatedSearchParams: string | null,
    brandsParams: IOrFilter,
    modelsParams: IOrFilter,
    memoriesParams: IOrFilter,
    priceParams: IAndFilter,
    sortParam: string | null,
    pageParam: number,
}

const initialState: InitialState = {
    brandsData: [],
    modelsData: [],
    memoriesData: [],
    generatedSearchParams: null,
    brandsParams: {$or: []},
    modelsParams: {$or: []},
    memoriesParams: {$or: []},
    priceParams: {$and: []},
    sortParam: null,
    pageParam: 1,

}
const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setBrandsParams(state, {payload}: { payload: IOrFilter }) {
            state.brandsParams = payload;
            state.pageParam = 1;
        },
        addBrandsParamsItem(state, {payload}: {
            payload: string
        }) {
            const searchResult = state.brandsParams.$or.findIndex((el: any) => el.brand_id === payload);
            if (searchResult === -1) {
                state.brandsParams.$or.push({
                    brand_id: payload,
                });
                state.pageParam = 1;
            }

        },
        deleteBrandsParamsItem(state, {payload}: { payload: string }) {
            const searchResult = state.brandsParams.$or.findIndex((el: any) => el.brand_id === payload);
            if (searchResult !== -1) {
                state.brandsParams.$or = [
                    ...state.brandsParams.$or.slice(0, searchResult),
                    ...state.brandsParams.$or.slice(searchResult + 1)
                ]
                state.pageParam = 1;
            }

        },
        setModelsParams(state, {payload}: { payload: IOrFilter }) {
            state.modelsParams = payload;
            state.pageParam = 1;
        },
        addModelsParamsItem(state, {payload}: {
            payload: string
        }) {
            const searchResult = state.modelsParams.$or.findIndex((el: any) => el.model_id === payload);
            if (searchResult === -1) {
                state.modelsParams.$or.push({
                    model_id: payload,
                });
                state.pageParam = 1;
            }

        },
        deleteModelsParamsItem(state, {payload}: { payload: string }) {
            const searchResult = state.modelsParams.$or.findIndex((el: any) => el.model_id === payload);
            if (searchResult !== -1) {
                state.modelsParams.$or = [
                    ...state.modelsParams.$or.slice(0, searchResult),
                    ...state.modelsParams.$or.slice(searchResult + 1)
                ]
                state.pageParam = 1;
            }

        },

        setPriceParams(state, {payload}: { payload: IAndFilter }) {
            state.priceParams = payload;
            state.pageParam = 1;
        },
        setSortParam(state, {payload}: { payload: string | null }) {
            state.sortParam = payload;
        },
        setPageParam(state, {payload}: { payload: number }) {
            state.pageParam = payload;
        },
        generateSearchParams(state) {
            const sort = state.sortParam ? {sort: [state.sortParam]} : null;
            const pagination = {
                pagination: {
                    page: state.pageParam,
                    pageSize: 1,
                }
            };
            state.generatedSearchParams = qs.stringify({
                    ...pagination,
                    ...sort,
                    filters: {
                        $and: [
                            state.brandsParams,
                            state.modelsParams,
                            state.priceParams
                        ]
                    },
                }
                , {
                    encodeValuesOnly: true, // prettify URL
                })
        },
    },
    extraReducers: builder => {
        builder.addCase(getBrands.fulfilled, (state, {payload}) => {
            state.brandsData = payload.data;
        });
        builder.addCase(getModels.fulfilled, (state, {payload}) => {
            state.modelsData = payload.data;
        });
        builder.addCase(getMemories.fulfilled, (state, {payload}) => {
            state.memoriesData = payload.data;
        })
    }

})

export const {reducer: filtersReducer, actions: filtersActions} = filtersSlice;