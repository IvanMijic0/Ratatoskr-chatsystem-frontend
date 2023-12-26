import { createAsyncThunk } from "@reduxjs/toolkit";
import FriendState from "../../types/FriendState.ts";
import { setCurrentFriendInfo } from "../index.ts";
import { axiosInstance } from "../../configuration";

export const fetchFriendInfoDataAction =
	createAsyncThunk('friend/fetchFriendInfoData', async () => {
		const response = await axiosInstance.get('/user/friends');
		return response.data;
	});

export const setFriendInfo = ( serverInfo: FriendState ) => ( dispatch: any ) => {
	dispatch(setCurrentFriendInfo(serverInfo));
};