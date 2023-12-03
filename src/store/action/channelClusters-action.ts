import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../configuration/axios-instance.ts";

export const fetchChannelClustersData = createAsyncThunk(
	'channelClusters/fetchChannelClustersData',
	async ( serverId: string | null ) => {
		const response = await axiosInstance.get(`/server/channelClusters?serverId=${ serverId }`);
		return response.data;
	}
);