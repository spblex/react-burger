import {combineReducers} from "redux";
import {ingredientsReducer} from "./burger-ingredients";
import {detailsReducer} from "./ingredient-details";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    details: detailsReducer
})