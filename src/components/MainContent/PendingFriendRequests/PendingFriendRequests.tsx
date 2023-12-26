import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { useAppSelector } from "../../../hooks";
import { selectNotificationsData, selectNotificatiosExists } from "../../../store";
import { Notification, UserInfo } from "../../../types";
import { axiosInstance } from "../../../configuration";
import { FriendItem } from "../../UI";
import { ActionType } from "../../../enums";
import classes from "./PendingFriendRequests.module.css";

const PendingFriendRequests = () => {
	const [pendingFriendRequestsUI, setPendingFriendRequestsUI] = useState<UserInfo[]>([]);

	const pendingFriendRequests: Notification[] = useAppSelector(selectNotificationsData);
	const pendingFriendRequestsExists = useAppSelector(selectNotificatiosExists);

	const fetchFriendRequestsUI = useCallback(async () => {
		if ( pendingFriendRequests.length > 0 ) {
			const senderIds = pendingFriendRequests.map(( notification ) => notification.senderId);

			try {
				const userInfoArray = await Promise.all(
					senderIds.map(async ( senderId ) => {
						const response = await axiosInstance.get(`/user/${ senderId }`);
						return response.data;
					})
				);
				setPendingFriendRequestsUI(userInfoArray);
			} catch (error) {
				console.error("Error fetching user information:", error);
			}
		}
	}, [pendingFriendRequests]);


	useEffect(() => {
		try {
			fetchFriendRequestsUI();
		} catch (error) {
			console.log("Could not fetch pending friend requests: " + error);
			throw error;
		}
	}, [fetchFriendRequestsUI]);

	return <Box className={ classes['content-container'] }>
		<Box className={ classes['friend-list-container'] }>
			{ pendingFriendRequestsExists
				? pendingFriendRequestsUI.map(pendingRequest =>
					<FriendItem
						key={ pendingRequest._id }
						friendId={ pendingRequest._id }
						friendUsername={ pendingRequest.username }
						friendAvatarIconUrl={ pendingRequest.avatarUrl }
						description={ "sent you a friend request!" }
						actionType={ ActionType.APPROVE_FRIEND }
					/>
				)
				: <Typography className={ classes.text }>No current friend requests...</Typography> }
		</Box>
	</Box>;
};

export default PendingFriendRequests;