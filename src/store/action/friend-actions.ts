import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../configuration/axios-instance.ts";
import IFriendState from "../slice/friend_slice/IFriendState.ts";
import { setCurrentFriendInfo } from "../slice/friend_slice/friend-slice.ts";

export const fetchFriendInfoDataAction =
	createAsyncThunk('server/fetchServerInfoData', async () => {
		const response = await axiosInstance.get('/server/summary');
		return response.data;
	});

export const setFriendInfo = ( serverInfo: IFriendState ) => ( dispatch: any ) => {
	dispatch(setCurrentFriendInfo(serverInfo));
};