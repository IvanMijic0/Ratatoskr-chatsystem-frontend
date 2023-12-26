import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../configuration";

const fetchNotificationData =
	createAsyncThunk('notification/fetchNotificationData', async () => {
		try {
			const response = await axiosInstance.get('/notifications');
			return response.data;
		} catch (error) {
			console.error('Error fetching notification data:', error);
		}
	});

export { fetchNotificationData };