import { useMutation, useQueryClient } from "react-query";
import { ChatMessage } from "../types";
import { UserService } from "../services";

const useUpdateDirectMessagings = ( directMessagingId: string ) => {
	const queryClient = useQueryClient();

	return useMutation(
		( { directMessagingId, chatMessages }: {
			directMessagingId: string,
			chatMessages: ChatMessage
		} ) => UserService.updateDirectMessagings(directMessagingId, chatMessages), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries(['directMessagingsById', directMessagingId]);
				} catch (error) {
					console.error('Error updating direct messaging:', error);
					throw error;
				}
			}
		}
	);
};

export default useUpdateDirectMessagings;