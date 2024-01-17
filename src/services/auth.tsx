import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {getUserInfo, login, logout, register, updateUserInfo} from "../utils/api-service";
import {deleteCookie, setCookie} from "../utils/cookie";
import {TAuthStore, TUser} from "../types/stores";

const initialState: TAuthStore = {
    isAuth: false,
    user: {
        name: '',
        email: ''
    },
    loading: false,
    error: null
};

const getInitUser =(): TUser => {
    return {
        name: '',
        email: ''
    };
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.pending, state => {
                state.loading = true;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = !action.payload?.success;
                state.user = getInitUser();
                deleteCookie('accessToken', 'refreshToken');
            })
            .addMatcher(isAnyOf(getUserInfo.pending, updateUserInfo.pending), state => {
                state.loading = true;
            })
            .addMatcher(isAnyOf(getUserInfo.rejected, updateUserInfo.rejected), (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? null;
            })
            .addMatcher(isAnyOf(getUserInfo.fulfilled, updateUserInfo.fulfilled), (state, action) => {
                state.loading = false;
                state.user = action.payload?.user;
            })
            .addMatcher(isAnyOf(login.pending, register.pending), (state) => {
                state.loading = true;
                state.error = null;
                state.isAuth = false;
                state.user = getInitUser();
                deleteCookie('accessToken', 'refreshToken');
            })
            .addMatcher(isAnyOf(login.rejected, register.rejected), (state, action) => {
                state.loading = false;
                state.isAuth = false;
                state.error = action.error?.message ?? null;
            })
            .addMatcher(isAnyOf(login.fulfilled, register.fulfilled), (state, action) => {
                state.loading = false;
                state.isAuth = action.payload !== null && action.payload.success && action.payload.accessToken?.length !== 0;
                state.user = action.payload?.user;
                setCookie('accessToken', action.payload?.accessToken, true);
                setCookie('refreshToken', action.payload?.refreshToken, false);
            })
    }
});

export const authReducer = authSlice.reducer;
export const {setIsAuth} = authSlice.actions;