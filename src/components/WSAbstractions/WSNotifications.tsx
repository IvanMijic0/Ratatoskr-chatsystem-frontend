import { Fragment, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector, useCreateNotification, useSnackbar } from "../../hooks";
import { NotificationAction, selectUser, setFriendStatus, setUserStatus } from "../../store";
import { webSocketService } from "../../services";
import { NotificationType, UserStatus } from "../../enums";
import { Notification } from "../../types";
import { useQueryClient } from "react-query";

const WSNotifications = () => {
	const { showSnackbar } = useSnackbar();

	const { mutate: mutatePostNotification } = useCreateNotification();
	const { _id, username } = useAppSelector(selectUser);

	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();

	const url = window.location.pathname;

	const onUserNotificationReceive = useCallback((message: { body: string }) => {
		console.log("WS Notification received");

		queryClient.invalidateQueries(['directMessagingsSummary']);
		const body: Notification = JSON.parse(message.body);

		showSnackbar(body.content, "info");
		dispatch(NotificationAction.postNotificationData(body, body.receiverId!));

	}, [dispatch, queryClient, showSnackbar]);

	const onUserOnlineStatusChange = useCallback((data: { body: string }) => {
		const body = JSON.parse(data.body);

		queryClient.invalidateQueries(['friends']);

		if (body) {
			const [id, friendUsername, status]: string = body.split(':');
			_id !== id && dispatch(setFriendStatus({ id, username: friendUsername, status }));
		} else {
			console.error('Body is null');
		}

	}, [_id, dispatch, queryClient]);

	const onConnected = useCallback(() => {
		console.log("WS Notifications connected successfully");

		webSocketService.subscribe(`/notifications/${_id}`, onUserNotificationReceive);
		webSocketService.subscribe('/notifications/onlineStatus', onUserOnlineStatusChange);

		webSocketService.send('/notifications/onlineStatus', {}, `${_id}:${username}:online`);

		mutatePostNotification({
			userId: _id,
			notification: { notificationType: NotificationType.USER_STATUS_CHANGED, content: UserStatus.ONLINE }
		});
		dispatch(setUserStatus(UserStatus.ONLINE));
	}, [_id, dispatch, mutatePostNotification, onUserNotificationReceive, onUserOnlineStatusChange, username]);

	useEffect(() => {
		console.log("WS Notifications connecting...");
		console.log(url.endsWith('friends') || url.endsWith('requests'));

		(url.endsWith('friends') || url.endsWith('requests')) && webSocketService.connect(onConnected);

	}, [onConnected, url]);

	return <Fragment />;
};

export default WSNotifications;
