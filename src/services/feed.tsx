import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {TFeedData, TFeedStore, WebsocketStatus} from "../types/stores";
import {wsClose, wsConnect, wsConnecting, wsDisconnect, wsError, wsMessage, wsOpen} from "./ws-actions";

const initData: TFeedData = {
    success: false,
    total: 0,
    totalToday: 0,
    orders: []
}

const initialState: TFeedStore = {
    status: WebsocketStatus.OFFLINE,
    data: initData,
};

const feedSlice = createSlice({
    name: 'feed-order-all',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(wsOpen, (state) => {
                state.status = WebsocketStatus.ONLINE;
                state.data = initData;
            })
            .addCase(wsError, (state) => {
                state.status = WebsocketStatus.ERROR;
            })
            .addCase(wsMessage, (state, action) => {
                state.status = WebsocketStatus.ONLINE;
                if (action.payload) {
                    state.data = action.payload;
                }
            })
            .addMatcher(isAnyOf(wsConnect, wsConnecting), (state) => {
                state.status = WebsocketStatus.CONNECTING;
                state.data = initData;
            })
            .addMatcher(isAnyOf(wsClose, wsDisconnect), (state) => {
                state.status = WebsocketStatus.OFFLINE;
            })
    }
});

export const feedPublicReducer = feedSlice.reducer;