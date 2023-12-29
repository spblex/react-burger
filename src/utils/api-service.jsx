import { createAsyncThunk } from "@reduxjs/toolkit";

const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

function getRequest(url) {
    return fetch(url).then(getResponse);
}

function postRequest(url, payload) {
    const data = JSON.stringify(payload);
    return fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: data
    }).then(getResponse);
}

export const loadIngredients = createAsyncThunk(
    'ingredients/load',
    async () => {
        return await getRequest(process.env.REACT_APP_INGREDIENTS_URI);
    }
);

export const makeOrder = createAsyncThunk(
    'order/make',
    async (payload) => {
        return await postRequest(process.env.REACT_APP_ORDER_URI, { ingredients: payload });
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (payload) => {
        return await postRequest(process.env.REACT_APP_AUTH_LOGIN, payload);
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (payload) => {
        return await postRequest(process.env.REACT_APP_AUTH_LOGOUT, payload);
    }
);

export const token = createAsyncThunk(
    'auth/token',
    async (payload) => {
        return await postRequest(process.env.REACT_APP_AUTH_TOKEN, payload);
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (payload) => {
        return await postRequest(process.env.REACT_APP_AUTH_REGISTER, payload);
    }
);

export const passwordReset = createAsyncThunk(
    'password/reset',
    async (payload) => {
        return await postRequest(process.env.REACT_APP_AUTH_PASSWORD_RESET, payload);
    }
);

export const passwordResetConfirm = createAsyncThunk(
    'password/reset/confirm',
    async (payload) => {
        return await postRequest(process.env.REACT_APP_AUTH_PASSWORD_RESET_CONFIRM, payload);
    }
);