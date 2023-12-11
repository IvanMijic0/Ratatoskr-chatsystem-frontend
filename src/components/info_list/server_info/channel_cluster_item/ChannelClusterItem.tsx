import { Box, Collapse, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import ChannelItem from "../channel_item/ChannelItem.tsx";
import { useAppDispatch } from "../../../../hooks/redux-hooks.ts";
import { setCurrentChannelCluster } from "../../../../store/slice/channelClusters_slice/channelClusters-slice.ts";
import { fetchChannelClustersData } from "../../../../store/action/channelClusters-action.ts";
import classes from "./ChannelClusterItem.module.css";
import AddChannelDialog from "../add_channel_dialog/AddChannelDialog.tsx";
import RemoveChannelDialog from "../remove_channel_dialog/RemoveChannelDialog.tsx";
import ChannelClusterMenu from "../channel_cluster_menu/ChannelClusterMenu.tsx";
import ChannelClusterOptionsButton from "../channel_cluster_options_button/ChannelClusterOptionsButton.tsx";


const ChannelClusterItem = ( props: {
	channelClusterName: string;
	channelClusterId: string;
	channels: { name: string; id: string; }[];
	serverId: string | null;
} ) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [expand, setExpand] = useState(false);
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
	const [removableChannelIds, setRemovableChannelIds] = useState<string[]>([]);

	const menuOpen = Boolean(anchorEl);
	const dispatch = useAppDispatch();

	const handleMenuOpen = ( event: React.MouseEvent<HTMLButtonElement> ) => {
		dispatch(setCurrentChannelCluster({
			clusterName: props.channelClusterName,
			clusterId: props.channelClusterId
		}));
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleClusterExpand = () => {
		dispatch(setCurrentChannelCluster({
			clusterName: props.channelClusterName,
			clusterId: props.channelClusterId
		}));
		setExpand(!expand);
	};

	const handleAddDialogOpen = () => {
		dispatch(setCurrentChannelCluster({
			clusterName: props.channelClusterName,
			clusterId: props.channelClusterId
		}));
		setOpenAddDialog(true);
		handleMenuClose();
	};

	const handleRemoveDialogClose = () => {
		setOpenRemoveDialog(false);
		setRemovableChannelIds([]);
		handleMenuClose();
	};

	const handleRemoveDialogOpen = () => {
		setOpenRemoveDialog(true);
		handleMenuClose();
	};

	const handleAddDialogClose = () => {
		dispatch(fetchChannelClustersData(props.serverId));
		setOpenAddDialog(false);
		handleMenuClose();
	};

	return <>
		<Box className={ classes['channel-container'] }>
			<ListItem>
				<ListItemButton className={ classes['channel-button'] } onClick={ handleClusterExpand }>
					{ expand ? <ExpandLess className={ classes["channel-icon"] }/> :
						<ExpandMore className={ classes["channel-icon"] }/> }
					<ListItemText primary={ props.channelClusterName }/>
				</ListItemButton>
				<ChannelClusterOptionsButton handleMenuOpen={ handleMenuOpen }/>
				<ChannelClusterMenu
					anchorEl={ anchorEl }
					open={ menuOpen }
					onClose={ handleMenuClose }
					onAddDialogCLick={ handleAddDialogOpen }
					onRemoveChannelDialogClick={ handleRemoveDialogOpen }/>
			</ListItem>
		</Box>

		<AddChannelDialog open={ openAddDialog } onClose={ handleAddDialogClose }/>
		<RemoveChannelDialog
			open={ openRemoveDialog }
			onClose={ handleRemoveDialogClose }
			channels={ props.channels.slice(1) }
			removableChannelIds={ removableChannelIds }
			onRemovableChannelIds={ setRemovableChannelIds }
		/>

		<Collapse in={ expand } timeout="auto" unmountOnExit>
			<List component="div" disablePadding dense>
				{ props.channels.map(( channel: { name: string; id: string; } ) =>
					<ChannelItem
						key={ channel.id }
						channelId={ channel.id }
						channelName={ channel.name }
					/>)
				}
			</List>
		</Collapse>
	</>;
};

export default ChannelClusterItem;