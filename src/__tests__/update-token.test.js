import {updateToken} from "../utils/api-service";

describe('Test update-token', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('update-token: fulfilled', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => {
                return {
                    "success": true,
                }
            }
        });

        await updateToken();
    })
})