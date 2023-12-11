import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../index.ts';
import IFriendState from './IFriendState.ts';
import { fetchFriendInfoDataAction } from "../../action/friend-actions.ts";

const initialState: IFriendState = {
	friendInfoData: [],
	status: 'idle',
	error: null,
	currentFriendName: '',
	currentFriendId: '0000-0000',
};

const friendSlice = createSlice({
	name: 'friend',
	initialState,
	reducers: {
		setCurrentFriendInfo: ( state, action ) => {
			state.currentFriendName = action.payload.friendName;
			state.currentFriendId = action.payload.friendId;
		},
		resetCurrentFriendInfoData: ( state ) => {
			state.currentFriendName = '';
			state.currentFriendId = '';
		},
	},
	extraReducers: ( builder ) => {
		builder
			.addCase(fetchFriendInfoDataAction.pending, ( state ) => {
				state.status = 'loading';
			})
			.addCase(fetchFriendInfoDataAction.fulfilled, ( state, action ) => {
				state.status = 'succeeded';
				state.friendInfoData = action.payload;
			})
			.addCase(fetchFriendInfoDataAction.rejected, ( state, action ) => {
				state.status = 'failed';
				state.error = action.error.message || 'An error occurred.';
			});
	},
});

export const { setCurrentFriendInfo, resetCurrentFriendInfoData } = friendSlice.actions;

export const selectFriendInfoData = ( state: RootState ) => state.friend.friendInfoData;
export const selectFriendStatus = ( state: RootState ) => state.friend.status;
export const selectFriendError = ( state: RootState ) => state.friend.error;
export const selectCurrentFriendName = ( state: RootState ) => state.friend.currentFriendName;
export const selectCurrentFriendId = ( state: RootState ) => state.friend.currentFriendId;

// Used createSelector for memoization
export const selectCurrentFriendInfo = createSelector(
	[selectCurrentFriendName, selectCurrentFriendId],
	( currentFriendName, currentFriendId ) =>
		( { friendName: currentFriendName, friendId: currentFriendId } )
);

export default friendSlice.reducer;
