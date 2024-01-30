import { useQuery } from "react-query";
import { ServerService } from "../services";

const useClusterChannelById = ( { serverId, clusterId, channelId }: {
	serverId: string,
	clusterId: string,
	channelId: string
} ) => {
	return useQuery(
		['server', serverId, 'channelCluster', clusterId, 'channel', channelId],
		() => ServerService.getClusterChannelById(serverId, clusterId, channelId)
	);
};

export default useClusterChannelById;