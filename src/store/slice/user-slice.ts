import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserState from "../../types/UserState.ts";
import { RootState } from "../../types";
import UserAction from "../action/user-action.ts";

const initialState: UserState = {
	userInfo: null,
	status: 'idle',
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: ( state, action: PayloadAction<UserState> ) => {
			return {
				...state,
				...action.payload,
				status: 'succeeded',
			};
		},
		setLoading: ( state ) => {
			state.status = 'loading';
			state.error = null;
		},
		setError: ( state, action: PayloadAction<string> ) => {
			state.status = 'failed';
			state.error = action.payload;
		},
		clearUser: () => initialState,
	},
	extraReducers: ( builder ) => {
		builder
			.addCase(UserAction.fetchUserSpecific.pending, ( state ) => {
				state.status = 'loading';
			})
			.addCase(UserAction.fetchUserSpecific.fulfilled, ( state, action ) => {
				state.status = 'succeeded';
				state.userInfo = action.payload;
			})
			.addCase(UserAction.fetchUserSpecific.rejected, ( state, action ) => {
				state.status = 'failed';
				state.error = action.error.message || 'An Error occurred.';
			});
	},
});

export const { setUser, setLoading, setError, clearUser } = userSlice.actions;

export const selectUser = ( state: RootState ) => state.user.userInfo;

export default userSlice.reducer;
