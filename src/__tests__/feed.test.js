import {store} from "../services/store";
import {wsConnecting, wsDisconnect, wsError, wsMessage, wsOpen} from "../services/ws-actions";
import {WebsocketStatus} from "../types/stores";

describe('Test feed', () => {

    const responseData = {
        success: true,
        total: 10,
        totalToday: 100,
        orders: [1, 2, 3]
    }

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('feed: wsConnecting', async () => {
        store.dispatch(wsConnecting());

        const {status} = store.getState().feed;
        expect(status).toBe(WebsocketStatus.CONNECTING);
    })

    test('feed: wsDisconnect', async () => {
        store.dispatch(wsDisconnect());

        const {status} = store.getState().feed;
        expect(status).toBe(WebsocketStatus.OFFLINE);
    })

    test('feed: wsOpen', async () => {
        store.dispatch(wsOpen());

        const {status} = store.getState().feed;
        expect(status).toBe(WebsocketStatus.ONLINE);
    })

    test('feed: wsError', async () => {
        store.dispatch(wsError());

        const {status} = store.getState().feed;
        expect(status).toBe(WebsocketStatus.ERROR);
    })

    test('feed: wsError', async () => {
        store.dispatch(wsMessage(responseData));

        const {status, data} = store.getState().feed;
        expect(status).toBe(WebsocketStatus.ONLINE);
        expect(data).toBe(responseData);
    })
})