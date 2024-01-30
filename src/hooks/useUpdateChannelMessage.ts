import { useMutation, useQueryClient } from "react-query";
import { ServerService } from "../services";
import { ChatMessage } from "../types";

const useUpdateChannelMessage = ( { serverId, clusterId, channelId }: {
	serverId: string,
	clusterId: string,
	channelId: string,
} ) => {
	const queryClient = useQueryClient();

	return useMutation(
		( { serverId, clusterId, channelId, chatMessage }: {
			serverId: string,
			clusterId: string,
			channelId: string,
			chatMessage: ChatMessage
		} ) => ServerService.updateChannelMessage(serverId, clusterId, channelId, chatMessage), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries(['server', serverId, 'channelCluster', clusterId, 'channel', channelId]);
				} catch (error) {
					console.error('Error updating channel message:', error);
					throw error;
				}
			}
		}
	);
};

export default useUpdateChannelMessage;