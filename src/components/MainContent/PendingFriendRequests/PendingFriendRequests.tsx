import { Box, Typography } from "@mui/material";
import { useAppSelector, useFriendRequestsUI } from "../../../hooks";
import { Notification } from "../../../types";
import { ActionType } from "../../../enums";
import { FriendItem } from "../../UI";
import classes from "./PendingFriendRequests.module.css";
import { selectNotificationRequestData } from "../../../store/slice/notification-slice.ts";

const PendingFriendRequests = () => {
	const pendingFriendRequests: Notification[] = useAppSelector(selectNotificationRequestData);

	const senderIds = pendingFriendRequests?.map(( notification ) => notification.senderId);
	const { data: pendingFriendRequestsUI } = useFriendRequestsUI(senderIds);

	return <Box className={ classes['content-container'] }>
		<Box className={ classes['friend-list-container'] }>
			{ pendingFriendRequests.length > 0
				? pendingFriendRequestsUI?.map(pendingRequest =>
					<FriendItem
						key={ pendingRequest._id }
						friendId={ pendingRequest._id }
						friendUsername={ pendingRequest.username }
						friendAvatarIconUrl={ pendingRequest.avatarImageUrl }
						description={ "sent you a friend request!" }
						actionType={ ActionType.APPROVE_FRIEND }
					/>
				)

				: <Typography className={ classes.text }>No current friend requests...</Typography>
			}
		</Box>
	</Box>;
};

export default PendingFriendRequests;