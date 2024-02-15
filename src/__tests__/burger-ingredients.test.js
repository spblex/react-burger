import {loadIngredients} from "../utils/api-service";
import {store} from "../services/store";

describe('Test burger-ingredients', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('loadIngredients: pending', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

        store.dispatch(loadIngredients());

        const {loading, error, success} = store.getState().ingredients;
        expect(loading).toBeTruthy();
        expect(error).toBeNull();
        expect(success).toBeFalsy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('loadIngredients: fulfilled', async () => {
        const mockData = [{"_id": "test"}];
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => {
                return {
                    "success": true,
                    "data": mockData
                }
            }
        });

        await store.dispatch(loadIngredients());

        const {loading, error, success, data} = store.getState().ingredients;
        expect(loading).toBeFalsy();
        expect(error).toBeNull();
        expect(success).toBeTruthy();
        expect(data).toBe(mockData);
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('loadIngredients: rejected', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 400
        });

        await store.dispatch(loadIngredients());

        const {loading, error, success} = store.getState().ingredients;
        expect(loading).toBeFalsy();
        expect(error).toEqual("Ошибка 400");
        expect(success).toBeFalsy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })
})