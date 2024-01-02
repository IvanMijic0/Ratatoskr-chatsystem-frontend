import { useQuery } from "react-query";
import { ServerService } from "../services";

const useChannelClusters = ( serverId: string ) => {
	return useQuery(
		['channelClusters', serverId],
		() => ServerService.fetchChannelClusters(serverId),
	);
};

export default useChannelClusters;