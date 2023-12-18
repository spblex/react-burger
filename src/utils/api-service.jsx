import { createAsyncThunk } from "@reduxjs/toolkit";

const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const loadIngredients = createAsyncThunk(
    'ingredients/load',
    async (thunkAPI) => {
        return await fetch(process.env.REACT_APP_INGREDIENTS_URI)
            .then(getResponse)
            .catch(e => {
                return thunkAPI.rejectWithValue(e.message);
            });
    }
);

export const makeOrder = createAsyncThunk(
    'order/make',
    async (payload,thunkAPI) => {
        const data = JSON.stringify({ ingredients: payload });
        return await fetch(process.env.REACT_APP_ORDER_URI, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: data
        })
            .then(getResponse)
            .catch(e => {
                return thunkAPI.rejectWithValue(e);
            });
    }
);