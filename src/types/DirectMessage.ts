import { ChatMessage } from "./index.ts";

type BaseChatEntity = {
	_id: string;
	messages: ChatMessage[];
};

type DirectMessaging = BaseChatEntity & {
	senderId: string;
	receiverId: string;
};

export default DirectMessaging;
