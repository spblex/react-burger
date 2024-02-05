import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

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