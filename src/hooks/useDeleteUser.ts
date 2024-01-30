import { UserService } from "../services";
import { useMutation, useQueryClient } from "react-query";

const useDeleteUser = () => {
	const queryClient = useQueryClient();
	return useMutation(
		( userId: string ) => UserService.removeUser(userId), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('users');
				} catch (error) {
					console.error('Error deleting user:', error);
					throw error;
				}
			}
		}
	);
};

export default useDeleteUser;