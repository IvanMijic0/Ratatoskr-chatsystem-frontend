import { Divider, List } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { ChannelClusterItem } from "../ChannelClusterItem";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchChannelClustersData, selectChannelClustersData, selectCurrentServerInfo } from "../../../../Store";
import { ServerHeader } from "../ServerHeader";
import classes from "./ChannelsClusters.module.css";

const ChannelClusters = () => {
	const [channelClusterFormOpen, setChannelClusterFormOpen] = useState(false);

	const dispatch = useAppDispatch();
	const channelClustersData = useAppSelector(selectChannelClustersData);
	const currentServerInfoData = useAppSelector(selectCurrentServerInfo);

	const handleClickOpen = () => {
		setChannelClusterFormOpen(true);
	};

	const handleClose = () => {
		setChannelClusterFormOpen(false);
	};

	const fetchChannelClusterData = useCallback(() => {
		dispatch(fetchChannelClustersData(currentServerInfoData.serverId));
	}, [dispatch, currentServerInfoData.serverId]);

	useEffect(() => {
		try {
			currentServerInfoData.serverId && fetchChannelClusterData();
		} catch (error) {
			console.log("Failed to fetch channel info data " + error);
			throw error;
		}
	}, [fetchChannelClusterData, currentServerInfoData]);


	return <List
		className={ classes["channel-list"] }
		component="nav"
		aria-labelledby="nested-list-subheader"
		dense
	>
		{ currentServerInfoData.serverName && (
			<ServerHeader
				primary={ currentServerInfoData.serverName }
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
				serverId={ currentServerInfoData.serverId }
			/>
		) }
	</List>;
};

export default ChannelClusters;