import { useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector, useSnackbar } from "../../hooks";
import webSocketService from "../../services/WebSocketService.ts";
import { NotificationAction, selectUser } from "../../store";
import { Notification } from "../../types";

const WSNotifications = () => {
	const { showSnackbar } = useSnackbar();

	const { _id } = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const onUserNotificationReceive = useCallback(async ( message: { body: string } ) => {
		const body: Notification = JSON.parse(message.body);
		showSnackbar(body.content, "info");

		dispatch(NotificationAction.postNotificationData(body, body.receiverId!));
	}, [dispatch, showSnackbar]);

	const onConnected = useCallback(() => {
		console.log("WS Notifications connected successfully");
		webSocketService.subscribe(`/notifications/${ _id }`, onUserNotificationReceive);
	}, [_id, onUserNotificationReceive]);

	const onError = () => {
		console.error("Could not connect to WS Notifications. Please refresh this page and try again!");
	};
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			webSocketService.connect(onConnected, onError);
		}, 1000);

		return () => {
			clearTimeout(timeoutId);
			webSocketService.disconnect();
		};
	}, [onConnected]);

	return <> </>;
};

export default WSNotifications;