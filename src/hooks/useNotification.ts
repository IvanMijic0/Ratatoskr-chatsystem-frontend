import { useQuery } from "react-query";

import { NotificationService } from "../services";

const useNotification = () => {
	return useQuery(
		['notification'],
		() => NotificationService.getFriendNotification()
	);
};

export default useNotification;