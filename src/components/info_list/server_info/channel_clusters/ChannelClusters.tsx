import { Divider, List } from "@mui/material";
import { useCallback, useEffect, useState } from "react";


import ChannelClusterItem from "../channel_cluster_item/ChannelClusterItem.tsx";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks.ts";
import { selectCurrentServerInfo } from "../../../../store/slice/server_slice/server-slice.ts";
import { selectChannelClustersData } from "../../../../store/slice/channelClusters_slice/channelClusters-slice.ts";
import { fetchChannelClustersData } from "../../../../store/action/channelClusters-action.ts";
import ServerHeader from "../ServerHeader.tsx";
import classes from "./ChannelsClusters.module.css";

const ChannelClusters = () => {
	const [channelClusterFormOpen, setChannelClusterFormOpen] = useState(false);

	const dispatch = useAppDispatch();
	const channelClustersData = useAppSelector(selectChannelClustersData);
	const serverInfoData = useAppSelector(selectCurrentServerInfo);

	const handleClickOpen = () => {
		setChannelClusterFormOpen(true);
	};

	const handleClose = () => {
		setChannelClusterFormOpen(false);
	};

	const fetchChannelClusterData = useCallback(() => {
		dispatch(fetchChannelClustersData(serverInfoData.serverId));
	}, [dispatch, serverInfoData.serverId]);

	useEffect(() => {
		try {
			!channelClusterFormOpen && fetchChannelClusterData();
		} catch (error) {
			console.log("Failed to fetch channel info data " + error);
			throw error;
		}
	}, [fetchChannelClusterData, channelClusterFormOpen]);


	return <List
		className={ classes["channel-list"] }
		component="nav"
		aria-labelledby="nested-list-subheader"
		dense
	>
		{ serverInfoData.serverName && (
			<ServerHeader
				primary={ serverInfoData.serverName }
				onClick={ handleClickOpen }
				open={ channelClusterFormOpen }
				onClose={ handleClose }
			/>
		) }
		<Divider className={ classes["channel-name-divider"] } variant="middle" flexItem/>
		{ channelClustersData.map(channelCluster =>
			<ChannelClusterItem
				key={ channelCluster.id }
				channelClusterId={ channelCluster.id }
				channelClusterName={ channelCluster.name }
				channels={ channelCluster.channelInfos }
				serverId={ serverInfoData.serverId }
			/>
		) }
	</List>;
};

export default ChannelClusters;