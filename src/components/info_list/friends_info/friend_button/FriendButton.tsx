import classes from "../../../servers/servers_/Servers.module.css";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { stringAvatar } from "../../../servers/ts/avatarUtils.ts";

const FriendButton = ( { friendId, friendUsername, friendAvatarIconUrl }: {
	friendId: string;
	friendUsername: string;
	friendAvatarIconUrl: string;
} ) => {
	const handleClick = () => {
		console.log("pressed friend icon");
		console.log(friendId);
	};

	return <Box className={ classes["friend-button-container"] }>
		<Button onClick={ handleClick }>
			<Avatar
				{ ...stringAvatar(friendUsername) }
				alt={ friendUsername }
				src={ friendAvatarIconUrl }
			/>
			<Typography>{ friendUsername }</Typography>
		</Button>
	</Box>;
};

export default FriendButton;