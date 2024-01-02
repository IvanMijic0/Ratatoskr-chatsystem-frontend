import { useQuery } from "react-query";

import { NotificationService } from "../services";

const useFriendNotification = () => {
	return useQuery(
		['friendNotification'],
		() => NotificationService.getFriendNotification()
	);
};

export default useFriendNotification;