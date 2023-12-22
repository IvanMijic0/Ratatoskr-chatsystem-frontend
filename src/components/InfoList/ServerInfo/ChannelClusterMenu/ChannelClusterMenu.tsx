import { MenuItem } from "@mui/material";

import axiosInstance from "../../../../Configuration/axios-instance.ts";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchChannelClustersData, selectCurrentChannelClusterId, selectCurrentServerId } from "../../../../Store";
import { CustomMenu } from "../../../UI";
import classes from "./ChannelClusterMenu.module.css";

const ChannelClusterMenu = ( props: {
	anchorEl: HTMLElement | null,
	open: boolean,
	onClose: () => void,
	onAddDialogCLick: () => void,
	onRemoveChannelDialogClick: () => void,
} ) => {
	const currentServerId = useAppSelector(selectCurrentServerId);
	const currentChannelClusterId = useAppSelector(selectCurrentChannelClusterId);

	const dispatch = useAppDispatch();

	const handleDeleteCluster = async () => {
		try {
			await axiosInstance.delete(`/server/${ currentServerId }/channelCluster/${ currentChannelClusterId }`);

			console.log('Channel cluster deleted successfully!');
			dispatch(fetchChannelClustersData(currentServerId));
			props.onClose();
		} catch (error) {
			console.error('Error deleting channel cluster:', error);
		}
	};

	return <CustomMenu
		id="basic-menu"
		anchorEl={ props.anchorEl }
		open={ props.open }
		onClose={ props.onClose }
	>
		<MenuItem
			className={ classes["menu-item"] }
			onClick={ props.onAddDialogCLick }
		>
			Add Channel
		</MenuItem>
		<MenuItem className={ classes["menu-item"] } onClick={ props.onRemoveChannelDialogClick }>
			Remove Channels
		</MenuItem>
		<MenuItem className={ classes["menu-item-del"] } onClick={ handleDeleteCluster }>
			Delete Cluster
		</MenuItem>
	</CustomMenu>;
};

export default ChannelClusterMenu;