import { useQuery } from "react-query";
import { UserService } from "../services";

const useDirectMessagings = () => {
	return useQuery(
		['directMessagings'],
		() => UserService.getDirectMessagings(), {
			refetchOnMount: true,
			refetchOnReconnect: true,
		}
	);
};

export default useDirectMessagings;