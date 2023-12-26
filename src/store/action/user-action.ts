import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../../configuration";

const fetchUserSpecific = createAsyncThunk(
	'user/fetchUserSpecific',
	async () => {
		try {
			const response = await axiosInstance.get(`/user/specific`);
			return response.data;
		} catch (error) {
			console.error('Error fetching user specific data:', error);
		}
	}
);

export { fetchUserSpecific };