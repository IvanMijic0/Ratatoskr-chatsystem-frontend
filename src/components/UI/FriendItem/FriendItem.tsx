import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ChatIcon from '@mui/icons-material/Chat';
import { FC, useState } from "react";

import { CustomTooltip, FriendMenuButton } from "../index.ts";
import { FriendItemProps, Notification } from "../../../types";
import { webSocketService } from "../../../services";
import { NotificationType } from "../../../enums";
import { useAppDispatch } from "../../../hooks";
import { stringAvatar } from "../../../utils";
import classes from "./FriendItem.module.css";
import { NotificationAction, UserAction } from "../../../store";

const FriendItem: FC<FriendItemProps>
	= ( {
			currentUserUsername,
			currentUserId,
			friendId,
			friendUsername,
			friendAvatarIconUrl,
			actionType,
			description,
		} ) => {

	const [statusChangeText, setStatusChangeText] = useState('');

	const dispatch = useAppDispatch();

	const addFriendHandler = async () => {
		const notification: Notification = {
			notificationType: NotificationType.FRIEND_REQUEST,
			date: new Date().toISOString(),
			senderId: currentUserId,
			receiverId: friendId,
			content: `${ currentUserUsername } sent you a friend request!`,
		};

		webSocketService.send(
			`/app/notifications/${ friendId }/friendRequest.send`,
			{},
			notification
		);

		setStatusChangeText('sent');

		// Do only if user is offline, fix later...
		dispatch(NotificationAction.postNotificationData(notification, friendId!));
	};

	const confirmFriendRequestHandler = async () => {
		dispatch(UserAction.addFriend(friendId!));
	};

	const clearFriendRequestHandler = async () => {
		dispatch(NotificationAction.clearNotificationData());
	};

	const startConversationHandler = async () => {
	};

	const actions = () => {
		switch (actionType) {
			case 0: {
				return <IconButton className={ classes["friend-button"] } onClick={ addFriendHandler }>
					<PersonAddIcon className={ classes["friend-button-icon"] }/>
				</IconButton>;
			}
			case 1: {
				return <Box className={ classes['request-button-container'] }>
					<IconButton className={ classes["approve-button"] } onClick={ confirmFriendRequestHandler }>
						<CustomTooltip title="approve" placement="left-start">
							<CheckIcon className={ classes["approve-icon"] }/>
						</CustomTooltip>
					</IconButton>
					<IconButton className={ classes["clear-button"] } onClick={ clearFriendRequestHandler }>
						<CustomTooltip title="decline" placement="right-start">
							<ClearIcon className={ classes["clear-icon"] }/>
						</CustomTooltip>
					</IconButton>
				</Box>;
			}
			case 2: {
				return <Box className={ classes['friend-button-container'] }>
					<IconButton className={ classes["friend-button"] } onClick={ startConversationHandler }>
						<CustomTooltip title="start convo" placement="left-start">
							<ChatIcon className={ classes["friend-button-icon"] }/>
						</CustomTooltip>
					</IconButton>
					<FriendMenuButton/>
				</Box>;
			}
			default:
				return null;
		}
	};

	return <>
		<Box className={ classes["friend-button-container"] }>
			<Avatar
				{ ...stringAvatar(friendUsername) }
				alt={ friendUsername }
				src={ friendAvatarIconUrl }
			/>
			<Typography className={ classes["friend-username"] }>
				{ `${ friendUsername } ${ description || '' }` }
			</Typography>
			<Box className={ classes['action-container'] }>
				{ statusChangeText !== ''
					? <Typography className={ classes.text }>{ statusChangeText }</Typography>
					: actions() }
			</Box>
		</Box>
		<Divider className={ classes.divider } variant="middle" flexItem/>
	</>;
};

export default FriendItem;
