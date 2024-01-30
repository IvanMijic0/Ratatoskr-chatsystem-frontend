import { useMutation, useQueryClient } from "react-query";
import { UserService } from "../services";

const useDeleteDirectMessagings = () => {
	const queryClient = useQueryClient();

	return useMutation(
		( friendId: string ) => UserService.removeDirectMessagings(friendId), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('directMessagings');
				} catch (error) {
					console.error('Error deleting direct messaging:', error);
					throw error;
				}
			}
		}
	);
}

export default useDeleteDirectMessagings;