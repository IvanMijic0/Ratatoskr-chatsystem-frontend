import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Typography } from "@mui/material";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

import { CustomButton, CustomCircularProgressBar, CustomTextField, CustomTooltip } from "../../UI";
import { useAppSelector, useDirectMessagingsById, useUpdateDirectMessagings } from "../../../hooks";
import webSocketService from "../../../services/WebSocketService.ts";
import useFriend from "../../../hooks/useFriend.ts";
import { selectUser } from "../../../store";
import { ChatMessage } from "../../../types";
import { stringAvatar } from "../../../utils";
import classes from "./DirectMessage.module.css";

const DirectMessage = () => {
	const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
	const [message, setMessage] = useState("");
	const emojiContainerRef = useRef<HTMLDivElement | null>(null);
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);

	const { directMessagingId, friendId } = useParams();
	const { data } = useFriend(friendId);
	const { _id, username } = useAppSelector(selectUser);

	const {
		data: directMessageData,
		isLoading,
		fetchNextPage,
		hasNextPage
	} = useDirectMessagingsById(directMessagingId);
	const { mutate: mutateCreateDirectMessaging } = useUpdateDirectMessagings(directMessagingId ?? '');

	const [oldMessages, setOldMessages] = useState<ChatMessage[]>([]);

	const onPrivateMessageReceive = ( payload: { body: string } ) => {
		setOldMessages(( prevState ) => [...prevState, JSON.parse(payload.body)]);
		directMessagingId &&
		mutateCreateDirectMessaging({ directMessagingId, chatMessages: JSON.parse(payload.body) });
	};

	const onConnected = () => {
		console.log("WebSocket connected successfully");
		directMessagingId &&
		webSocketService.subscribe(`/chat/${ directMessagingId }`, onPrivateMessageReceive);
	};

	const onError = () => {
		console.error("Could not connect to WebSocket. Please refresh this page and try again!");
	};

	useEffect(() => {
		webSocketService.connect(onConnected, onError);

		return () => webSocketService.disconnect();
	}, []);

	useEffect(() => {
		setOldMessages(
			directMessageData?.pages.flatMap(( page ) => page.content) ?? []
		);
	}, [directMessageData]);


	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const handleScroll = useCallback(() => {
		const messagesContainer = messagesContainerRef.current;
		if ( messagesContainer ) {
			const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
			if ( scrollTop + clientHeight === scrollHeight && hasNextPage ) {
				fetchNextPage();
			}
		}
	}, [fetchNextPage, hasNextPage]);

	useEffect(() => {
		const messagesContainer = messagesContainerRef.current;
		if ( messagesContainer ) {
			messagesContainer.addEventListener('scroll', handleScroll);
		}

		return () => {
			if ( messagesContainer ) {
				messagesContainer.removeEventListener('scroll', handleScroll);
			}
		};
	}, [messagesContainerRef, fetchNextPage, hasNextPage, handleScroll]);

	const sendPrivateMessage = ( e: FormEvent ) => {
		e.preventDefault();
		const messageContent = message.trim();
		if ( messageContent && webSocketService ) {
			const chatMessage: ChatMessage = {
				senderId: _id as string,
				senderName: username,
				receiverName: data?.username,
				content: messageContent,
				date: new Date().toISOString(),
				type: 'MESSAGE',
			};

			webSocketService.send(`/app/chat/${ directMessagingId }/sendPrivateMessage`, {}, chatMessage);
			setMessage('');
		}
	};

	const emojiMenuHandler = () => {
		setIsEmojiMenuOpen(( prevState ) => !prevState);
	};

	const handleClickOutside = ( event: MouseEvent ) => {
		if ( emojiContainerRef.current && !emojiContainerRef.current.contains(event.target as Node) ) {
			setIsEmojiMenuOpen(false);
		}
	};

	const handleMessageChange = ( e: ChangeEvent<HTMLInputElement> ) => {
		setMessage(e.target.value);
	};

	return <Box className={ classes["chat-container"] }>
		<Box className={ classes["messages-container"] } ref={ messagesContainerRef }>
			{ isLoading
				? <Box className={ classes.loading }>
					<CustomCircularProgressBar/>
				</Box>
				: oldMessages.map(( msg, index ) => data
					? <Box key={ index } className={ classes['msg-content'] }>
						{ msg.senderId === _id ? <Box className={ classes.sent }>
								<Box className={ classes['msg-sent'] }>
									<Typography>{ msg.content }</Typography>
								</Box>
								<CustomTooltip
									title={ msg.date && new Date(msg.date).toLocaleString() }
									placement="top">
									<Avatar
										{ ...stringAvatar(data?.username ?? '') }
										alt={ data?.username }
										src={ data?.avatarImageUrl }/>
								</CustomTooltip>
							</Box>
							: <Box className={ classes.received }>
								<CustomTooltip
									title={ msg.date && new Date(msg.date).toLocaleString() }
									placement="top">
									<Avatar
										{ ...stringAvatar(data?.username ?? '') }
										alt={ data?.username }
										src={ data?.avatarImageUrl }/>
								</CustomTooltip>
								<Box className={ classes['msg-received'] }>
									<Typography>{ msg.content }</Typography>
								</Box>
							</Box>
						}
					</Box>
					: <Typography>No messages</Typography>
				)
			}
		</Box>
		<form className={ classes.form } onSubmit={ sendPrivateMessage }>
			<Box className={ classes['input-field'] }>
				<CustomTextField
					type="text"
					label="Message"
					value={ message }
					size="small"
					fullWidth
					variant="outlined"
					onChange={ handleMessageChange }
				/>
			</Box>
			<Box className={ classes.button } ref={ emojiContainerRef }>
				<Box className={ classes['emoji-container'] }>
					{ isEmojiMenuOpen && (
						<EmojiPicker
							width={ 350 }
							height={ 400 }
							onEmojiClick={ ( emojiObject ) => setMessage(message + emojiObject.emoji) }
							theme={ Theme.DARK }
							emojiStyle={ EmojiStyle.NATIVE }
							lazyLoadEmojis={ true }
						/>
					) }
				</Box>
				<IconButton onClick={ emojiMenuHandler }>
					<EmojiEmotionsIcon className={ classes['emoji-icon'] }/>
				</IconButton>
				<CustomButton type="submit">Send</CustomButton>
			</Box>
		</form>
	</Box>;
};

export default DirectMessage;
