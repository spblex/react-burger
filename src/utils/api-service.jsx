import { createAsyncThunk } from "@reduxjs/toolkit";

const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

function request(url, options) {
    return fetch(url, options).then(getResponse);
}

export const loadIngredients = createAsyncThunk(
    'ingredients/load',
    async () => {
        return await request(process.env.REACT_APP_INGREDIENTS_URI);
    }
);

export const makeOrder = createAsyncThunk(
    'order/make',
    async (payload,thunkAPI) => {
        const data = JSON.stringify({ ingredients: payload });
        return await request(process.env.REACT_APP_ORDER_URI, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: data
        });
    }
);