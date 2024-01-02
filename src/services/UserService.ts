import { axiosInstance } from "../configuration";
import { UserServiceProps } from "../types";

const fetchUsers = async ( query: string ): Promise<any[]> => {
	try {
		const response = await axiosInstance.get(`/user/search?username=${ query }`);
		return response.data;
	} catch (error) {
		console.error('Error fetching users:', error);
		throw error;
	}
};

const fetchUserFriends = async ( { setAllUsers, setFilteredUsers }: UserServiceProps ): Promise<void> => {
	try {
		const { data } = await axiosInstance.get('/user/friends');
		setAllUsers(data);
		setFilteredUsers(data);
	} catch (error) {
		console.error('Error fetching user friends:', error);
		throw error;
	}
};

const fetchUserInformationForIds = async ( senderIds: string[] ): Promise<any[]> => {
	try {
		return await Promise.all(
			senderIds.map(async ( senderId ) => {
				const response = await axiosInstance.get(`/user/${ senderId }`);
				return response.data;
			})
		);
	} catch (error) {
		console.error('Error fetching user information:', error);
		throw error;
	}
};

const confirmFriendRequest = async ( friendId: string ): Promise<void> => {
	try {
		await axiosInstance.post(`/user/add-friend/${ friendId }`);
	} catch (error) {
		console.log('Could not confirm friend request:', error);
		throw error;
	}
};

const clearFriendRequests = async (): Promise<void> => {
	try {
		await axiosInstance.delete(`/notifications`);
	} catch (error) {
		console.log('Could not clear friend requests:', error);
		throw error;
	}
};

export default { fetchUsers, fetchUserFriends, fetchUserInformationForIds, confirmFriendRequest, clearFriendRequests };