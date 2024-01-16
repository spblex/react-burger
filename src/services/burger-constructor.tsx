import {createSlice} from "@reduxjs/toolkit";
import {TBurgerConstructorStore} from "../types/stores";

const initialState: TBurgerConstructorStore = {
    bun: null,
    ingredients: [],
    sum: 0
};

const burgerConstructorSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        addBun(state, action) {
            state.bun = action.payload;
        },
        addIngredient(state, action) {
            state.ingredients.splice(action.payload.position, 0, action.payload.ingredient);
        },
        moveIngredient(state, action) {
            const item = state.ingredients[action.payload.oldPosition];
            state.ingredients.splice(action.payload.oldPosition, 1);
            state.ingredients.splice(action.payload.newPosition, 0, item);
        },
        deleteIngredient(state, action) {
            state.ingredients.splice(action.payload.index, 1);
        },
        clearIngredients(state) {
            state.ingredients = [];
            state.bun = null;
        }
    }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {addBun, addIngredient, moveIngredient, deleteIngredient, clearIngredients} = burgerConstructorSlice.actions;