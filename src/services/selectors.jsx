import {createSelector} from "@reduxjs/toolkit";

const getIngredients = (state) => state.ingredients.data;

export const extractBuns = createSelector(
    [getIngredients],
    (ingredients) => {return ingredients.find(item => item.type === 'bun')}
);

export const extractIngredientsByType = createSelector(
    [getIngredients],
    (ingredients) => {
        return {
            buns: ingredients.filter(item => item.type === 'bun'),
            sauces: ingredients.filter(item => item.type === 'sauce'),
            mains: ingredients.filter(item => item.type === 'main')
        }
    }
);

export const extractNonBuns = createSelector(
    [getIngredients],
    (ingredients) => {return ingredients.filter(item => item.type !== 'bun')}
);