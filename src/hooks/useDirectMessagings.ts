import { useQuery } from "react-query";
import { UserService } from "../services";

const useDirectMessagings = () => {
	return useQuery(
		['directMessagings'],
		() => UserService.getDirectMessagings()
	);
};

export default useDirectMessagings;