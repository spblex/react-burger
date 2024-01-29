import {Middleware} from "redux";
import {TRootReducer} from "../types/stores";
import {TWsActionTypes} from "../types/ws-actions";
import {updateToken} from "../utils/api-service";
import {getCookie} from "../utils/cookie";

export const socketMiddleware = (wsActions: TWsActionTypes): Middleware<{}, TRootReducer> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url = null;
        let useToken = false;
        const {
            wsConnect,
            wsDisconnect,
            wsConnecting,
            onOpen,
            onClose,
            onError,
            onMessage
        } = wsActions;

        return (next) => (action) => {
            const { dispatch } = store;

            if (wsConnect.match(action)) {
                url = action.payload.url;
                useToken = action.payload.useToken;
                if (useToken) {
                    const token = getCookie('accessToken');
                    url += '?token=' + token?.replace("Bearer ", "");
                }

                socket = new WebSocket(url);
                dispatch(wsConnecting());

                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = () => {
                    dispatch(onError());
                };

                socket.onclose = () => {
                    dispatch(onClose());
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (useToken && parsedData.message === "Invalid or missing token") {
                        dispatch(wsDisconnect());
                        updateToken()
                            .then(() => {
                                dispatch(wsConnect(action.payload));
                            })
                            .catch(() => {
                                dispatch(onError());
                            });
                    } else {
                        dispatch(onMessage(parsedData));
                    }
                }
            }

            if (socket && wsDisconnect.match(action)) {
                socket.close();
                socket = null;
            }

            next(action);
        };
    };
};