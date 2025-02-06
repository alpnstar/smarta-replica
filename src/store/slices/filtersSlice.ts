import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Brand, BrandsResponse} from "@/types/brands";
import axios from "axios";
import {MemoriesResponse, Memory} from "@/types/memories";
import {Model, ModelsResponse} from "@/types/models";


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
    brands: Brand[],
    models: Model[],
    memories: Memory[],
}

const initialState = {
    brands: [],
    models: [],
    memories: [],
}
const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getBrands.fulfilled, (state, {payload}) => {
            state.brands = payload.data;
        });
        builder.addCase(getModels.fulfilled, (state, {payload}) => {
            state.models = payload.data;
        });
        builder.addCase(getMemories.fulfilled, (state, {payload}) => {
            state.memories = payload.data;
        })


    }

})

export const {reducer: filtersReducer, actions: filtersActions} = filtersSlice;