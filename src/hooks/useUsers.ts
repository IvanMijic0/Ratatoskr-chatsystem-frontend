import { useMutation } from "react-query";

import { UserService } from "../services";

const useUsers = () => {
	return useMutation(
		( query: string ) => UserService.fetchUsers(query),
	);
};

export default useUsers;