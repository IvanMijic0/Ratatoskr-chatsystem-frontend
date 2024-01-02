import { useQuery } from "react-query";

import { ServerService } from "../services";

const useServers = () => {
	return useQuery(
		"servers",
		() => ServerService.fetchServersSummary(),
		{}
	);
};

export default useServers;