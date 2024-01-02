import { useQuery } from "react-query";

import { UserService } from "../services";

const useFriendRequestsUI = ( senderIds: ( string | undefined )[] ) => {
	return useQuery(
		['friendRequestsUI'],
		() => UserService.fetchUserInformationForIds(senderIds)
	);
};

export default useFriendRequestsUI;