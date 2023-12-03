import { Box, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import classes from "./ChannelClusterItem.module.css";
import ChannelItem from "../channel_item/ChannelItem.tsx";
import AddChannelButton from "../add_channel_button/AddChannelButton.tsx";

const ChannelClusterItem = ( props: { channelClusterName: string; channels: any; } ) => {
	const [expand, setExpand] = useState(false);
	const [open, setOpen] = useState(false);


	const handleClick = () => {
		setExpand(!expand);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
		event.preventDefault();
	};

	return <>
		<Box className={ classes['channel-container'] }>
			<ListItemButton className={ classes['channel-button'] } onClick={ handleClick }>
				{ expand ? <ExpandLess className={ classes["channel-icon"] }/> :
					<ExpandMore className={ classes["channel-icon"] }/> }
				<ListItemText primary={ props.channelClusterName }/>
			</ListItemButton>
			<AddChannelButton
				handleSubmit={ handleSubmit }
				onClick={ handleClickOpen }
				onClose={ handleClose }
				open={ open }/>
		</Box>

		<Collapse in={ expand } timeout="auto" unmountOnExit>
			<List component="div" disablePadding>
				{ props.channels.map(( channel: { name: string; _id: string; } ) =>
					<ChannelItem
						key={ channel._id }
						channelName={ channel.name }
					/>)
				}
			</List>
		</Collapse>
	</>;
};

export default ChannelClusterItem;