import { useInfiniteQuery } from "react-query";
import { UserService } from "../services";

const useDirectMessaginsById = ( id: string | undefined, page: number = 1 ) => {
	return useInfiniteQuery(['directMessagingsById', id, page], () => UserService.getDirectMessagingsById(id, page), {
		refetchOnMount: true,
		refetchOnReconnect: true,
	});
};

export default useDirectMessaginsById;
