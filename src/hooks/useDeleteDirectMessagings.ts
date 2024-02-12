import { useMutation, useQueryClient } from "react-query";
import { UserService } from "../services";

const useDeleteDirectMessagings = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ friendId, directMessagingId }: { friendId: string, directMessagingId: string }) => UserService.removeDirectMessagings(friendId, directMessagingId), {
		onSuccess: async () => {
			try {
				await queryClient.invalidateQueries(['directMessagingsSummary']);
			} catch (error) {
				console.error('Error deleting direct messaging:', error);
				throw error;
			}
		}
	}
	);
}

export default useDeleteDirectMessagings;