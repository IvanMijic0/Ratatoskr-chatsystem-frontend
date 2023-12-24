import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store.ts';
import { AuthState } from "../../types";

const initialState: AuthState = {
	isAuthenticated: false,
	token: null,
	refreshToken: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuthenticated: ( state, action: PayloadAction<boolean> ) => {
			state.isAuthenticated = action.payload;
		},
		setTokens: ( state, action: PayloadAction<{ token: string | null; refreshToken: string | null }> ) => {
			console.log('Setting tokens:', action.payload);
			state.token = action.payload.token || null;
			state.refreshToken = action.payload.refreshToken || null;
		},
	},
	extraReducers: ( builder ) => {
		builder.addCase("auth/purge", () => {
			return initialState;
		});
	},
});

export const selectIsAuthenticated = ( state: RootState ) => state.auth.isAuthenticated;
export const selectAccessToken = ( state: RootState ) => state.auth.token;
export const selectRefreshToken = ( state: RootState ) => state.auth.refreshToken;

export const { setIsAuthenticated, setTokens } = authSlice.actions;
export default authSlice.reducer;
