import axiosInstance from "../../configuration/axios-instance.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentServerInfo } from "../slice/server_slice/server-slice.ts";
import IServerInfoState from "../slice/server_slice/IServerInfoState.ts";

export const fetchServerInfoDataAction = createAsyncThunk('server/fetchServerInfoData', async () => {
	const response = await axiosInstance.get('/server/summary');
	return response.data;
});

export const setServerInfo = ( serverInfo: IServerInfoState ) => ( dispatch: any ) => {
	dispatch(setCurrentServerInfo(serverInfo));
};