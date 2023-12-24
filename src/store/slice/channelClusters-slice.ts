import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";
import { ChannelClustersState } from "../../types";
import { fetchChannelClustersData } from "../action/channelClusters-action.ts";

const initialState: ChannelClustersState = {
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
		resetChannelClustersState: () => {
			return initialState;
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
				state.error = action.error.message || 'An Error occurred.';
			});
	},
});

export const {
	setCurrentChannelCluster, resetChannelClustersState
} = channelClustersSlice.actions;

export const selectChannelClustersData = ( state: RootState ) => state.channelClusters.data;
export const selectChannelClustersStatus = ( state: RootState ) => state.channelClusters.status;
export const selectChannelClustersError = ( state: RootState ) => state.channelClusters.error;
export const selectCurrentClusterName = ( state: RootState ) => state.channelClusters.currentChannelClusterName;
export const selectCurrentChannelClusterId = ( state: RootState ) => state.channelClusters.currentChannelClusterId;

export default channelClustersSlice.reducer;