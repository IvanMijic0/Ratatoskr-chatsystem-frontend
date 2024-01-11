import { axiosInstance } from "../configuration";
import { Notification, NotificationServiceProps } from "../types";

const getUserNotification = async () => {
	try {
		return ( await axiosInstance.get('/notifications') ).data;
	} catch (error) {
		console.error('Error fetching notification data:', error);
	}
};

const getNotificationByUserIds = async ( userIds: string[] ) => {
	try {
		return ( await axiosInstance.post(`/notifications/usersStatus`, userIds) ).data;
	} catch (error) {
		console.error('Error fetching notification data:', error);
	}
};

const sendFriendRequestNotification = async ( { userId, notification }: NotificationServiceProps ): Promise<void> => {
	try {
		await axiosInstance.post(`/notifications/${ userId }`, notification);
	} catch (error) {
		console.error('Error sending friend request notification:', error);
		throw error;
	}
};

const saveUserNotification = async ( body: Notification ): Promise<void> => {
	try {
		await axiosInstance.post(`/notifications`, body);
	} catch (error) {
		console.error('Error posting user notification:', error);
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

const clearNotification = async (): Promise<void> => {
	try {
		await axiosInstance.delete(`/notifications`);
	} catch (error) {
		console.log("Could not clear friend request: ", error);
		throw error;
	}
};

export default {
	getUserNotification,
	sendFriendRequestNotification,
	postUserNotification,
	getNotificationByUserIds,
	saveUserNotification,
	clearNotification
};