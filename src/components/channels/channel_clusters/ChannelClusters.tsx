import { Divider, List, } from "@mui/material";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "../../../configuration/axios-instance.ts";
import IChannelClusterInfoData from "../IChannelClusterInfoData.ts";
import ChannelClusterItem from "../channel_cluster_item/ChannelClusterItem.tsx";
import ChannelClusterTitle from "../ChannelClusterTitle.tsx";
import classes from "./ChannelsClusters.module.css";

const ChannelClusters = ( props: { serverId: string; serverName: string; } ) => {
	const [channelClusterInfoData, setChannelClusterInfoData] = useState<IChannelClusterInfoData[]>([]);
	const [open, setOpen] = useState(false);

	const params = useMemo(() => {
		const paramsObj = new URLSearchParams();
		paramsObj.append('serverId', props.serverId);
		return paramsObj;
	}, [props.serverId]);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
		event.preventDefault();

	};

	const fetchChannelData = useCallback(async () => {
		const response = ( await axiosInstance("/server/channelClusters", { params }) ).data;
		setChannelClusterInfoData(response);
	}, [params]);


	useEffect(() => {
		try {
			fetchChannelData();
		} catch (error) {
			console.log("Failed to fetch channel info data " + error);
			throw error;
		}
	}, [fetchChannelData]);

	return <List
		className={ classes["channel-list"] }
		component="nav"
		aria-labelledby="nested-list-subheader"
		dense
	> { props.serverName &&
      <ChannelClusterTitle
        primary={ props.serverName }
        onClick={ handleClickOpen } open={ open }
        onClose={ handleClose }
        handleSubmit={ handleSubmit }/>
	}
		<Divider className={ classes["channel-name-divider"] } variant="middle" flexItem/>
		{ channelClusterInfoData.map(channelCluster =>
			<ChannelClusterItem
				key={ channelCluster._id }
				channelClusterName={ channelCluster.name }
				channels={ channelCluster.channels }
			/>)
		}
	</List>;
};

export default ChannelClusters;