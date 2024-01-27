type ChatMessage = {
	senderName: string;
	receiverName: string | null;
	content: string;
	date: string | null;
	type: string;
	sender?: string;
};

export default ChatMessage;