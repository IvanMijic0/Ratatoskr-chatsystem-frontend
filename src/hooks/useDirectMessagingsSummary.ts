import { useQuery } from "react-query";
import { UserService } from "../services";

const useDirectMessagingsSummary = () => {
	return useQuery(
		'directMessagingsSummary',
		() => UserService.getDirectMessagingsSummary()
	);
};

export default useDirectMessagingsSummary;