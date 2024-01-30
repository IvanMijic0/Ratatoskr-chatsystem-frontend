import { useQuery } from "react-query";

import { ServerService } from "../services";

const useServers = () => {
	return useQuery(
		"servers",
		() => ServerService.fetchServersSummary(), {
			refetchOnMount: true
		}
	);
};

export default useServers;