import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppSelector } from "../../../hooks";
import { selectUser } from "../../../Store";
import { Box, Typography } from "@mui/material";
import webSocketService from "../../../Services/WebSocketService.ts";
import { ChatMessage } from "../../../Types";
import { CustomButton, CustomTextField } from "../../UI";
import classes from "./DirectMessage.module.css";

const DirectMessage = () => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [message, setMessage] = useState("");

	const { username } = useAppSelector(selectUser);

	const onPublicMessageReceive = ( payload: { body: string } ) => {
		setMessages(( prevMessages ) => [...prevMessages, JSON.parse(payload.body)]);
	};

	const onConnected = () => {
		console.log("WebSocket connected successfully");
		webSocketService.subscribe('/chatroom/public', onPublicMessageReceive);
		webSocketService.send('/app/chat.addUser', {}, { sender: username, type: 'JOIN' });
	};

	const onError = () => {
		console.error("Could not connect to WebSocket. Please refresh this page and try again!");
	};

	useEffect(() => {
		webSocketService.connect(onConnected, onError);

		return () => webSocketService.disconnect();
	}, []);

	const handleMessageChange = ( e: ChangeEvent<HTMLInputElement> ) => {
		setMessage(e.target.value);
	};

	const sendPublicMessage = ( e: FormEvent ) => {
		e.preventDefault();
		const messageContent = message.trim();
		if ( messageContent && webSocketService ) {
			const chatMessage = {
				sender: username,
				content: messageContent,
				type: 'MESSAGE',
			};
			webSocketService.send('/app/chat.sendMessage', {}, chatMessage);
			setMessage('');
		}
	};

	return (
		<Box className={ classes["chat-container"] }>
			<Typography variant="h4">Testing</Typography>
			<Box className={ classes["messages-container"] }>
				{ messages.map(( msg, index ) => (
					<Typography key={ index }>{ msg.content }</Typography>
				)) }
			</Box>
			<form className={ classes.form } onSubmit={ sendPublicMessage }>
				<CustomTextField
					type="text"
					label="Message"
					value={ message }
					onChange={ handleMessageChange }
				/>
				<CustomButton type="submit">Send</CustomButton>
			</form>
		</Box>
	);
};
export default DirectMessage;
