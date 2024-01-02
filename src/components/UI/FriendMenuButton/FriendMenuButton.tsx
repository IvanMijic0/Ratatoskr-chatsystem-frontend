import { MouseEvent, useState } from "react";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from "@mui/material";

import { CustomMenu, CustomTooltip } from "../index.ts";
import classes from './FriendMenuButton.module.css';

const FriendMenuButton = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = ( event: MouseEvent<HTMLElement> ) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
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
			onClose={ handleClose }>
			<MenuItem className={ classes['menu-item'] } onClick={ handleClose }>
				Start Video Call
			</MenuItem>
			<MenuItem className={ classes['menu-item-red'] } onClick={ handleClose }>
				Remove Friend
			</MenuItem>
		</CustomMenu>
	</Box>;
};

export default FriendMenuButton;