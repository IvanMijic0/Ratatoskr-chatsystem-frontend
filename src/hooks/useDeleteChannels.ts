import { useMutation, useQueryClient } from "react-query";

import { ServerService } from "../services";
import { ChannelServiceProps } from "../types";

const useDeleteChannels = () => {
	const queryClient = useQueryClient();
	return useMutation(
		( {
			  serverId,
			  channelClusterId,
			  removableChannelIds
		  }: ChannelServiceProps ) =>
			ServerService.deleteChannels({ serverId, channelClusterId, removableChannelIds }),
		{
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('channelClusters');
				} catch (error) {
					console.error('Error deleting channels:', error);
					throw error;
				}
			}
		}
	);
};

export default useDeleteChannels;