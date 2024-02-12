import {makeOrder} from "../utils/api-service";
import {store} from "../services/store";

describe('Test order-details', () => {

    const requestData = ["1", "2"]

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('makeOrder: pending', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

        store.dispatch(makeOrder(requestData));

        const {loading, error, success} = store.getState().order;
        expect(loading).toBeTruthy();
        expect(error).toBeNull();
        expect(success).toBeFalsy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('makeOrder: fulfilled', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => {
                return {
                    "success": true,
                }
            }
        });

        await store.dispatch(makeOrder(requestData));

        const {loading, error, success} = store.getState().order;
        expect(loading).toBeFalsy();
        expect(error).toBeNull();
        expect(success).toBeTruthy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('makeOrder: rejected', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 400
        });

        await store.dispatch(makeOrder(requestData));

        const {loading, error, success} = store.getState().order;
        expect(loading).toBeFalsy();
        expect(error).toEqual("Ошибка 400");
        expect(success).toBeFalsy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })
})