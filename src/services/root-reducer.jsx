import {ingredientsReducer} from "./burger-ingredients";
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer
})