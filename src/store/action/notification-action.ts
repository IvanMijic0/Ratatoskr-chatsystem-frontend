import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { axiosInstance } from "../../configuration";
import { AppThunk, Notification, RootState } from "../../types";

const fetchNotificationData =
	createAsyncThunk('notification/fetchNotificationData', async () => {
		try {
			return ( await axiosInstance.get('/notifications') ).data;
		} catch (error) {
			console.error('Error fetching notification data:', error);
		}
	});

const clearNotificationData = (): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			await axiosInstance.delete(`/notifications`);

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
			await axiosInstance.post(`/notifications/${ friendId }`, notification);
			dispatch(fetchNotificationData());
		} catch (error) {
			console.log("Could not post notification: ", error);
			throw error;
		}
	};
};

export default { fetchNotificationData, clearNotificationData, postNotificationData };