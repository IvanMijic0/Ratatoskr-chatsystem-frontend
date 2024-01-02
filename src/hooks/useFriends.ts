import { useQuery } from "react-query";

import { UserService } from "../services";

const useFriends = () => {
	return useQuery(
		['friends'],
		() => UserService.fetchUserFriends()
	);
};

export default useFriends;