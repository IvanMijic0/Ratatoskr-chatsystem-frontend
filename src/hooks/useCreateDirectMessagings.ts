import { useMutation, useQueryClient } from "react-query";
import { UserService } from "../services";

const useCreateDirectMessagings = () => {
	const queryClient = useQueryClient();

	return useMutation(
		( friendId: string ) => UserService.createDirectMessagings(friendId), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('directMessagings');
				} catch (error) {
					console.error('Error creating direct messaging:', error);
					throw error;
				}
			}
		}
	);
};

export default useCreateDirectMessagings;