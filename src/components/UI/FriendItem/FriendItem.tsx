import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import classes from "./FriendItem.module.css";
import { FC } from "react";
import webSocketService from "../../../Services/WebSocketService.ts";
import { FriendItemProps } from "../../../Types";
import { stringAvatar } from "../../../utils";

const FriendItem: FC<FriendItemProps>
	= ( {
			currentUserId,
			friendId,
			friendUsername,
			friendAvatarIconUrl,
			hasAction,
		} ) => {

	const addFriendHandler = () => {
		const notification = {
			notificationType: 'FRIEND_REQUEST',
			date: new Date().toISOString(),
			senderId: 'user123',
			content: 'Friend request content',
		};

		webSocketService.send(
			`/app/notifications/${ friendId }/friendRequest.send`,
			{},
			notification
		);
	};


	return <>
		<Box className={ classes["friend-button-container"] }>
			<Avatar
				{ ...stringAvatar(friendUsername) }
				alt={ friendUsername }
				src={ friendAvatarIconUrl }
			/>
			<Typography className={ classes["friend-username"] }>
				{ friendUsername }
			</Typography>
			{ hasAction
				&& <Button
                className={ classes["add-friend-button"] }>
                <PersonAddIcon className={ classes["add-friend-button-icon"] }
                               onClick={ addFriendHandler }/>
              </Button>
			}
		</Box>
		<Divider className={ classes.divider } variant="middle" flexItem/>
	</>;
};

export default FriendItem;
