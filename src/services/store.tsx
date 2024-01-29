import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./root-reducer";
import {wsFeedPublicMiddleware} from "../types/ws-actions";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(wsFeedPublicMiddleware);
    }
});