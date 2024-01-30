import { useMutation, useQueryClient } from "react-query";

import { ServerService } from "../services";

const useCreateServer = () => {
	const queryClient = useQueryClient();
	return useMutation(
		( data: FormData ) => ServerService.createServer(data), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('servers');
				} catch (error) {
					console.error('Error creating server:', error);
					throw error;
				}
			},
			onSettled: () => {
			}
		});
};

export default useCreateServer;