import {createAction} from "@reduxjs/toolkit";
import {socketMiddleware} from "./socket-middleware";
import {TWsConnectPayload} from "../types/ws-actions";

export const wsConnect = createAction<TWsConnectPayload, 'WS_FEED_CONNECT'>('WS_FEED_CONNECT');
export const wsDisconnect = createAction("WS_FEED_DISCONNECT");

export const wsConnecting = createAction("WS_FEED_CONNECTING");
export const wsOpen = createAction("WS_FEED_OPEN");
export const wsClose = createAction("WS_FEED_CLOSE");
export const wsError = createAction("WS_FEED_ERROR");
export const wsMessage = createAction("WS_FEED_MESSAGE");


export const wsFeedMiddleware = socketMiddleware({
    wsConnect: wsConnect,
    wsDisconnect: wsDisconnect,
    wsConnecting: wsConnecting,
    onOpen: wsOpen,
    onError: wsError,
    onClose: wsClose,
    onMessage: wsMessage
});