import { useQuery } from "react-query";
import { UserService } from "../services";

const useDirectMessaginsById = ( id: string | undefined ) => {
	return useQuery(
		['directMessagingsById', id],
		() => UserService.getDirectMessagingsById(id), {
			refetchOnMount: true,
			refetchOnReconnect: true,
		}
	);
};

export default useDirectMessaginsById;
