import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Notification, NotificationState, RootState } from "../../types";
import NotificationAction from "../action/notification-action.ts";
import { NotificationType, UserStatus } from "../../enums";

const initialState: NotificationState = {
	data: [],
	userStatus: null,
	friendStatus: null,
};

const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		setUserStatus: ( state, action: { payload: UserStatus } ) => {
			state.userStatus = action.payload;
		},
		setFriendStatus: (
			state,
			action: { payload: { id: string; username: string; status: string } }
		) => {
			const convertedStatus =
				action.payload.status === "online"
					? UserStatus.ONLINE
					: UserStatus.OFFLINE;

			const updatedStatus = {
				id: action.payload.id,
				username: action.payload.username,
				status: convertedStatus,
			};

			state.friendStatus = state.friendStatus || [];

			const existingFriendIndex = state.friendStatus.findIndex(
				( friend ) => friend.id === action.payload.id
			);

			if ( existingFriendIndex !== -1 ) {
				state.friendStatus = state.friendStatus.map(( friend, index ) =>
					index === existingFriendIndex ? updatedStatus : friend
				);
			} else {
				state.friendStatus = [...state.friendStatus, updatedStatus];
			}
		},
	},
	extraReducers: ( builder ) => {
		builder.addCase(
			NotificationAction.fetchNotificationData.fulfilled,
			( state, action: PayloadAction<Notification[]> ) => {
				state.data = action.payload;
			}
		);
	},

});


export const selectNotificationData = ( state: RootState ) =>
	state.notification.data;

export const selectNotificationRequestData = createSelector(
	[selectNotificationData],
	( notificationData ) =>
		notificationData.filter(
			( notification ) => notification.notificationType === NotificationType.FRIEND_REQUEST
		)
);

export const selectNotificationLength = ( state: RootState ) =>
	state.notification.data.length;

export const selectNotificationExists = ( state: RootState ) =>
	state.notification.data.length > 0;

export const selectUserStatus = ( state: RootState ) =>
	state.notification.userStatus;

export const selectFriendStatus = ( state: RootState ) =>
	state.notification.friendStatus;

export const selectFriendStatusById = ( friendId: string ) =>
	createSelector([selectFriendStatus], ( friendStatus ) =>
		friendStatus?.find(( friend ) => friend.id === friendId) || null
	);

export const {
	setUserStatus, setFriendStatus
} = notificationSlice.actions;

export default notificationSlice.reducer;