import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {passwordReset, passwordResetConfirm} from "../utils/api-service";

const passwordSlice = createSlice({
    name: 'password',
    initialState: {
        success: false,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(passwordReset.pending, passwordResetConfirm.pending), (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addMatcher(isAnyOf(passwordReset.rejected, passwordResetConfirm.rejected), (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.error?.message;
            })
            .addMatcher(isAnyOf(passwordReset.fulfilled, passwordResetConfirm.fulfilled), (state, action) => {
                state.loading = false;
                state.success = action.payload && action.payload?.success;
                state.error = null;
            })
    }
});

export const passwordReducer = passwordSlice.reducer;