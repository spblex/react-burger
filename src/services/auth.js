import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {login, logout, register} from "../utils/api-service";
import {deleteCookie, setCookie} from "../utils/cookie";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        data: {},
        loading: false,
        error: null
    },
    reducers: {
        setAuthData(state, action) {
            const accessToken = action.payload?.accessToken;
            const refreshToken = action.payload?.refreshToken
            state.isAuth = accessToken && refreshToken;
            state.data = {
                accessToken: accessToken,
                refreshToken: refreshToken
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.pending, state => {
                state.loading = true;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = !action.payload?.success;
                state.data = {};
                deleteCookie('accessToken', 'refreshToken');
            })
            .addMatcher(isAnyOf(login.pending, register.pending), (state) => {
                state.loading = true;
                state.error = null;
                state.isAuth = false;
                state.data ={};
                deleteCookie('accessToken', 'refreshToken');
            })
            .addMatcher(isAnyOf(login.rejected, register.rejected), (state, action) => {
                state.loading = false;
                state.isAuth = false;
                state.error = action.error?.message;
            })
            .addMatcher(isAnyOf(login.fulfilled, register.fulfilled), (state, action) => {
                state.loading = false;
                state.isAuth = action.payload !== null && action.payload.success && action.payload.accessToken?.length !== 0;
                state.data = action.payload;
                setCookie('accessToken', action.payload?.accessToken);
                setCookie('refreshToken', action.payload?.refreshToken);
            })
    }
});

export const authReducer = authSlice.reducer;
export const {setAuthData} = authSlice.actions;