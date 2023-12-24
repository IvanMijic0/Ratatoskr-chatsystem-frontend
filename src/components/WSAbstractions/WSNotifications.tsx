import { useEffect } from "react";
import webSocketService from "../../services/WebSocketService.ts";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../store";

const WSNotifications = () => {
	const { _id } = useAppSelector(selectUser);

	const onUserNotificationReceive = ( payload: { body: string } ) => {
		console.log(payload.body);
	};

	const onConnected = () => {
		console.log("WS Notifications connected successfully");
		webSocketService.subscribe(`/notifications/${ _id }`, onUserNotificationReceive);
	};

	const onError = () => {
		console.error("Could not connect to WS Notifications. Please refresh this page and try again!");
	};

	useEffect(() => {
		webSocketService.connect(onConnected, onError);

		return () => webSocketService.disconnect();
	}, []);

	return <></>;
};

export default WSNotifications;