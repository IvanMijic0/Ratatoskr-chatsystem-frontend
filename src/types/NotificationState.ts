import { Notification } from "../types";
import { UserStatus } from "../enums";

type FriendStatus = {
	id: string;
	username: string;
	status: UserStatus;
}

type NotificationState = {
	data: Notification[];
	userStatus: UserStatus | null;
	friendStatus: FriendStatus[] | null;
};

export default NotificationState;