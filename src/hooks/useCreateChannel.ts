import { useMutation, useQueryClient } from "react-query";

import { ServerService } from "../services";
import { ChannelServiceProps } from "../types";

const useCreateChannel = () => {
	const queryClient = useQueryClient();
	return useMutation(
		( { serverId, channelClusterId, channelName }: ChannelServiceProps ) =>
			ServerService.createChannel({ serverId, channelClusterId, channelName }),
		{
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('channelClusters');
				} catch (error) {
					console.error('Error creating channel:', error);
					throw error;
				}
			}
		}
	);
};

export default useCreateChannel;