import { useMutation, useQueryClient } from "react-query";

import { ServerService } from "../services";
import { ChannelClusterServiceProps } from "../types";

const useCreateChannelCluster = () => {
	const queryClient = useQueryClient();
	return useMutation(
		( { serverId, channelClusterName }: ChannelClusterServiceProps ) =>
			ServerService.createChannelCluster({ serverId, channelClusterName }), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('channelClusters');
				} catch (error) {
					console.error('Error creating channel cluster:', error);
					throw error;
				}
			}
		}
	);
};

export default useCreateChannelCluster;