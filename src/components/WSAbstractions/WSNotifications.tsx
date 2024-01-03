import { Fragment, useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector, useCreateNotification, useSnackbar } from "../../hooks";
import webSocketService from "../../services/WebSocketService.ts";
import { selectUser, setUserStatus } from "../../store";
import { Notification } from "../../types";
import { NotificationType, UserStatus } from "../../enums";

const WSNotifications = () => {
	const { showSnackbar } = useSnackbar();

	const { _id, username } = useAppSelector(selectUser);
	const { mutate: mutatePostNotification } = useCreateNotification();
	const dispatch = useAppDispatch();

	const onUserNotificationReceive = useCallback(async ( message: { body: string } ) => {
		const body: Notification = JSON.parse(message.body);
		showSnackbar(body.content, "info");

		//dispatch(NotificationAction.postNotificationData(body, body.receiverId!));
	}, [showSnackbar]);


	const onConnected = useCallback(() => {
		console.log("WS Notifications connected successfully");

		webSocketService.subscribe(`/notifications/${ _id }`, onUserNotificationReceive);
		webSocketService.send('/notifications/onlineStatus', {}, `${ _id }:${ username }:online`);

		mutatePostNotification({
			userId: _id,
			notification: { notificationType: NotificationType.USER_STATUS_CHANGED, content: UserStatus.ONLINE }
		});
		dispatch(setUserStatus(UserStatus.ONLINE));
	}, [_id, dispatch, mutatePostNotification, onUserNotificationReceive, username]);


	useEffect(() => {
		const establishConnection = async () => {
			await webSocketService.connect(onConnected);
		};

		try {
			establishConnection();
		} catch (e) {
			console.log(e);
		}

		return () => {
			webSocketService.disconnect();
		};
	}, [onConnected]);

	return <Fragment/>;
};

export default WSNotifications;