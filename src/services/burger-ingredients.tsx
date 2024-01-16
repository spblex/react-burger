import { loadIngredients } from "../utils/api-service";
import { createSlice } from "@reduxjs/toolkit";
import {TBurgerIngredientsStore} from "../types/stores";

const initialState: TBurgerIngredientsStore = {
    data: [],
    loading: false,
    success: false,
    error: null
};

const burgerIngredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(loadIngredients.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.error?.message ?? null;
            })
            .addCase(loadIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload && action.payload?.success;
                state.data = action.payload?.data;
            })
    }
});

export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;