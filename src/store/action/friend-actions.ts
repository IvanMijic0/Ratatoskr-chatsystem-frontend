import { createAsyncThunk } from "@reduxjs/toolkit";
import IFriendState from "../slice/friend_slice/IFriendState.ts";
import { setCurrentFriendInfo } from "../slice/friend_slice/friend-slice.ts";
import axiosInstance from "../../configuration/axios-instance.ts";

export const fetchFriendInfoDataAction =
	createAsyncThunk('friend/fetchFriendInfoData', async () => {
		const response = await axiosInstance.get('/user/friends');
		return response.data;
	});

export const setFriendInfo = ( serverInfo: IFriendState ) => ( dispatch: any ) => {
	dispatch(setCurrentFriendInfo(serverInfo));
};