import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../configuration";

const fetchChannelData = createAsyncThunk(
	'channel/fetchChannelData',
	async ( channelIds: { serverId: string; channelClusterId: string; channelId: string } ) => {
		try {
			const response = await axiosInstance.get("/server/channel", {
				params: {
					serverId: channelIds.serverId,
					channelClusterId: channelIds.channelClusterId,
					channelId: channelIds.channelId,
				},
			});

			return response.data;
		} catch (error) {
			throw Error("Failed to fetch channel data");
		}
	}
);

export { fetchChannelData };