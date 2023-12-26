import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { FC, useState } from "react";

import webSocketService from "../../../services/WebSocketService.ts";
import { FriendItemProps, Notification } from "../../../types";
import { stringAvatar } from "../../../utils";
import { NotificationType } from "../../../enums";
import classes from "./FriendItem.module.css";
import { axiosInstance } from "../../../configuration";
import { useAppDispatch } from "../../../hooks";
import { fetchNotificationData } from "../../../store";

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
		await axiosInstance.post(`/notifications/${ friendId }`, notification);
		dispatch(fetchNotificationData());
	};

	const confirmFriendRequestHandler = async () => {
		try {
			console.log(await axiosInstance.post(`/user/add-friend/${ friendId }`));

			await clearFriendRequestHandler();
		} catch (error) {
			console.log("Could not confirm friend request: " + error);
			throw error;
		}
	};

	const clearFriendRequestHandler = async () => {
		try {
			await axiosInstance.delete(`/notifications`);

			dispatch(fetchNotificationData());
		} catch (error) {
			console.log("Could not clear friend request: " + error);
			throw error;
		}
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
						<CheckIcon className={ classes["approve-icon"] }/>
					</IconButton>
					<IconButton className={ classes["clear-button"] } onClick={ clearFriendRequestHandler }>
						<ClearIcon className={ classes["clear-icon"] }/>
					</IconButton>
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
