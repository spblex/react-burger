import {store} from "../services/store";
import {getOrder} from "../utils/api-service";

describe('Test getOrder', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('getOrder: fulfilled', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => {
                return {
                    "success": true,
                }
            }
        });

        await store.dispatch(getOrder(1)).then((response) => {
            expect(response.payload.success).toBeTruthy();
        })
    })
})