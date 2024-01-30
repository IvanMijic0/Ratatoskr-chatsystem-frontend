import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserState from "../../types/UserState.ts";
import { RootState, UserInfo } from "../../types";
import UserAction from "../action/user-action.ts";

const initialState: UserState = {
	userInfo: null,
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
		clearUser: () => initialState,
	},
	extraReducers: builder => {
		builder.addCase(UserAction.fetchUserSpecific.fulfilled, ( state, action: PayloadAction<UserInfo> ) => {
			state.userInfo = action.payload;
		});
	},
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = ( state: RootState ) => state.user.userInfo;

export default userSlice.reducer;
