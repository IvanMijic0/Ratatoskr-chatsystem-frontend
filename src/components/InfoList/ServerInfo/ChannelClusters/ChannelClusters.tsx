import { Divider, List, ListItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useChannelClusters } from "../../../../hooks";
import { fetchChannelClustersData } from "../../../../store";
import { ChannelClusterItem } from "../ChannelClusterItem";
import { CustomCircularProgressBar } from "../../../UI";
import useServer from "../../../../hooks/useServer.ts";
import { ChannelCluster } from "../../../../types";
import { ServerHeader } from "../ServerHeader";
import classes from "./ChannelsClusters.module.css";

const ChannelClusters = () => {
	const { serverId } = useParams();
	const [channelClusterFormOpen, setChannelClusterFormOpen] = useState(false);
	const { data: serverData, isLoading: isServerDataLoading } = useServer(serverId ?? '');
	const {
		data: channelClustersData,
		isLoading: isChannelClusterDataLoading
	} = useChannelClusters(serverId ?? '');

	const dispatch = useAppDispatch();

	const handleClickOpen = () => {
		setChannelClusterFormOpen(true);
	};

	const handleServerHeaderClose = async () => {
		setChannelClusterFormOpen(false);
	};

	const fetchChannelClusterData = useCallback(() => {
		dispatch(fetchChannelClustersData(serverId));
	}, [dispatch, serverId]);

	useEffect(() => {
		try {
			serverId && fetchChannelClusterData();
		} catch (error) {
			console.log("Failed to fetch channel info data " + error);
			throw error;
		}
	}, [fetchChannelClusterData, serverId]);


	return <List
		className={ classes["channel-list"] }
		component="nav"
		aria-labelledby="nested-list-subheader"
		dense>
		{ isServerDataLoading ?
			<ListItem className={ classes['server-loading-bar'] }>
				<CustomCircularProgressBar/>
			</ListItem>
			: <ServerHeader
				primary={ serverData?.name ?? '' }
				onClick={ handleClickOpen }
				open={ channelClusterFormOpen }
				onClose={ handleServerHeaderClose }
			/>
		}

		<Divider className={ classes["channel-name-divider"] } variant="middle" flexItem/>

		{ isChannelClusterDataLoading
			? <ListItem className={ classes['channel-cluster-loading-bar'] }>
				<CustomCircularProgressBar/>
			</ListItem>
			: channelClustersData?.map(( channelCluster: ChannelCluster ) =>
				<ChannelClusterItem
					key={ channelCluster.id }
					id={ channelCluster.id }
					name={ channelCluster.name }
					channels={ channelCluster.channels }
				/>
			) }
	</List>;
};

export default ChannelClusters;