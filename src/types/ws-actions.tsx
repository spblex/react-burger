import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction} from "@reduxjs/toolkit";
import {socketMiddleware} from "../services/socket-middleware";

export type TWsConnectPayload = {
    url: string;
    useToken: boolean;
}

export type TWsActionTypes = {
    wsConnect: ActionCreatorWithPayload<TWsConnectPayload>;
    wsDisconnect: ActionCreatorWithoutPayload;
    wsConnecting: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithoutPayload;
    onMessage: ActionCreatorWithPayload<any>;
};

export const wsConnect = createAction<TWsConnectPayload, 'WS_FEED_PUBLIC_CONNECT'>('WS_FEED_PUBLIC_CONNECT');
export const wsDisconnect = createAction("WS_FEED_PUBLIC_DISCONNECT");

export const wsConnecting = createAction("WS_FEED_PUBLIC_CONNECTING");
export const wsOpen = createAction("WS_FEED_PUBLIC_OPEN");
export const wsClose = createAction("WS_FEED_PUBLIC_CLOSE");
export const wsError = createAction("WS_FEED_PUBLIC_ERROR");
export const wsMessage = createAction("WS_FEED_PUBLIC_MESSAGE");


export const wsFeedPublicMiddleware = socketMiddleware({
    wsConnect: wsConnect,
    wsDisconnect: wsDisconnect,
    wsConnecting: wsConnecting,
    onOpen: wsOpen,
    onError: wsError,
    onClose: wsClose,
    onMessage: wsMessage,
});

export type TWsActions =
    | ReturnType<typeof wsConnect>
    | ReturnType<typeof wsDisconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsError>
    | ReturnType<typeof wsMessage>;