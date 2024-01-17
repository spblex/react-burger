import {createSlice} from "@reduxjs/toolkit";
import {makeOrder} from "../utils/api-service";
import {TOrderDetailsStore} from "../types/stores";

const initialState: TOrderDetailsStore = {
    name: null,
    number: -1,
    success: false,
    error: null,
    loading: false
};

const orderDetailsSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrder(state) {
            state.success = false;
            state.number = -1;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(makeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(makeOrder.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.error?.message ?? null;
            })
            .addCase(makeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload && action.payload?.success;
                state.name = action.payload?.name;
                state.number = action.payload?.order?.number;
            })
    }
});

export const orderDetailsReducer = orderDetailsSlice.reducer
export const {clearOrder} = orderDetailsSlice.actions;