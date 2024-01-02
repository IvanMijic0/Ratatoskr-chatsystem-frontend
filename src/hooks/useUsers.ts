import { useQuery } from "react-query";
import { UserService } from "../services";

const useUsers = ( query: string ) => {
	return useQuery(
		['friend'],
		() => UserService.fetchUsers(query),
	);
};

export default useUsers;