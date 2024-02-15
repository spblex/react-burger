import {passwordReset, passwordResetConfirm} from "../utils/api-service";
import {store} from "../services/store";

describe('Test password: passwordReset', () => {

    const requestData = {
        email: "email"
    }

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('passwordReset: pending', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

        store.dispatch(passwordReset(requestData));

        const {loading, error, success} = store.getState().password;
        expect(loading).toBeTruthy();
        expect(error).toBeNull();
        expect(success).toBeFalsy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('passwordReset: fulfilled', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => {
                return {
                    "success": true,
                }
            }
        });

        await store.dispatch(passwordReset(requestData));

        const {loading, error, success} = store.getState().password;
        expect(loading).toBeFalsy();
        expect(error).toBeNull();
        expect(success).toBeTruthy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('passwordReset: rejected', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 400
        });

        await store.dispatch(passwordReset(requestData));

        const {loading, error, success} = store.getState().password;
        expect(loading).toBeFalsy();
        expect(error).toEqual("Ошибка 400");
        expect(success).toBeFalsy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })
})

describe('Test password: passwordResetConfirm', () => {

    const requestData = {
        password: "password",
        token: "token"
    }

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('passwordResetConfirm: pending', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

        store.dispatch(passwordResetConfirm(requestData));

        const {loading, error, success} = store.getState().password;
        expect(loading).toBeTruthy();
        expect(error).toBeNull();
        expect(success).toBeFalsy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('passwordResetConfirm: fulfilled', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => {
                return {
                    "success": true,
                }
            }
        });

        await store.dispatch(passwordResetConfirm(requestData));

        const {loading, error, success} = store.getState().password;
        expect(loading).toBeFalsy();
        expect(error).toBeNull();
        expect(success).toBeTruthy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('passwordResetConfirm: rejected', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 400
        });

        await store.dispatch(passwordResetConfirm(requestData));

        const {loading, error, success} = store.getState().password;
        expect(loading).toBeFalsy();
        expect(error).toEqual("Ошибка 400");
        expect(success).toBeFalsy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })
})