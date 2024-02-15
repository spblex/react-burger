import {store} from "../services/store";
import {getUserInfo, login, logout, updateUserInfo, register as registerUser} from "../utils/api-service";
import {setIsAuth} from "../services/auth";
import {getCookie, setCookie} from "../utils/cookie";

describe('Test auth: setIsAuth', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('setIsAuth: true', async () => {

        store.dispatch(setIsAuth(true));

        const {isAuth} = store.getState().auth;
        expect(isAuth).toBeTruthy();
    })

    test('setIsAuth: false', async () => {

        store.dispatch(setIsAuth(false));

        const {isAuth} = store.getState().auth;
        expect(isAuth).toBeFalsy();
    })

})

describe('Test auth: login', () => {

    const requestData = {
        email: "email",
        password: "password"
    }

    const responseData = {
        "email": "email",
        "name": "name"
    };

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('login: pending', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

        store.dispatch(login(requestData));

        const {loading, error, isAuth} = store.getState().auth;
        expect(loading).toBeTruthy();
        expect(isAuth).toBeFalsy();
        expect(error).toBeNull();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('login: fulfilled', async () => {

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => {
                return {
                    "success": true,
                    "accessToken": "accessToken",
                    "refreshToken": "refreshToken",
                    "user": responseData
                }
            }
        });

        await store.dispatch(login({
            email: "email",
            password: "password"
        }));

        const {loading, error, isAuth, user} = store.getState().auth;
        expect(loading).toBeFalsy();
        expect(isAuth).toBeTruthy();
        expect(error).toBeNull();
        expect(user).toBe(responseData);
        expect(fetch).toHaveBeenCalledTimes(1);

        const accessToken = getCookie("accessToken");
        expect(accessToken).toEqual("accessToken");

        const refreshToken = getCookie("refreshToken");
        expect(refreshToken).toEqual("refreshToken");
    })

    test('login: rejected', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 400
        });

        await store.dispatch(login(requestData));

        const {loading, error, isAuth} = store.getState().auth;
        expect(loading).toBeFalsy();
        expect(isAuth).toBeFalsy();
        expect(error).toEqual("Ошибка 400");
        expect(fetch).toHaveBeenCalledTimes(1);
    })
})

describe('Test auth: register', () => {

    const requestData = {
        name: "name",
        email: "email",
        password: "password"
    }

    const responseData = {
        "email": "email",
        "name": "name"
    };

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('register: pending', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

        store.dispatch(registerUser(requestData));

        const {loading, error, isAuth} = store.getState().auth;
        expect(loading).toBeTruthy();
        expect(isAuth).toBeFalsy();
        expect(error).toBeNull();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('register: fulfilled', async () => {

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => {
                return {
                    "success": true,
                    "accessToken": "accessToken",
                    "refreshToken": "refreshToken",
                    "user": responseData
                }
            }
        });

        await store.dispatch(registerUser(requestData));

        const {loading, error, isAuth, user} = store.getState().auth;
        expect(loading).toBeFalsy();
        expect(isAuth).toBeTruthy();
        expect(error).toBeNull();
        expect(user).toBe(responseData);
        expect(fetch).toHaveBeenCalledTimes(1);

        const accessToken = getCookie("accessToken");
        expect(accessToken).toEqual("accessToken");

        const refreshToken = getCookie("refreshToken");
        expect(refreshToken).toEqual("refreshToken");
    })

    test('register: rejected', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 400
        });

        await store.dispatch(registerUser(requestData));

        const {loading, error, isAuth} = store.getState().auth;
        expect(loading).toBeFalsy();
        expect(isAuth).toBeFalsy();
        expect(error).toEqual("Ошибка 400");
        expect(fetch).toHaveBeenCalledTimes(1);
    })
})

describe('Test auth: logout', () => {

    const requestData = {
        token: "token"
    }

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('logout: pending', async () => {
        store.dispatch(setIsAuth(true));
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

        store.dispatch(logout(requestData));

        const {loading, isAuth} = store.getState().auth;
        expect(loading).toBeTruthy();
        expect(isAuth).toBeTruthy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('logout: fulfilled', async () => {
        store.dispatch(setIsAuth(true));
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => {
                return {
                    "success": true
                }
            }
        });

        await store.dispatch(logout(requestData));

        const {loading, isAuth, user} = store.getState().auth;
        expect(loading).toBeFalsy();
        expect(isAuth).toBeFalsy();
        expect(user.email).toEqual("");
        expect(user.name).toEqual("");
        expect(fetch).toHaveBeenCalledTimes(1);

        const accessToken = getCookie("accessToken");
        expect(accessToken).toBeNull();

        const refreshToken = getCookie("refreshToken");
        expect(refreshToken).toBeNull();
    })

    test('logout: rejected', async () => {
        store.dispatch(setIsAuth(true));
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 400
        });

        await store.dispatch(logout(requestData));

        const {loading, error, isAuth} = store.getState().auth;
        expect(loading).toBeFalsy();
        expect(isAuth).toBeTruthy();
        expect(error).toEqual("Ошибка 400");
        expect(fetch).toHaveBeenCalledTimes(1);
    })
})

describe('Test auth: getUserInfo', () => {

    const responseData = {
        "email": "email",
        "name": "name"
    }

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('getUserInfo: pending', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

        store.dispatch(getUserInfo());

        const {loading} = store.getState().auth;
        expect(loading).toBeTruthy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('getUserInfo: fulfilled', async () => {
        setCookie("accessToken", "accessToken", true);
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => {
                return {
                    "success": true,
                    "user": responseData
                }
            }
        });

        await store.dispatch(getUserInfo());

        const {loading, error, user} = store.getState().auth;
        expect(loading).toBeFalsy();
        expect(user).toBe(responseData);
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('getUserInfo: updateToken rejected', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 401
        })

        await store.dispatch(getUserInfo());

        const {loading, error} = store.getState().auth;
        expect(loading).toBeFalsy();
        expect(error).toEqual("Ошибка 401");
        expect(fetch).toHaveBeenCalledTimes(2);
    })

    test('getUserInfo: rejected', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 400
        });

        await store.dispatch(getUserInfo());

        const {loading, error} = store.getState().auth;
        expect(loading).toBeFalsy();
        expect(error).toEqual("Ошибка 400");
        expect(fetch).toHaveBeenCalledTimes(1);
    })
})

describe('Test auth: updateUserInfo', () => {

    const requestData = {
        name: 'name',
        password: 'password',
        email: 'email'
    }

    const responseData = {
        "email": "email",
        "name": "name"
    };

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('updateUserInfo: pending', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

        store.dispatch(updateUserInfo({
            name: 'name',
            password: 'password',
            email: 'email'
        }));

        const {loading} = store.getState().auth;
        expect(loading).toBeTruthy();
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('updateUserInfo: fulfilled', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => {
                return {
                    "success": true,
                    "user": responseData
                }
            }
        });

        await store.dispatch(updateUserInfo(requestData));

        const {loading, user} = store.getState().auth;
        expect(loading).toBeFalsy();
        expect(user).toBe(responseData);
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('updateUserInfo: rejected', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 400
        });

        await store.dispatch(updateUserInfo(requestData));

        const {loading, error} = store.getState().auth;
        expect(loading).toBeFalsy();
        expect(error).toEqual("Ошибка 400");
        expect(fetch).toHaveBeenCalledTimes(1);
    })
})