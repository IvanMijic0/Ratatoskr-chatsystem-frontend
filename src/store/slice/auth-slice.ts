import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAuthState from "./IAuthState.ts";
import { RootState } from "../index.ts";


const initialState: IAuthState = {
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuthenticated: ( state, action: PayloadAction<boolean> ) => {
			state.isAuthenticated = action.payload;
		},
	},
});

export const selectIsAuthenticated = ( state: RootState ) => state.auth.isAuthenticated;
export const { setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;