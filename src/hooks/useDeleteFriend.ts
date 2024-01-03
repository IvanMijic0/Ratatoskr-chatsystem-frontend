import { QueryClient, useMutation } from "react-query";
import { UserService } from "../services";

const useDeleteFriend = () => {
	const queryClient = new QueryClient();
	return useMutation(
		( friendId: string ) => UserService.deleteFriend(friendId), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('friends');
				} catch (error) {
					console.error('Error deleting friend:', error);
					throw error;
				}
			},
		});
};

export default useDeleteFriend;