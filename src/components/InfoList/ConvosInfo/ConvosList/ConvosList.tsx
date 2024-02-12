import { Box, Button, Divider, IconButton, List, MenuItem } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { useQueryClient } from "react-query";
import { useState } from "react";

import { useAppSelector, useDeleteDirectMessagings, useDirectMessagingsSummary, useFriends, useSnackbar } from "../../../../hooks";
import { CustomCircularProgressBar, CustomMenu, FriendItem } from "../../../UI";
import { selectUser } from "../../../../store";
import { Notification } from "../../../../types";
import { NotificationType } from "../../../../enums";
import { webSocketService } from "../../../../services";
import classes from "./ConvosList.module.css";

const ConvosList = () => {
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const { data: convoData, isLoading } = useDirectMessagingsSummary();
	const { mutate: mutateDeleteDirectMessaging } = useDeleteDirectMessagings();
	const { showSnackbar } = useSnackbar();
	const queryClient = useQueryClient();

	const { data: friendsData } = useFriends();

	const navigate = useNavigate();

	const { _id } = useAppSelector(selectUser);

	const filteredConvoData = convoData?.filter(convo =>
		friendsData?.some(friend => friend._id === (convo.receiverId === _id ? convo.senderId : convo.receiverId))
	);

	const friendsButtonHandler = () => {
		navigate('/home/online-friends');
	};

	const convoButtonHandler = async (convoId: string, friendId: string) => {
		navigate(`/home/direct-messaging/${convoId}/${friendId}`);
		await queryClient.invalidateQueries(['directMessagingsById', convoId]);
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setMenuAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setMenuAnchorEl(null);
	};

	const handleRemoveDirectMessage = (convoId: string, friendId: string) => {
		const notification: Notification = {
			notificationType: NotificationType.DIRECT_MESSAGING_DELETED,
			date: new Date().toISOString(),
			senderId: _id,
			receiverId: friendId,
			content: `${_id} removed direct messaging with you!`,
		};

		webSocketService.send(
			`/app/notifications/${friendId}/friendRequest.send`,
			{},
			notification
		);

		showSnackbar("Direct message removed!", "success");

		mutateDeleteDirectMessaging({ friendId, directMessagingId: convoId });
		handleMenuClose();

		navigate('/home/all-friends');
	}

	const friendItems = filteredConvoData?.map(convo => {
		const friendId = convo.receiverId === _id ? convo.senderId : convo.receiverId;
		const friend = friendsData && friendsData.find(friend => friend._id === friendId);

		if (!friend) {
			return null;
		}

		return <Box className={classes["friend-item"]} key={convo._id}>
			<Button key={convo._id} onClick={() => convoButtonHandler(convo._id, friendId)}>
				<FriendItem
					currentUserId={_id}
					friendId={friendId}
					friendUsername={friend.username}
					friendAvatarIconUrl={friend.avatarImageUrl}
					status={friend.status}
				/>
			</Button>
			<Box>
				<IconButton className={classes['icon-button']} onClick={handleMenuOpen}>
					<SettingsIcon className={classes.icon} />
				</IconButton>
			</Box>

			<CustomMenu
				anchorEl={menuAnchorEl}
				open={Boolean(menuAnchorEl)}
				onClose={handleMenuClose}
			>

				<MenuItem onClick={() => handleRemoveDirectMessage(convo._id, friendId)} className={classes["menu-item"]}>Remove </MenuItem>
			</CustomMenu>
		</Box>;
	});


	return <List className={classes["friends-list"]} aria-labelledby="nested-list-subheader" dense>
		<Button
			className={classes["add-friend-button"]}
			variant="text"
			sx={{ textTransform: "none" }}
			startIcon={<PeopleIcon className={classes["add-friend-icon"]} />}
			onClick={friendsButtonHandler}>
			Friends
		</Button>
		<Divider className={classes.divider} variant="middle" flexItem />
		{isLoading
			? <Box>
				<CustomCircularProgressBar />
			</Box>
			: <Box>
				{friendItems && friendItems.length > 0
					? friendItems
					: <p>No direct-messages</p>
				}
			</Box>
		}
	</List>;
};

export default ConvosList;