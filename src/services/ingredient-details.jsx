import {createSlice} from "@reduxjs/toolkit";

const detailsSlice = createSlice({
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

export const detailsReducer = detailsSlice.reducer;
export const {selectIngredient} = detailsSlice.actions;