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
                thunkAPI.rejectWithValue(e.message);
            });
    }
);