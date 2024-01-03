import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { AppThunk, Notification, RootState } from "../../types";
import { NotificationService } from "../../services";

const fetchNotificationData = createAsyncThunk(
	'notifications/fetchNotificationData',
	async () => {
		try {
			return await NotificationService.getFriendNotification();
		} catch (error) {
			console.error('Error fetching notification data:', error);
			throw error;
		}
	}
);


const clearNotificationData = (): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			await NotificationService.clearNotification();
			dispatch(fetchNotificationData());
		} catch (error) {
			console.log("Could not clear friend request: ", error);
			throw error;
		}
	};
};

const postNotificationData = ( notification: Notification, friendId: string ): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			await NotificationService.postUserNotification(friendId, notification);
			dispatch(fetchNotificationData());
		} catch (error) {
			console.log("Could not post notification: ", error);
			throw error;
		}
	};
};

export default { fetchNotificationData, clearNotificationData, postNotificationData };