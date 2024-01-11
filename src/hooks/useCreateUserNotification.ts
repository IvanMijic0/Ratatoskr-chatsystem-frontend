import { useMutation, useQueryClient } from "react-query";
import { Notification } from "../types";

import { NotificationService } from "../services";

const UseCreateUserNotification = () => {
	const queryClient = useQueryClient();
	return useMutation(
		( notification: Notification ) =>
			NotificationService.saveUserNotification(notification), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries(["notification"]);
				} catch (error) {
					console.error(error);
					throw error;
				}
			}
		}
	);
};

export default UseCreateUserNotification;