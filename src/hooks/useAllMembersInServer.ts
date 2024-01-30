import { useQuery } from "react-query";
import { ServerService } from "../services";

const useAllMembersInServer = ( serverId: string ) => {
	return useQuery(
		['serverMembers', serverId],
		() => ServerService.getAllMembersInServer(serverId)
	);
};

export default useAllMembersInServer;