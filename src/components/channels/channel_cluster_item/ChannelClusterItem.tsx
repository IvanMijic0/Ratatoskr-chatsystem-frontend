import { Box, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import classes from "./ChannelClusterItem.module.css";
import ChannelItem from "../channel_item/ChannelItem.tsx";
import AddChannelButton from "../add_channel_button/AddChannelButton.tsx";
import { useAppDispatch } from "../../../hooks/redux-hooks.ts";
import { setCurrentChannelCluster } from "../../../store/slice/channelClusters_slice/channelClusters-slice.ts";
import { fetchChannelClustersData } from "../../../store/action/channelClusters-action.ts";

const ChannelClusterItem = ( props: {
	channelClusterName: string;
	channelClusterId: string;
	channels: { name: string; _id: string; }[];
	serverId: string | null;
} ) => {
	const [expand, setExpand] = useState(false);
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();

	const handleClick = () => {
		setExpand(!expand);
	};

	const handleClickOpen = () => {
		dispatch(setCurrentChannelCluster({
			clusterName: props.channelClusterName,
			clusterId: props.channelClusterId
		}));
		setOpen(true);
	};
	const handleClose = () => {
		dispatch(fetchChannelClustersData(props.serverId));
		setOpen(false);
	};

	return <>
		<Box className={ classes['channel-container'] }>
			<ListItemButton className={ classes['channel-button'] } onClick={ handleClick }>
				{ expand ? <ExpandLess className={ classes["channel-icon"] }/> :
					<ExpandMore className={ classes["channel-icon"] }/> }
				<ListItemText primary={ props.channelClusterName }/>
			</ListItemButton>
			<AddChannelButton
				onClick={ handleClickOpen }
				onClose={ handleClose }
				open={ open }/>
		</Box>

		<Collapse in={ expand } timeout="auto" unmountOnExit>
			<List component="div" disablePadding dense>
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