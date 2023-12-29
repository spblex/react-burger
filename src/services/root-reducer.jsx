import {combineReducers} from "redux";
import {burgerIngredientsReducer} from "./burger-ingredients";
import {ingredientDetailsReducer} from "./ingredient-details";
import {burgerConstructorReducer} from "./burger-constructor";
import {orderDetailsReducer} from "./order-details";
import {authReducer} from "./auth";
import {passwordReducer} from "./password";

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    details: ingredientDetailsReducer,
    burger: burgerConstructorReducer,
    order: orderDetailsReducer,
    auth: authReducer,
    password: passwordReducer
})