import { useMutation, useQueryClient } from "react-query";
import { ChannelClusterServiceProps } from "../types";
import { ServerService } from "../services";

const useDeleteChannelCluster = () => {
	const queryClient = useQueryClient();
	return useMutation(
		( { serverId, channelClusterId }: ChannelClusterServiceProps ) => ServerService.deleteChannelCluster({
			serverId,
			channelClusterId
		}), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('channelClusters');
				} catch (error) {
					console.error('Error deleting channel cluster:', error);
					throw error;
				}
			}
		}
	);
};

export default useDeleteChannelCluster;