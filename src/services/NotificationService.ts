import { axiosInstance } from "../configuration";
import { NotificationServiceProps } from "../types";

const getFriendNotification = async () => {
	try {
		return ( await axiosInstance.get('/notifications') ).data;
	} catch (error) {
		console.error('Error fetching notification data:', error);
	}
};

const sendFriendRequestNotification = async ( { friendId, notification }: NotificationServiceProps ): Promise<void> => {
	try {
		await axiosInstance.post(`/notifications/${ friendId }`, notification);
	} catch (error) {
		console.error('Error sending friend request notification:', error);
		throw error;
	}
};

const postUserNotification = async ( receiverId: string, body: Notification ): Promise<void> => {
	try {
		await axiosInstance.post(`/notifications/${ receiverId }`, body);
	} catch (error) {
		console.error('Error posting user notification:', error);
		throw error;
	}
};

export default { getFriendNotification, sendFriendRequestNotification, postUserNotification };