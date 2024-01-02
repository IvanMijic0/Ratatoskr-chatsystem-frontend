import { useMutation } from "react-query";

import { NotificationService } from "../services";
import { NotificationServiceProps } from "../types";

const UseCreateFriendRequest = () => {
	return useMutation(
		( { friendId, notification }: NotificationServiceProps ) =>
			NotificationService.sendFriendRequestNotification({ friendId, notification }), {}
	);
};

export default UseCreateFriendRequest;