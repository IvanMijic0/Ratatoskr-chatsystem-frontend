import { Fragment, useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector, useCreateNotification, useSnackbar } from "../../hooks";
import webSocketService from "../../services/WebSocketService.ts";
import { NotificationAction, selectUser, setFriendStatus, setUserStatus } from "../../store";
import { Notification } from "../../types";
import { NotificationType, UserStatus } from "../../enums";
import { useQueryClient } from "react-query";

const WSNotifications = () => {
	const { showSnackbar } = useSnackbar();

	const { mutate: mutatePostNotification } = useCreateNotification();
	const { _id, username } = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();

	const onUserNotificationReceive = useCallback(async ( message: { body: string } ) => {
		//await queryClient.invalidateQueries('directMessagings');
		const body: Notification = JSON.parse(message.body);

		showSnackbar(body.content, "info");
		dispatch(NotificationAction.postNotificationData(body, body.receiverId!));
	}, [dispatch, queryClient, showSnackbar]);

	const onUserOnlineStatusChange = useCallback(async ( data: { body: string } ) => {
		const body = JSON.parse(data.body);

		await queryClient.invalidateQueries('friends');

		const [id, friendUsername, status]: string = body.split(':');
		_id !== id && dispatch(setFriendStatus({ id, username: friendUsername, status }));

	}, [_id, dispatch, queryClient]);

	const onConnected = useCallback(() => {
		console.log("WS Notifications connected successfully");

		webSocketService.subscribe(`/notifications/${ _id }`, onUserNotificationReceive);
		webSocketService.subscribe('/notifications/onlineStatus', onUserOnlineStatusChange);

		webSocketService.send('/notifications/onlineStatus', {}, `${ _id }:${ username }:online`);

		mutatePostNotification({
			userId: _id,
			notification: { notificationType: NotificationType.USER_STATUS_CHANGED, content: UserStatus.ONLINE }
		});
		dispatch(setUserStatus(UserStatus.ONLINE));
	}, [_id, dispatch, mutatePostNotification, onUserNotificationReceive, onUserOnlineStatusChange, username]);


	useEffect(() => {
		const establishConnection = async () => {
			await webSocketService.connect(onConnected);
		};

		try {
			establishConnection().then();
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