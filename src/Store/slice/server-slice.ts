import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../store.ts";
import { Server, ServerState } from "../../Types";
import { fetchServerInfoDataAction } from "../action/server-action.ts";

const initialState: ServerState = {
	serverInfoData: [],
	status: 'idle',
	error: null,
	currentServerName: "Homepage",
	currentServerId: "0000-0000",
};

const serverSlice = createSlice({
	name: 'server',
	initialState,
	reducers: {
		setCurrentServerInfo: ( state, action ) => {
			state.currentServerName = action.payload.serverName;
			state.currentServerId = action.payload.serverId;
		},
		resetCurrentServerInfoData: ( state ) => {
			state.currentServerName = "";
			state.currentServerId = "";
		},
	},
	extraReducers: ( builder ) => {
		builder
			.addCase(fetchServerInfoDataAction.pending, ( state ) => {
				state.status = 'loading';
			})
			.addCase(fetchServerInfoDataAction.fulfilled, ( state, action ) => {
				state.status = 'succeeded';
				state.serverInfoData = action.payload;
			})
			.addCase(fetchServerInfoDataAction.rejected, ( state, action ) => {
				state.status = 'failed';
				state.error = action.error.message || 'An Error occurred.';
			});
	},
});

export const { setCurrentServerInfo, resetCurrentServerInfoData } = serverSlice.actions;

export const selectServerInfoData = ( state: RootState ) => state.server.serverInfoData;
export const selectServerStatus = ( state: RootState ) => state.server.status;
export const selectServerError = ( state: RootState ) => state.server.error;
export const selectCurrentServerName = ( state: RootState ) => state.server.currentServerName;
export const selectCurrentServerId = ( state: RootState ) => state.server.currentServerId;

// Used createSelector for memoization
export const selectCurrentServerInfo = createSelector(
	[selectCurrentServerName, selectCurrentServerId],
	( currentServerName, currentServerId ) => ( { serverName: currentServerName, serverId: currentServerId } )
);
export const selectServerInfoByServerId = ( serverId: string | undefined ) =>
	createSelector([selectServerInfoData], ( serverInfoData ) =>
		serverId
			? serverInfoData.filter(( serverInfo: Server ) => serverInfo.id === serverId)
			: []
	);

export default serverSlice.reducer;