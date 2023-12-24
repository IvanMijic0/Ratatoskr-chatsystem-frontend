import axiosInstance from "../../Configuration/axios-instance.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchServerInfoDataAction =
	createAsyncThunk('server/fetchServerInfoData', async () => {
		const response = await axiosInstance.get('/server/summary');
		return response.data;
	});