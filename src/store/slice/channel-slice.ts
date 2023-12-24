import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";
import { ChannelState } from "../../types";
import { fetchChannelData } from "../action/channel-action.ts";

const initialState: ChannelState = {
	data: [],
	currentChannelId: "",
	currentChannelName: "",
	status: 'idle',
	error: null,
};

const channelSlice = createSlice({
	name: 'channel',
	initialState,
	reducers: {
		setCurrentChannel: ( state, action ) => {
			state.currentChannelId = action.payload.channelId;
			state.currentChannelName = action.payload.channelName;
		},
	},
	extraReducers: ( builder ) => {
		builder
			.addCase(fetchChannelData.pending, ( state ) => {
				state.status = 'loading';
			})
			.addCase(fetchChannelData.fulfilled, ( state, action ) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(fetchChannelData.rejected, ( state, action ) => {
				state.status = 'failed';
				state.error = action.error.message || 'An Error occurred.';
			});
	},
});

export const { setCurrentChannel } = channelSlice.actions;

export const selectChannelData = ( state: RootState ) => state.channel.data;
export const selectChannelStatus = ( state: RootState ) => state.channel.status;
export const selectChannelError = ( state: RootState ) => state.channel.error;
export const selectCurrentChannelName = ( state: RootState ) => state.channel.currentChannelName;
export const selectCurrentChannelId = ( state: RootState ) => state.channel.currentChannelId;

export default channelSlice.reducer;