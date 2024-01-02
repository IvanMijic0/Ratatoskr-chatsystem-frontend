import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState, Server, ServerState } from "../../types";

const initialState: ServerState = {
	serverInfoData: [],
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
	}
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