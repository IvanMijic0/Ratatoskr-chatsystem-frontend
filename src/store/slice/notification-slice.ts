import { createSlice } from "@reduxjs/toolkit";

import { NotificationState, RootState } from "../../types";
import NotificationAction from "../action/notification-action.ts";

const initialState: NotificationState = {
	data: [],
	status: "idle",
	error: null,
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {},
	extraReducers: ( builder ) => {
		builder
			.addCase(NotificationAction.fetchNotificationData.pending, ( state ) => {
				state.status = "loading";
			})
			.addCase(NotificationAction.fetchNotificationData.fulfilled, ( state, action ) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(NotificationAction.fetchNotificationData.rejected, ( state, action ) => {
				state.status = "failed";
				state.error = action.error.message || "An error occurred.";
			});
	},
});

export const selectNotificationsData = ( state: RootState ) =>
	state.notification.data;

export const selectNotificationsLength = ( state: RootState ) =>
	state.notification.data.length;

export const selectNotificatiosExists = ( state: RootState ) =>
	state.notification.data.length > 0;
export const selectNotificationsStatus = ( state: RootState ) =>
	state.notification.status;
export const selectNotificationsError = ( state: RootState ) =>
	state.notification.error;

export default notificationSlice.reducer;