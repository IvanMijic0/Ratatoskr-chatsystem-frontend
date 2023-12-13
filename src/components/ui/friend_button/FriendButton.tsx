import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { stringAvatar } from "../../servers/ts/avatarUtils.ts";

import classes from "./FriendButton.module.css";

const FriendButton = ( { friendId, friendUsername, friendAvatarIconUrl }: {
	friendId: string;
	friendUsername: string;
	friendAvatarIconUrl?: string;
} ) => {
	const handleClick = () => {
		console.log(`pressed friend icon with id: ${ friendId } and username:  ${ friendUsername }`);
	};

	return <Box className={ classes["friend-button-container"] }>
		<Button onClick={ handleClick }>
			<Avatar
				{ ...stringAvatar(friendUsername) }
				alt={ friendUsername }
				src={ friendAvatarIconUrl }
			/>
			<Typography className={ classes["friend-username"] }>{ friendUsername }</Typography>
		</Button>
		<Divider className={ classes.divider } variant="middle" flexItem/>
	</Box>;
};

export default FriendButton;