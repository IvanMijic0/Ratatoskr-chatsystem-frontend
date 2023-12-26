import { useCallback, useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

import webSocketService from "../../services/WebSocketService.ts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchNotificationData, selectUser } from "../../store";
import { axiosInstance } from "../../configuration";
import { Notification } from "../../types";

const WSNotifications = () => {
	const [notificationReceived, setNotificationReceived] = useState(false);
	const [alertText, setAlertText] = useState('');

	const { _id } = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const onUserNotificationReceive = useCallback(async ( message: { body: string } ) => {
		const body: Notification = JSON.parse(message.body);
		setAlertText(body.content);
		setNotificationReceived(true);

		await axiosInstance.post(`/notifications/${ body.receiverId }`, body);
		dispatch(fetchNotificationData());
	}, [dispatch]);

	const onConnected = useCallback(() => {
		console.log("WS Notifications connected successfully");
		webSocketService.subscribe(`/notifications/${ _id }`, onUserNotificationReceive);
	}, [_id, onUserNotificationReceive]);

	const onError = () => {
		console.error("Could not connect to WS Notifications. Please refresh this page and try again!");
	};

	const handleClose = () => {
		setNotificationReceived(false);

		setTimeout(() => {
			setAlertText('');
		}, 1000);

	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			webSocketService.connect(onConnected, onError);
		}, 2000);

		return () => {
			clearTimeout(timeoutId);
			webSocketService.disconnect();
		};
	}, [onConnected]);

	return <Snackbar open={ notificationReceived } autoHideDuration={ 4000 } onClose={ handleClose }>
		<Alert onClose={ handleClose } severity="info" sx={ { width: '100%' } }>
			{ alertText }
		</Alert>
	</Snackbar>;
};

export default WSNotifications;