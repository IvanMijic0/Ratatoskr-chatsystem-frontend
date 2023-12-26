import { Notification } from "../types";

type NotificationState = {
	data: Notification[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
};

export default NotificationState;