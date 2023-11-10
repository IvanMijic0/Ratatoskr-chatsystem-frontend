import { createSlice } from '@reduxjs/toolkit';
import IAuthState from "./IAuthState.ts";


const initialState: IAuthState = {
	token: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: ( state, action ) => {
			state.token = action.payload;
			state.isAuthenticated = !!action.payload;
		},
		clearToken: state => {
			state.token = null;
			state.isAuthenticated = false;
		}
	}
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;