import {combineReducers} from "redux";
import {burgerIngredientsReducer} from "./burger-ingredients";
import {burgerConstructorReducer} from "./burger-constructor";
import {orderDetailsReducer} from "./order-details";
import {authReducer} from "./auth";
import {passwordReducer} from "./password";
import {feedPublicReducer} from "./feed";

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    burger: burgerConstructorReducer,
    order: orderDetailsReducer,
    auth: authReducer,
    password: passwordReducer,
    feedPublic: feedPublicReducer
})