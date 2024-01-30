import { Avatar, Box, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

import { useAllMembersInServer, useAppSelector, useChannel, useUpdateChannelMessage } from "../../../hooks";
import { CustomButton, CustomCircularProgressBar, CustomTextField, CustomTooltip } from "../../UI";
import webSocketService from "../../../services/WebSocketService.ts";
import { selectUser } from "../../../store";
import { ChatMessage, UserInfo } from "../../../types";
import { stringAvatar } from "../../../utils";
import classes from "./ChannelContent.module.css";

export const ChannelContent = ( { id }: { id: string } ) => {

	const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
	const [message, setMessage] = useState("");
	const emojiContainerRef = useRef<HTMLDivElement | null>(null);
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);

	const { serverId, clusterId } = useParams();
	const { _id, username, avatarUrl } = useAppSelector(selectUser);
	const { data: memberData } = useAllMembersInServer(serverId ?? '');

	const { data: channelData, isLoading } = useChannel({
		serverId: serverId ?? '',
		clusterId: clusterId ?? '',
		channelId: id
	});

	const { mutate: mutateCreateChatMessage } =
		useUpdateChannelMessage({ serverId: serverId ?? '', clusterId: clusterId ?? '', channelId: id });

	const [oldMessages, setOldMessages] = useState<ChatMessage[]>([]);

	const onPrivateMessageReceive = ( payload: { body: string } ) => {
		setOldMessages(( prevState ) => [...prevState, JSON.parse(payload.body)]);
	};

	const onConnected = useCallback(() => {
		console.log("WebSocket connected successfully");
		id &&
		webSocketService.subscribe(`/chatroom/${ serverId }/${ clusterId }/${ id }`, onPrivateMessageReceive);
	}, [clusterId, id, serverId]);

	const onError = () => {
		console.error("Could not connect to WebSocket. Please refresh this page and try again!");
	};

	useEffect(() => {
		webSocketService.connect(onConnected, onError).then();

		return () => {
			webSocketService.unsubscribe(`/chatroom/${ serverId }/${ clusterId }/${ id }`);
			webSocketService.disconnect();
		};
	}, [serverId, clusterId, id, onConnected]);

	useEffect(() => {
		setOldMessages(
			channelData?.messages?.map(( msg: ChatMessage ) => msg) ?? []
		);
	}, [channelData?.messages]);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);


	const sendPrivateMessage = ( e: FormEvent ) => {
		e.preventDefault();
		const messageContent = message.trim();
		if ( messageContent && webSocketService ) {
			const chatMessage: ChatMessage = {
				senderId: _id as string,
				senderName: username,
				receiverName: serverId,
				content: messageContent,
				date: new Date().toISOString(),
				type: 'MESSAGE',
			};

			webSocketService.send(`/app/chat/${ serverId }/${ clusterId }/${ id }/sendPrivateMessage`, {}, chatMessage);
			setMessage('');

			id && mutateCreateChatMessage({
				serverId: serverId ?? '',
				clusterId: clusterId ?? '',
				channelId: id,
				chatMessage
			});
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
			{ isLoading ? <Box className={ classes.loading }>
					<CustomCircularProgressBar/>
				</Box>
				: oldMessages.map(( msg: ChatMessage, index: number ) =>
					<Box key={ index } className={ classes["msg-content"] }>
						{ msg.senderId === _id ? <Box className={ classes.sent }>
								<Box className={ classes["msg-sent"] }>
									<Typography>{ msg.content }</Typography>
								</Box>
								<CustomTooltip
									title={ msg.date && new Date(msg.date).toLocaleString() }
									placement="top"
								>
									<Avatar { ...stringAvatar(username ?? '') } alt={ username } src={ avatarUrl }/>
								</CustomTooltip>
							</Box>
							: <Box className={ classes.received }>
								{ memberData &&
									memberData
										.filter(( member: UserInfo ) => member._id === msg.senderId)
										.map(( sender: UserInfo ) => <CustomTooltip
												key={ sender._id }
												title={ msg.date && new Date(msg.date).toLocaleString() }
												placement="top">
												<Avatar
													{ ...stringAvatar(sender.username ?? '') }
													alt={ sender.username }
													src={ sender.avatarImageUrl }
												/>
											</CustomTooltip>
										) }
								<Box className={ classes["msg-received"] }>
									<Typography>{ msg.content }</Typography>
								</Box>
							</Box>
						}
					</Box>
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

export default ChannelContent;