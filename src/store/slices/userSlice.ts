import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../rootReducer";
import {ApiResponseCutted, SignUpAttributes, UserData} from "../../types/types";
import {BASE_URL} from "../../utils/CONSTS";

const initialState: any = {
    isLogin: false,
    accessToken: null,
    userProfile: null,
    registrationError: null,
    registrationIsSuccess: null,
    authorizationError: null,
    authorizationIsSuccess: null,
};


interface LoginUserReturnType {
    token: string;
}

export const loginUser = createAsyncThunk<
    LoginUserReturnType,                // Тип данных, возвращаемых при успешном выполнении
    { email: string, password: string },          // Тип аргументов, передаваемых в thunk
    { state: RootState }>(
    'user/loginUser',
    async (payload, {rejectWithValue}) => {
        try {
            const res = await axios.post<LoginUserReturnType>(BASE_URL + '/api/customers/login', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            });
            return res.data;
        } catch (e: any) {
            return rejectWithValue(e.response.data);

        }
    }
);
export const getProfileUser = createAsyncThunk<
    ApiResponseCutted<UserData>,                // Тип данных, возвращаемых при успешном выполнении
    string,          // Тип аргументов, передаваемых в thunk
    { state: RootState }>(
    'user/getProfileUser',
    async (payload) => {
        const res = await axios.get<ApiResponseCutted<UserData>>(BASE_URL + '/api/customers/profile', {
            headers: {
                Authorization: `Bearer ${payload}`,
            }
        });
        return res.data;
    }
);
export const registrationUser = createAsyncThunk<
    UserData,                // Тип данных, возвращаемых при успешном выполнении
    SignUpAttributes,          // Тип аргументов, передаваемых в thunk
    { state: RootState, rejectValue: any }>(
    'user/registrationUser',
    async (payload, {dispatch, rejectWithValue}) => {
        try {
            const res = await axios.post<UserData>(BASE_URL + '/api/customers/register', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            });
            return res.data;

        } catch (e: any) {
            return rejectWithValue(e.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.userProfile = null;
            state.accessToken = null;
            state.authorizationIsSuccess = null;
            localStorage.removeItem('bearer');
        },
        setToken: (state, {payload}) => {
            state.accessToken = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registrationUser.fulfilled, (state, {payload}) => {
            state.registrationIsSuccess = true;
        });
        builder.addCase(registrationUser.rejected, (state, {payload}) => {
            state.registrationError = payload;
            state.registrationIsSuccess = false;
        })
        builder.addCase(registrationUser.pending, (state, {payload}) => {
            state.registrationError = null;
            state.registrationIsSuccess = null;
        })

        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            state.authorizationIsSuccess = true;
            state.accessToken = payload.token;
            localStorage.setItem('bearer', payload.token);

        });
        builder.addCase(loginUser.rejected, (state, {payload}) => {
            state.authorizationError = payload;
            state.authorizationIsSuccess = false;
        })
        builder.addCase(loginUser.pending, (state, {payload}) => {
            state.authorizationError = null;
            state.authorizationIsSuccess = null;
        });
        builder.addCase(getProfileUser.fulfilled, (state, {payload}) => {
            state.userProfile = payload.data.attributes;
        })

    }
});


export const {actions: userActions, reducer: userReducer} = userSlice;