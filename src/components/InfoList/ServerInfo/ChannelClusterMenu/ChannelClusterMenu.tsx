import { useParams } from "react-router-dom";
import { MenuItem } from "@mui/material";

import { useDeleteChannelCluster, useSnackBar } from "../../../../hooks";
import { ChannelClusterMenuProps } from "../../../../types";
import { CustomMenu } from "../../../UI";
import classes from "./ChannelClusterMenu.module.css";

const ChannelClusterMenu
	= ( {
			open,
			anchorEl,
			onRemoveChannelDialogClick,
			onAddDialogCLick,
			onClose,
			clusterId
		}: ChannelClusterMenuProps ) => {
	const { showSnackbar } = useSnackBar();
	const { mutate: mutateDeleteChannelCluster } = useDeleteChannelCluster();
	const { serverId } = useParams();

	const handleDeleteCluster = async () => {
		mutateDeleteChannelCluster({ serverId: serverId!, channelClusterId: clusterId }, {
			onSuccess: () => {
				showSnackbar('Channel cluster deleted successfully!', 'success');
				onClose();
			},
			onError: ( error ) => {
				error instanceof Error && showSnackbar(error.message, 'error');
			}
		});
	};

	return <CustomMenu
		id="basic-menu"
		anchorEl={ anchorEl }
		open={ open }
		onClose={ onClose }
	>
		<MenuItem
			className={ classes["menu-item"] }
			onClick={ onAddDialogCLick }
		>
			Add Channel
		</MenuItem>
		<MenuItem className={ classes["menu-item"] } onClick={ onRemoveChannelDialogClick }>
			Remove Channels
		</MenuItem>
		<MenuItem className={ classes["menu-item-del"] } onClick={ handleDeleteCluster }>
			Delete Cluster
		</MenuItem>
	</CustomMenu>;
};

export default ChannelClusterMenu;