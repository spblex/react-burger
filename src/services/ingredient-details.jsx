import {createSlice} from "@reduxjs/toolkit";

const ingredientDetailsSlice = createSlice({
    name: 'details',
    initialState: {
        selectedIngredient: null
    },
    reducers: {
        selectIngredient(state, action) {
            state.selectedIngredient = action.payload;
        }
    }
});

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;
export const {selectIngredient} = ingredientDetailsSlice.actions;