import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAuthState from './IAuthState.ts';
import { RootState } from '../../index.ts';

const initialState: IAuthState = {
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
});

export const selectIsAuthenticated = ( state: RootState ) => state.auth.isAuthenticated;
export const selectAccessToken = ( state: RootState ) => state.auth.token;
export const selectRefreshToken = ( state: RootState ) => state.auth.refreshToken;

export const { setIsAuthenticated, setTokens } = authSlice.actions;
export default authSlice.reducer;
