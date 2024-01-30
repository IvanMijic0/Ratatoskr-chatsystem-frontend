type ChatMessage = {
	senderId: string;
	senderName?: string;
	receiverName?: string | null;
	content: string;
	date: string | null;
	type: string;
};

export default ChatMessage;