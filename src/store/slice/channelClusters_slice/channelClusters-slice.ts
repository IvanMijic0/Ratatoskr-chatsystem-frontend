import IChannelClustersState from "./IChannelClusterState.ts";
import { createSlice } from "@reduxjs/toolkit";
import { fetchChannelClustersData } from "../../action/channelClusters-action.ts";
import { RootState } from "../../index.ts";

const initialState: IChannelClustersState = {
	data: [],
	status: 'idle',
	error: null,
};

const channelClustersSlice = createSlice({
	name: 'channelClusters',
	initialState,
	reducers: {},
	extraReducers: ( builder ) => {
		builder
			.addCase(fetchChannelClustersData.pending, ( state ) => {
				state.status = 'loading';
			})
			.addCase(fetchChannelClustersData.fulfilled, ( state, action ) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(fetchChannelClustersData.rejected, ( state, action ) => {
				state.status = 'failed';
				state.error = action.error.message || 'An error occurred.';
			});
	},
});

export const selectChannelClustersData = ( state: RootState ) => state.channelClusters.data;
export const selectChannelClustersStatus = ( state: RootState ) => state.channelClusters.status;
export const selectChannelClustersError = ( state: RootState ) => state.channelClusters.error;

export default channelClustersSlice.reducer;