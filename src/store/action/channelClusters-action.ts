import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../configuration/axios-instance.ts";

const fetchChannelClustersData = createAsyncThunk(
	'channelClusters/fetchChannelClustersData',
	async ( serverId: string | null ) => {
		try {
			const response = await axiosInstance.get(`/server/channelClusters?serverId=${ serverId }`);
			return response.data;
		} catch (error) {
			console.error("Error fetching channel clusters:", error);
			throw error;
		}
	}
);

export { fetchChannelClustersData };