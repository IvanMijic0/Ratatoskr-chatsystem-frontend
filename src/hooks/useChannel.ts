import { useQuery } from "react-query";
import { ServerService } from "../services";

const useChannel = ( { serverId, clusterId, channelId }: {
	serverId: string,
	clusterId: string,
	channelId: string
} ) => {
	return useQuery(
		['channel', channelId],
		() => ServerService.getChannel(serverId, clusterId, channelId)
	);
};

export default useChannel;