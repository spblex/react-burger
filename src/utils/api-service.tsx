import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCookie, setCookie} from "./cookie";
import {
    HTTPMethod,
    TLoadIngredientsResponse,
    TLoginResponse,
    TOrderData,
    TOrderResponse,
    TPasswordResetData,
    TRegisterResponse,
    TResponse,
    TTokenData,
    TTokenResponse,
    TUserBaseData,
    TUserData,
    TUserEmail,
    TUserLoginData,
    TUserResponse
} from "../types/api-types";

function getResponse <T>(res: Response): Promise<T> {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject<T>(`Ошибка ${res.status}`);
}

const getOptions = (method: HTTPMethod, needAuth: boolean): RequestInit => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    if (needAuth) {
        const cookie = getCookie('accessToken');
        if (cookie) {
            headers.set('Authorization', cookie);
        }
    }
    return {
        method: method,
        mode: 'cors',
        headers: headers
    };
}

export const updateToken = async () => {
    const token : TTokenData = {token: getCookie('refreshToken') };
    const response = await request<TTokenResponse, TTokenData>(process.env.REACT_APP_AUTH_TOKEN!, HTTPMethod.POST, token, false, false);
    if (response.success) {
        setCookie('accessToken', response.accessToken, true);
        setCookie('refreshToken', response.refreshToken, false);
    }
}

const request = async <R, T = void>(url: string, method: HTTPMethod, data: T | null = null, needAuth = false, letUpdateToken = true): Promise<R> => {
    const options = getOptions(method, needAuth);
    if (data) {
        options.body = JSON.stringify(data);
    }
    let response = await fetch(url, options);
    if (!response.ok && response.status === 401 && letUpdateToken) {
        await updateToken();
        return await request(url, method, data, needAuth, false);
    }
    return getResponse<R>(response);
}

const createRequest = <R, T = void>(prefix: string, url: string, method: HTTPMethod, needAuth = false) => createAsyncThunk<R, T>(
    prefix,
     (payload) => {
        return  request<R, T>(url, method, payload, needAuth);
    }
)

const requestGet = <R, T = void>(prefix: string, url: string, needAuth = false) => createRequest<R, T>(prefix, url, HTTPMethod.GET, needAuth);
const requestPost = <R, T = void>(prefix: string, url: string, needAuth = false) => createRequest<R, T>(prefix, url, HTTPMethod.POST, needAuth);
const requestPatch = <R, T = void>(prefix: string, url: string, needAuth = false) => createRequest<R, T>(prefix, url, HTTPMethod.PATCH, needAuth);

export const loadIngredients = requestGet<TLoadIngredientsResponse>(
    'ingredients/load',
    process.env.REACT_APP_INGREDIENTS_URI!
);

export const makeOrder = requestPost<TOrderResponse, TOrderData>(
    'order/make',
    process.env.REACT_APP_ORDER_URI!,
    true
);

export const login = requestPost<TLoginResponse, TUserLoginData>(
    'auth/login',
    process.env.REACT_APP_AUTH_LOGIN!
);

export const logout = requestPost<TResponse, TTokenData>(
    'auth/logout',
    process.env.REACT_APP_AUTH_LOGOUT!
);

export const register = requestPost<TRegisterResponse, TUserData>(
    'auth/register',
    process.env.REACT_APP_AUTH_REGISTER!
);

export const passwordReset = requestPost<TResponse, TUserEmail>(
    'password/reset',
    process.env.REACT_APP_AUTH_PASSWORD_RESET!
);

export const passwordResetConfirm = requestPost<TResponse, TPasswordResetData>(
    'password/reset/confirm',
    process.env.REACT_APP_AUTH_PASSWORD_RESET_CONFIRM!
);

export const getUserInfo = requestGet<TUserResponse>(
    'auth/user/get',
    process.env.REACT_APP_AUTH_USER!,
    true
);

export const updateUserInfo = requestPatch<TUserResponse, TUserBaseData>(
    'auth/user/update',
    process.env.REACT_APP_AUTH_USER!,
    true
);