import { Fragment, useEffect } from 'react';

import { useAppSelector } from "../hooks";
import { selectUser } from "../store";
import { webSocketService } from "../services";
import { NotificationType, UserStatus } from "../enums";
import useCreateNotification from "../hooks/useCreateNotification.ts";

const UnloadConfig = () => {
	const { username, _id } = useAppSelector(selectUser);
	const { mutate: mutatePostNotification } = useCreateNotification();

	useEffect(() => {
		const handleBeforeUnload = () => {
			webSocketService.send('/notifications/onlineStatus', {}, `${ _id }:${ username }:offline`);

			mutatePostNotification({
				userId: _id,
				notification: { notificationType: NotificationType.USER_STATUS_CHANGED, content: UserStatus.OFFLINE }
			});

		};

		document.onvisibilitychange = function () {
			if ( document.visibilityState === 'hidden' ) {
				handleBeforeUnload();
			} else {
				webSocketService.send('/notifications/onlineStatus', {}, `${ _id }:${ username }:online`);

				mutatePostNotification({
					userId: _id,
					notification: { notificationType: NotificationType.USER_STATUS_CHANGED, content: UserStatus.ONLINE }
				});
			}
		};

	}, [_id, mutatePostNotification, username]);

	return <Fragment/>;
};

export default UnloadConfig;