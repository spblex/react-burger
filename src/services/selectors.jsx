import {createSelector} from "@reduxjs/toolkit";

const ingredientsData = (state) => state.ingredients.data;
const burgerIngredients = (state) => state.burger.ingredients;
const burgerBun = (state) => state.burger.bun;
const ingredientsItem = (state, id) => id;

export const extractIngredientsByType = createSelector(
    [ingredientsData],
    (ingredients) => {
        return {
            buns: ingredients.filter(item => item.type === 'bun'),
            sauces: ingredients.filter(item => item.type === 'sauce'),
            mains: ingredients.filter(item => item.type === 'main')
        }
    }
);

export const calculateIngredientCount = createSelector(
    [burgerIngredients, ingredientsItem],
    (ingredients, id) => {
        return ingredients.filter(item => item._id === id).length
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