import { Divider, List } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ChannelClusterItem from "../channel_cluster_item/ChannelClusterItem.tsx";
import ChannelClusterTitle from "../ChannelClusterTitle.tsx";
import classes from "./ChannelsClusters.module.css";
import { fetchChannelClustersData } from "../../../store/action/channelClusters-action.ts";
import { selectChannelClustersData } from "../../../store/slice/channelClusters_slice/channelClusters-slice.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks.ts";
import { selectCurrentServerInfo } from "../../../store/slice/server_slice/server-slice.ts";

const ChannelClusters = () => {
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();
	const channelClustersData = useAppSelector(selectChannelClustersData);
	const serverInfoData = useAppSelector(selectCurrentServerInfo);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
		event.preventDefault();
		// Add your submit logic here if needed
	};

	const fetchChannelData = useCallback(() => {
		dispatch(fetchChannelClustersData(serverInfoData.serverId));
	}, [dispatch, serverInfoData.serverId]);

	useEffect(() => {
		try {
			fetchChannelData();

		} catch (error) {
			console.log("Failed to fetch channel info data " + error);
			throw error;
		}
	}, [fetchChannelData]);

	return (
		<List
			className={ classes["channel-list"] }
			component="nav"
			aria-labelledby="nested-list-subheader"
			dense
		>
			{ serverInfoData.serverName && (
				<ChannelClusterTitle
					primary={ serverInfoData.serverName }
					onClick={ handleClickOpen }
					open={ open }
					onClose={ handleClose }
					handleSubmit={ handleSubmit }
				/>
			) }
			<Divider className={ classes["channel-name-divider"] } variant="middle" flexItem/>
			{ channelClustersData.map(( channelCluster ) => (
				<ChannelClusterItem
					key={ channelCluster._id }
					channelClusterName={ channelCluster.name }
					channels={ channelCluster.channels }
				/>
			)) }
		</List>
	);
};

export default ChannelClusters;
