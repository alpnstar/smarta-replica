// import {createAsyncThunk, createSlice, Middleware, PayloadAction} from "@reduxjs/toolkit";
// import {RootState} from "../rootReducer";
// import axios from "axios";
//
//
// const initialState: ICart = {
//     items: [],
//     orderData: {products: []},
//     totalSum: 0,
//
// };
// type changeCartType = ReturnType<typeof cartSlice.actions.addItem>;
// export const onChangeCart: Middleware<object, RootState> = store => next => (action) => {
//     const typedAction = action as { type: string };
//     next(action);
//     if (
//         typedAction.type === cartActions.addItem.type
//         || typedAction.type === cartActions.setProductSizes.type
//         || typedAction.type === cartActions.removeItem.type
//         || typedAction.type === cartActions.setCartState.type
//     ) {
//         store.dispatch(cartActions.setTotals());
//         localStorage.setItem("cart", JSON.stringify(store.getState().cartReducer));
//         store.dispatch(cartActions.setOrderData());
//
//     }
// };
//
// function calculateTotalCount(sizes: SizesState): number {
//     return Object.values(sizes).reduce((acc, item) => acc += +(item.count || 0), 0);
// }
//
// export const sendOrder = createAsyncThunk<
//     any,                // Тип данных, возвращаемых при успешном выполнении
//     { data: IOrderData, token: string },          // Тип аргументов, передаваемых в thunk
//     { state: RootState }>(
//     'cart/sendOrder',
//     async (payload) => {
//         const res = await axios.post(BASE_URL + '/api/orders', payload.data, {
//             headers: {
//                 Authorization: `Bearer ${payload.token}`,
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json',
//             }
//         });
//         return res.data;
//     }
// );
//
//
//
//
//
// export const {actions: cartActions, reducer: cartReducer} = cartSlice;
