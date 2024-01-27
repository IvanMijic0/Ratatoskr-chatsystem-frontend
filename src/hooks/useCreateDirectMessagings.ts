import { useMutation, useQueryClient } from "react-query";
import { UserService } from "../services";
import { ChatMessage } from "../types";

const useCreateDirectMessagings = () => {
	const queryClient = useQueryClient();

	return useMutation(
		( { friendId, directMessage }: {
			friendId: string,
			directMessage: ChatMessage[]
		} ) => UserService.createDirectMessagings(friendId, directMessage), {
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