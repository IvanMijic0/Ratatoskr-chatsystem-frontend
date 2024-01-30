import { useQuery } from "react-query";

import { UserService } from "../services";

const useFriend = ( friendId: string | undefined ) => {
	return useQuery(
		['friend'],
		() => UserService.fetchUserFriend(friendId), {}
	);
};

export default useFriend;