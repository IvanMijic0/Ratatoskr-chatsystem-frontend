import IChannelClustersState from "./IChannelClusterState.ts";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchChannelClustersData } from "../../action/channelClusters-action.ts";
import { RootState } from "../../index.ts";

const initialState: IChannelClustersState = {
	data: [],
	currentChannelClusterId: "",
	currentChannelClusterName: "",
	status: 'idle',
	error: null,
};

const channelClustersSlice = createSlice({
	name: 'channelClusters',
	initialState,
	reducers: {
		setCurrentChannelCluster: ( state, action ) => {
			state.currentChannelClusterId = action.payload.clusterId;
			state.currentChannelClusterName = action.payload.clusterName;
		},
	},
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

export const {
	setCurrentChannelCluster
} = channelClustersSlice.actions;

export const selectChannelClustersData = ( state: RootState ) => state.channelClusters.data;
export const selectChannelClustersStatus = ( state: RootState ) => state.channelClusters.status;
export const selectChannelClustersError = ( state: RootState ) => state.channelClusters.error;
export const selectCurrentClusterName = ( state: RootState ) => state.channelClusters.currentChannelClusterName;
export const selectCurrentChannelClusterId = ( state: RootState ) => state.channelClusters.currentChannelClusterId;
export const selectCurrentServerInfo = createSelector(
	[selectCurrentChannelClusterId, selectCurrentClusterName],
	( currentClusterId, currentClusterName ) => ( { clusterId: currentClusterId, clusterName: currentClusterName } )
);

export default channelClustersSlice.reducer;