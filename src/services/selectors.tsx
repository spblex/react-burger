import {createSelector} from "@reduxjs/toolkit";
import {TFeedOrderStatus, TFeedStore, TIngredient, TOrderIngredient, TRootReducer} from "../types/stores";

const ingredientsData = (state: TRootReducer) => state.ingredients.data;
const burgerIngredients = (state: TRootReducer) => state.burger.ingredients;
const burgerBun = (state: TRootReducer) => state.burger.bun;
const ingredientsItem = (state: TRootReducer, id: string) => id;
const orderHistoryData = (state: TFeedStore) => state.data;
const orderHistoryItem = (state: TFeedStore, id: number) => id;
const orderHistoryIngredient = (state: TRootReducer, ids?: Array<string>) => ids;

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

export const getOrdersReady = createSelector(
    [orderHistoryData],
    (data) => {
        return data.orders.filter((ingredient) => ingredient.status === TFeedOrderStatus.DONE);
    }
);

export const getOrdersCooking = createSelector(
    [orderHistoryData],
    (data) => {
        return data.orders.filter((ingredient) => ingredient.status !== TFeedOrderStatus.DONE);
    }
);

export const findOrderHistory = createSelector(
    [orderHistoryData, orderHistoryItem],
    (data, id) => {
        return data.orders.find(item => item.number === id) ?? null;
    }
);

export const getOrderUniqueIngredients = createSelector(
    [ingredientsData, orderHistoryIngredient],
    (data, ids) => {
        let result: Array<TOrderIngredient> = [];
        if (ids) {
            ids.map((id) => data.find((ingredient) => ingredient._id === id))
                .forEach((item) => {
                    if (item !== undefined) {
                        const value = result.find((ingredient) => ingredient.ingredient._id === item._id);
                        if (value) {
                            value.count += 1;
                        } else {
                            result.push({
                                count: 1,
                                ingredient: item
                            })
                        }
                    }
                })
        }
        return result;
    }
);

export const getOrderIngredients = createSelector(
    [ingredientsData, orderHistoryIngredient],
    (data, ids) => {
        let result: Array<TIngredient> = [];
        if (ids) {
            ids.map((id) => data.find((ingredient) => ingredient._id === id))
                .forEach((item) => {
                    if (item !== undefined) {
                        result.push(item);
                    }
                })
        }
        return result;
    }
);