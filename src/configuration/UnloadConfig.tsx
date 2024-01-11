import { Fragment, useEffect } from 'react';

import { useAppSelector, useCreateUserNotification } from "../hooks";
import { selectUser } from "../store";
import { webSocketService } from "../services";
import { NotificationType, UserStatus } from "../enums";

const UnloadConfig = () => {
	const { username, _id } = useAppSelector(selectUser);
	const { mutate: mutatePostNotification } = useCreateUserNotification();

	useEffect(() => {
		const handleBeforeUnload = () => {
			webSocketService.send('/notifications/onlineStatus', {}, `${ _id }:${ username }:offline`);

			mutatePostNotification(
				{ notificationType: NotificationType.USER_STATUS_CHANGED, content: UserStatus.OFFLINE }
			);
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};

	}, [_id, mutatePostNotification, username]);

	return <Fragment/>;
};

export default UnloadConfig;
