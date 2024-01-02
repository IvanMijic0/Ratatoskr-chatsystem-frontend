import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../configuration";

const fetchChannelClustersData = createAsyncThunk(
	'channelClusters/fetchChannelClustersData',
	async ( serverId: string | undefined ) => {
		try {
			const response = await axiosInstance.get(`/server/channelClusters/${ serverId }`);
			return response.data;
		} catch (error) {
			console.error("Error fetching channel clusters:", error);
			throw error;
		}
	}
);

export { fetchChannelClustersData };