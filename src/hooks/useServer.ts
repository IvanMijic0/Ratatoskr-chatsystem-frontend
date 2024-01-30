import { useQuery } from "react-query";

import { ServerService } from "../services";

const useServer = ( serverId: string ) => {
	return useQuery(
		["server", serverId],
		() => ServerService.fetchServerSummary(serverId),
	);
};

export default useServer;