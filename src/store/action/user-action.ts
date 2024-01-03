import { createAsyncThunk } from '@reduxjs/toolkit';

import NotificationAction from "./notification-action.ts";
import { AppThunk, RootState } from "../../types";
import { UserService } from "../../services";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const fetchUserSpecific = createAsyncThunk(
	'user/fetchUserSpecific',
	async () => {
		try {
			return await UserService.fetchUserSpecific();
		} catch (error) {
			console.error('Error fetching user data:', error);
			throw error;
		}
	}
);

const addFriend = ( friendId: string ): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			await UserService.confirmFriendRequest(friendId);
			dispatch(NotificationAction.clearNotificationData());
		} catch (error) {
			console.log("Could not confirm friend request: ", error);
			throw error;
		}
	};
};

export default { fetchUserSpecific, addFriend };