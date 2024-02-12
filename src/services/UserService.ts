import axios from "axios";

import { axiosInstance } from "../configuration";
import { ChatMessage, UserInfo } from "../types";
import DirectMessageSummary from "../types/DirectMessageSummary.ts";

const fetchUsers = async (query: string): Promise<UserInfo[]> => {
	try {
		return (await axiosInstance.get(`/user/search?username=${query}`)).data;
	} catch (error) {
		console.error('Error fetching users:', error);
		throw error;
	}
};

const fetchAllUsers = async (): Promise<UserInfo[]> => {
	try {
		return (await axiosInstance.get('/user')).data;
	} catch (error) {
		console.error('Error fetching all users:', error);
		throw error;
	}
};

const updateUser = async (userId: string, userInfo: UserInfo): Promise<void> => {
	try {
		await axiosInstance.patch(`/user/${userId}`, userInfo);
	} catch (error) {
		console.error('Error updating user:', error);
		throw error;
	}
};

const removeUser = async (userId: string): Promise<void> => {
	try {
		await axiosInstance.delete(`/user/${userId}`);
	} catch (error) {
		console.error('Error removing user:', error);
		throw error;
	}
};

const fetchUserFriends = async (): Promise<UserInfo[]> => {
	try {
		return (await axiosInstance.get('/user/friends')).data;
	} catch (error) {
		console.error('Error fetching user friends:', error);
		throw error;
	}
};

const fetchUserInformationForIds = async (senderIds: (string | undefined)[]): Promise<UserInfo[]> => {
	try {
		return await Promise.all(
			senderIds?.map(async (senderId) => {
				return (await axiosInstance.get(`/user/${senderId}`)).data;
			})
		);
	} catch (error) {
		console.error('Error fetching user information:', error);
		throw error;
	}
};

const fetchUserFriend = async (friendId: string | undefined): Promise<UserInfo> => {
	try {
		return friendId && (await axiosInstance.get(`/user/${friendId}`)).data;
	} catch (error) {
		console.error('Error fetching user friend:', error);
		throw error;
	}
};

const confirmFriendRequest = async (friendId: string): Promise<void> => {
	try {
		await axiosInstance.post(`/user/add-friend/${friendId}`);
	} catch (error) {
		console.log('Could not confirm friend request:', error);
		throw error;
	}
};

const fetchUserSpecific = async () => {
	try {
		return (await axiosInstance.get(`/user/specific`)).data;
	} catch (error) {
		console.error('Error fetching user specific data:', error);
	}
};

const deleteFriend = async (friendId: string): Promise<void> => {
	try {
		await axiosInstance.delete(`/user/delete-friend/${friendId}`);
	} catch (error) {
		console.log('Could not delete friend:', error);
		throw error;
	}
};

const getDirectMessagings = async (): Promise<ChatMessage[]> => {
	try {
		return (await axiosInstance.get(`/user/directmessagings`)).data;
	} catch (error) {
		console.log('Could not get direct messagings:', error);
		throw error;
	}
};

const getDirectMessagingsById = async (
	directMessagingId: string | undefined,
	page: number = 1,
	pageSize: number = 30
): Promise<{ content: ChatMessage[]; totalPages: number }> => {
	try {
		const response = await axiosInstance.get(`/user/directmessagings/${directMessagingId}`, {
			params: {
				page,
				pageSize,
			},
		});

		const { content, totalPages } = response.data;

		return { content, totalPages };
	} catch (error) {
		console.log('Could not get direct messagings by id:', error);
		throw error;
	}
};


const getDirectMessagingsSummary = async (): Promise<DirectMessageSummary[]> => {
	try {
		return (await axiosInstance.get(`/user/directmessagings/summary`)).data;
	} catch (error) {
		console.log('Could not get direct messagings summary:', error);
		throw error;
	}
};

const createDirectMessagings = async (friendId: string, chatMessages: ChatMessage[]): Promise<void> => {
	try {
		await axiosInstance.post(`/user/directmessagings/${friendId}`, chatMessages);
	} catch (error) {
		console.log('Could not create direct messaging:', error);
		throw error;
	}
};

const updateDirectMessagings = async (directMessagingId: string, chatMessages: ChatMessage): Promise<void> => {
	try {
		await axiosInstance.put(`/user/directmessagings/update/${directMessagingId}`, chatMessages);
	} catch (error) {
		console.log('Could not update direct messaging:', error);
		throw error;
	}
};

const removeDirectMessagings = async (friendId: string, directMessagingId: string): Promise<void> => {
	try {
		await axiosInstance.delete(`/user/directmessagings/${directMessagingId}/${friendId}`);
	} catch (error) {
		console.log('Could not delete direct messaging:', error);
		throw error;
	}
};

const checkIfMetaMaskAddressExists = async (metaMaskAddress: string): Promise<boolean> => {
	try {
		return (await axios.get(`${import.meta.env.BASE_URL}/user/exists/${metaMaskAddress}`)).data;
	} catch (error) {
		console.error('Error checking if MetaMask address exists:', error);
		throw error;
	}
};

const setMetaMaskAddress = async (metaMaskAddress: string): Promise<void> => {
	try {
		await axiosInstance.post(`/user/set-meta-mask?metaMaskAddress=${metaMaskAddress}`);
	} catch (error) {
		console.error('Error setting MetaMask address:', error);
		throw error;
	}
};

export default {
	fetchAllUsers,
	updateUser,
	removeUser,
	fetchUserInformationForIds,
	confirmFriendRequest,
	fetchUserSpecific,
	getDirectMessagingsSummary,
	getDirectMessagingsById,
	updateDirectMessagings,
	fetchUserFriends,
	fetchUserFriend,
	deleteFriend,
	fetchUsers,
	getDirectMessagings,
	createDirectMessagings,
	removeDirectMessagings,
	checkIfMetaMaskAddressExists,
	setMetaMaskAddress
};