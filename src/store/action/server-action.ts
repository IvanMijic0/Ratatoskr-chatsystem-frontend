import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../configuration";

const fetchServerInfoDataAction =
	createAsyncThunk('server/fetchServerInfoData', async () => {
		try {
			const response = await axiosInstance.get('/server/summary');
			return response.data;
		} catch (error) {
			console.error('Error fetching server info data:', error);
		}
	});

export { fetchServerInfoDataAction };