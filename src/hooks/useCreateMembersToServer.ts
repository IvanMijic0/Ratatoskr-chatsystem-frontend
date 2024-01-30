import { useMutation, useQueryClient } from "react-query";
import { ServerService } from "../services";

const useCreateMembersToServer = ( { serverId }: { serverId: string } ) => {
	const queryClient = useQueryClient();

	return useMutation(
		( { serverId, userId }: {
			serverId: string,
			userId: string
		} ) => ServerService.addMemberToServer(serverId, userId), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries(['serverMembers', serverId]);
				} catch (error) {
					console.error('Error creating members to server:', error);
					throw error;
				}
			}
		}
	);
};

export default useCreateMembersToServer;