import { Box, Collapse, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchChannelClustersData, setCurrentChannelCluster } from "../../../../store";
import { ChannelClusterOptionsButton } from "../ChannelClusterOptionsButton";
import { RemoveChannelDialog } from "../RemoveChannelDialog";
import { ChannelClusterMenu } from "../ChannelClusterMenu";
import { AddChannelDialog } from "../AddChannelDialog";
import { ChannelItem } from "../ChannelItem";
import { useAppDispatch } from "../../../../hooks";
import classes from "./ChannelClusterItem.module.css";

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

	const { clusterId } = useParams();
	const dispatch = useAppDispatch();

	const menuOpen = Boolean(anchorEl);

	useEffect(() => {
		dispatch(setCurrentChannelCluster({
			clusterName: props.channelClusterName,
			clusterId: props.channelClusterId
		}));
		clusterId === props.channelClusterId && setExpand(true);
	}, [clusterId, dispatch, props.channelClusterId, props.channelClusterName]);

	const handleMenuOpen = ( event: MouseEvent<HTMLElement> ) => {
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