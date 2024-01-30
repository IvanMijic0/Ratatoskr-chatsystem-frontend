import { useMutation, useQueryClient } from "react-query";
import { UserService } from "../services";
import { UserInfo } from "../types";

const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation(
		( { userId, userInfo }: { userId: string, userInfo: UserInfo } ) => UserService.updateUser(userId, userInfo), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('users');
				} catch (error) {
					console.error('Error updating user:', error);
					throw error;
				}
			},
			onSettled: () => {
			}
		});
};

export default useUpdateUser;