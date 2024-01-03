import { MouseEvent, useState } from "react";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from "@mui/material";

import { CustomMenu, CustomTooltip } from "../index.ts";
import { useDeleteFriend, useSnackbar } from "../../../hooks";
import classes from './FriendMenuButton.module.css';

const FriendMenuButton = ( { friendId }: { friendId: string } ) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const { mutate: mutateDeleteFriend } = useDeleteFriend();
	const { showSnackbar } = useSnackbar();

	const open = Boolean(anchorEl);
	const handleClick = ( event: MouseEvent<HTMLElement> ) => {
		setAnchorEl(event.currentTarget);
	};
	const startVideoCallHandler = () => {
		setAnchorEl(null);
	};

	const removeFriendHandler = () => {
		mutateDeleteFriend(friendId, {
			onSuccess: () => {
				showSnackbar("Friend removed successfully!", "success");
			},
			onError: ( error ) => {
				error instanceof Error && showSnackbar(error.message, "error");
			},
		});
		setAnchorEl(null);
	};

	return <Box>
		<IconButton
			className={ classes.icon }
			aria-label="more"
			id="long-button"
			aria-controls={ open ? 'long-menu' : undefined }
			aria-expanded={ open ? 'true' : undefined }
			aria-haspopup="true"
			onClick={ handleClick }>
			<CustomTooltip title="options" placement="right-end">
				<MoreVertIcon/>
			</CustomTooltip>
		</IconButton>
		<CustomMenu
			id="short-menu"
			MenuListProps={ {
				'aria-labelledby': 'short-button',
			} }
			anchorEl={ anchorEl }
			open={ open }
			onClose={ startVideoCallHandler }>
			<MenuItem className={ classes['menu-item'] } onClick={ startVideoCallHandler }>
				Start Video Call
			</MenuItem>
			<MenuItem className={ classes['menu-item-red'] } onClick={ removeFriendHandler }>
				Remove Friend
			</MenuItem>
		</CustomMenu>
	</Box>;
};

export default FriendMenuButton;