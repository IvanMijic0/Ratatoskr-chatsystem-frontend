import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index';
import { fetchUserSpecific } from '../../action/user-action';
import IUserState from "./IUserState.ts";

const initialState: IUserState = {
	userInfo: null,
	status: 'idle',
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: ( state, action: PayloadAction<IUserState> ) => {
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
			.addCase(fetchUserSpecific.pending, ( state ) => {
				state.status = 'loading';
			})
			.addCase(fetchUserSpecific.fulfilled, ( state, action ) => {
				state.status = 'succeeded';
				state.userInfo = action.payload;
			})
			.addCase(fetchUserSpecific.rejected, ( state, action ) => {
				state.status = 'failed';
				state.error = action.error.message || 'An error occurred.';
			});
	},
});

export const { setUser, setLoading, setError, clearUser } = userSlice.actions;

export const selectUser = ( state: RootState ) => state.user.userInfo;

export default userSlice.reducer;
