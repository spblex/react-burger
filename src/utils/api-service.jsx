import { createAsyncThunk } from "@reduxjs/toolkit";
import {getCookie, setCookie} from "./cookie";

const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

const getOptions = (method) => {
    return {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

const updateToken = async () => {
    const response = await request(process.env.REACT_APP_AUTH_TOKEN, 'POST', { token: getCookie('refreshToken') }, false, false);
    if (response.success) {
        setCookie('accessToken', response.accessToken, true);
        setCookie('refreshToken', response.refreshToken, false);
    }
}

const request = async (url, method, data = null, needAuth = false, letUpdateToken = true) => {
    const options = getOptions(method);
    if (data) {
        options.body = JSON.stringify(data);
    }
    if (needAuth) {
        options.headers.Authorization = getCookie('accessToken');
    }
    let response = await fetch(url, options);
    if (!response.ok && response.status === 401 && letUpdateToken) {
        await updateToken();
        return await request(url, method, data, needAuth, false);
    }
    return getResponse(response);
}

export const loadIngredients = createAsyncThunk(
    'ingredients/load',
    async () => {
        return await request(process.env.REACT_APP_INGREDIENTS_URI, 'GET');
    }
);

export const makeOrder = createAsyncThunk(
    'order/make',
    async (payload) => {
        return await request(process.env.REACT_APP_ORDER_URI, 'POST', { ingredients: payload }, true);
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (payload) => {
        return await request(process.env.REACT_APP_AUTH_LOGIN, 'POST', payload);
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (payload) => {
        return await request(process.env.REACT_APP_AUTH_LOGOUT, 'POST', payload);
    }
);

export const token = createAsyncThunk(
    'auth/token',
    async (payload) => {
        return await request(process.env.REACT_APP_AUTH_TOKEN, 'POST', payload);
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (payload) => {
        return await request(process.env.REACT_APP_AUTH_REGISTER, 'POST', payload);
    }
);

export const passwordReset = createAsyncThunk(
    'password/reset',
    async (payload) => {
        return await request(process.env.REACT_APP_AUTH_PASSWORD_RESET, 'POST', payload);
    }
);

export const passwordResetConfirm = createAsyncThunk(
    'password/reset/confirm',
    async (payload) => {
        return await request(process.env.REACT_APP_AUTH_PASSWORD_RESET_CONFIRM, 'POST', payload);
    }
);

export const getUserInfo = createAsyncThunk(
    'auth/user/get',
    async () => {
        return await request(process.env.REACT_APP_AUTH_USER, 'GET', null, true);
    }
);

export const updateUserInfo = createAsyncThunk(
    'auth/user/update',
    async (payload) => {
        return await request(process.env.REACT_APP_AUTH_USER, 'PATCH', payload, true);
    }
);