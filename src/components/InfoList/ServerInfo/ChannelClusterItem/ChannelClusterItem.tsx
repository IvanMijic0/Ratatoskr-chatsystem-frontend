import { Box, Collapse, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { MouseEvent, useState } from "react";

import { fetchChannelClustersData } from "../../../../store";
import { ChannelClusterOptionsButton } from "../ChannelClusterOptionsButton";
import { Channel, ChannelCluster } from "../../../../types";
import { RemoveChannelDialog } from "../RemoveChannelDialog";
import { ChannelClusterMenu } from "../ChannelClusterMenu";
import { AddChannelDialog } from "../AddChannelDialog";
import { useAppDispatch } from "../../../../hooks";
import { ChannelItem } from "../ChannelItem";
import classes from "./ChannelClusterItem.module.css";
import { useParams } from "react-router-dom";

const ChannelClusterItem = ( { name, channels, id }: ChannelCluster ) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [expand, setExpand] = useState(false);
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
	const [removableChannelIds, setRemovableChannelIds] = useState<string[]>([]);

	const menuOpen = Boolean(anchorEl);

	const dispatch = useAppDispatch();
	const { serverId } = useParams();

	const handleMenuOpen = ( event: MouseEvent<HTMLElement> ) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleClusterExpand = () => {
		setExpand(!expand);
	};

	const handleAddDialogOpen = () => {
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
		dispatch(fetchChannelClustersData(serverId));

		setOpenAddDialog(false);
		handleMenuClose();
	};

	return <>
		<Box className={ classes['channel-container'] }>
			<ListItem>
				<ListItemButton className={ classes['channel-button'] } onClick={ handleClusterExpand }>
					{ expand ? <ExpandLess className={ classes["channel-icon"] }/> :
						<ExpandMore className={ classes["channel-icon"] }/> }
					<ListItemText primary={ name }/>
				</ListItemButton>
				<ChannelClusterOptionsButton handleMenuOpen={ handleMenuOpen }/>
				<ChannelClusterMenu
					anchorEl={ anchorEl }
					open={ menuOpen }
					onClose={ handleMenuClose }
					onAddDialogCLick={ handleAddDialogOpen }
					onRemoveChannelDialogClick={ handleRemoveDialogOpen }
					clusterId={ id }/>
			</ListItem>
		</Box>

		<AddChannelDialog
			open={ openAddDialog }
			onClose={ handleAddDialogClose }
			clusterId={ id }/>

		<RemoveChannelDialog
			open={ openRemoveDialog }
			onClose={ handleRemoveDialogClose }
			channels={ channels?.slice(1) }
			removableChannelIds={ removableChannelIds }
			clusterId={ id }
			onRemovableChannelIds={ setRemovableChannelIds }
		/>

		<Collapse in={ expand } timeout="auto" unmountOnExit>
			<List disablePadding dense>
				{ channels?.map(( channel: Channel ) =>
					<ChannelItem
						key={ channel.id }
						id={ channel.id }
						clusterId={ id }
						name={ channel.name }
					/>)
				}
			</List>
		</Collapse>
	</>;
};

export default ChannelClusterItem;