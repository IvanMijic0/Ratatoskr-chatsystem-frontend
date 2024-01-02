import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../../configuration";
import NotificationAction from "./notification-action.ts";

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

const addFriend =
	createAsyncThunk('user/addFriend', async ( friendId: string ) => {
		try {
			await axiosInstance.post(`/user/add-friend/${ friendId }`);

			NotificationAction.clearNotificationData();
		} catch (error) {
			console.log("Could not confirm friend request: ", error);
			throw error;
		}
	});

export default { fetchUserSpecific, addFriend };