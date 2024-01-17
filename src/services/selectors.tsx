import {createSelector} from "@reduxjs/toolkit";
import {TRootReducer} from "../types/stores";

const ingredientsData = (state: TRootReducer) => state.ingredients.data;
const burgerIngredients = (state: TRootReducer) => state.burger.ingredients;
const burgerBun = (state: TRootReducer) => state.burger.bun;
const ingredientsItem = (state: TRootReducer, id: string) => id;

export const extractIngredientsByType = createSelector(
    [ingredientsData],
    (ingredients) => {
        return {
            buns: ingredients.filter((item) => item.type === 'bun'),
            sauces: ingredients.filter((item) => item.type === 'sauce'),
            mains: ingredients.filter((item) => item.type === 'main')
        }
    }
);

export const calculateIngredientCount = createSelector(
    [burgerIngredients, burgerBun, ingredientsItem],
    (ingredients, bun, id) => {
        if (bun && bun._id === id) {
            return 2;
        }
        return ingredients.filter((item) => item._id === id).length;
    }
);

export const calculateIngredientSum = createSelector(
    [burgerIngredients, burgerBun],
    (ingredients, bun) => {
        let sum = bun ? bun.price * 2 : 0;
        sum += ingredients.reduce((accumulator, item) => {
            return {price: accumulator.price + item.price};
        }, {price: 0}).price;
        return sum;
    }
);

export const findIngredient = createSelector(
      [ingredientsData, ingredientsItem],
    (ingredients, id) => {
          return ingredients.find(item => item._id === id);
    }
);