import { useMutation, useQueryClient } from "react-query";
import { ServerService } from "../services";

const useDeleteServer = () => {
	const queryClient = useQueryClient();
	return useMutation(
		( serverId: string ) => ServerService.deleteServer(serverId), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('servers');
				} catch (error) {
					console.error('Error deleting server:', error);
					throw error;
				}
			}
		}
	);
};

export default useDeleteServer;