import {combineReducers} from "redux";
import {burgerIngredientsReducer} from "./burger-ingredients";
import {ingredientDetailsReducer} from "./ingredient-details";
import {burgerConstructorReducer} from "./burger-constructor";

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    details: ingredientDetailsReducer,
    burger: burgerConstructorReducer
})