import { NotificationType, UserStatus } from "../enums";

type Notification = {
	notificationType: NotificationType,
	date?: string,
	senderId?: string,
	receiverId?: string,
	content: string | UserStatus,
}

export default Notification;