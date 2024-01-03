import { useMutation, useQueryClient } from "react-query";

import { NotificationService } from "../services";
import { NotificationServiceProps } from "../types";

const UseCreateNotification = () => {
	const queryClient = useQueryClient();
	return useMutation(
		( { userId, notification }: NotificationServiceProps ) =>
			NotificationService.sendFriendNotification({ userId, notification }), {
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

export default UseCreateNotification;