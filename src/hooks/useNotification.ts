import { useQuery } from "react-query";

import { NotificationService } from "../services";

const useNotification = () => {
	return useQuery(
		['notification'],
		() => NotificationService.getUserNotification()
	);
};

export default useNotification;