import { useMutation, useQueryClient } from "react-query";
import { NotificationService } from "../services";

const useGetNotificationByUserIds = () => {
	const queryClient = useQueryClient();
	return useMutation(
		( userIds: string[] ) => NotificationService.getNotificationByUserIds(userIds), {
			onSuccess: async () => {
				try {
					await queryClient.invalidateQueries('notification');
					await queryClient.invalidateQueries('friends');
				} catch (error) {
					console.error('Error getting notifications:', error);
					throw error;
				}
			},
		}
	);
};

export default useGetNotificationByUserIds;