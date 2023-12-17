import { loadIngredients } from "../utils/api-service";
import { createSlice } from "@reduxjs/toolkit";

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: null
    },
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
                state.error = action.payload;
            })
            .addCase(loadIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload && action.payload.success;
                state.data = action.payload?.data;
            })
    }
});

export const ingredientsReducer = ingredientsSlice.reducer;