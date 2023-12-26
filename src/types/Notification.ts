import { NotificationType } from "../enums";

type Notification = {
	notificationType: NotificationType,
	date: string,
	senderId?: string,
	receiverId?: string,
	content: string,
}

export default Notification;