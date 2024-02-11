import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./root-reducer";
import {wsFeedMiddleware} from "./ws-actions";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(wsFeedMiddleware);
    }
});