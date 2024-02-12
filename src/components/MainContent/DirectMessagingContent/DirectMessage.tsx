import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useQueryClient } from "react-query";

import { useAppDispatch, useAppSelector, useCreateNotification, useDirectMessagingsById, useSnackbar, useUpdateDirectMessagings } from "../../../hooks";
import { CustomButton, CustomCircularProgressBar, CustomTextField, CustomTooltip } from "../../UI";
import { NotificationAction, selectUser, setFriendStatus, setUserStatus } from "../../../store";
import webSocketService from "../../../services/WebSocketService.ts";
import { NotificationType, UserStatus } from "../../../enums";
import { ChatMessage, Notification } from "../../../types";
import useFriend from "../../../hooks/useFriend.ts";
import { stringAvatar } from "../../../utils";
import classes from "./DirectMessage.module.css";

const DirectMessage = () => {
	const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
	const [message, setMessage] = useState("");
	const emojiContainerRef = useRef<HTMLDivElement | null>(null);
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);

	const { showSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();

	const { directMessagingId, friendId } = useParams();
	const { data } = useFriend(friendId);
	const { _id, username, avatarUrl } = useAppSelector(selectUser);

	const {
		data: directMessageData,
		isLoading,
		fetchNextPage,
		hasNextPage
	} = useDirectMessagingsById(directMessagingId);

	const { mutate: mutatePostNotification } = useCreateNotification();
	const { mutate: mutateCreateDirectMessaging } = useUpdateDirectMessagings(directMessagingId ?? '');

	const [oldMessages, setOldMessages] = useState<ChatMessage[]>([]);

	const onPrivateMessageReceive = useCallback((payload: { body: string }) => {
		setOldMessages(prevState => [...prevState, JSON.parse(payload.body)]);
		console.log(payload.body);
	}, []);

	const onUserNotificationReceive = useCallback((message: { body: string }) => {
		console.log("WS Notification received");

		queryClient.invalidateQueries(['directMessagingsSummary']);
		const body: Notification = JSON.parse(message.body);

		showSnackbar(body.content, "info");
		dispatch(NotificationAction.postNotificationData(body, body.receiverId!));
	}, [dispatch, queryClient, showSnackbar]);

	const onUserOnlineStatusChange = useCallback((data: { body: string }) => {
		const body = JSON.parse(data.body);

		queryClient.invalidateQueries(['friends']);

		if (body) {
			const [id, friendUsername, status]: string = body.split(':');
			_id !== id && dispatch(setFriendStatus({ id, username: friendUsername, status }));
		} else {
			console.error('Body is null');
		}

	}, [_id, dispatch, queryClient]);

	const onConnected = useCallback(() => {
		directMessagingId && webSocketService.subscribe(`/chat/${directMessagingId}`, onPrivateMessageReceive);
		webSocketService.subscribe(`/notifications/${_id}`, onUserNotificationReceive);
		webSocketService.subscribe('/notifications/onlineStatus', onUserOnlineStatusChange);

		webSocketService.send('/notifications/onlineStatus', {}, `${_id}:${username}:online`);

		mutatePostNotification({
			userId: _id,
			notification: { notificationType: NotificationType.USER_STATUS_CHANGED, content: UserStatus.ONLINE }
		});
		dispatch(setUserStatus(UserStatus.ONLINE));
	}, [directMessagingId, onPrivateMessageReceive]);

	const onError = () => {
		console.error("Could not connect to WebSocket. Please refresh this page and try again!");
	};

	useEffect(() => {
		webSocketService.disconnect();
		webSocketService.connect(onConnected, onError);

		return () => {
			directMessagingId && webSocketService.unsubscribe(`/chat/${directMessagingId}`);
			webSocketService.unsubscribe(`/notifications/${_id}`);
			webSocketService.unsubscribe('/notifications/onlineStatus');
			webSocketService.disconnect();
		};
	}, [directMessagingId, onConnected]);

	useEffect(() => {
		setOldMessages(
			directMessageData?.pages.flatMap((page) => page.content) ?? []
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
		if (messagesContainer) {
			const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
			if (scrollTop + clientHeight === scrollHeight && hasNextPage) {
				fetchNextPage().then();
			}
		}
	}, [fetchNextPage, hasNextPage]);

	useEffect(() => {
		const messagesContainer = messagesContainerRef.current;
		if (messagesContainer) {
			messagesContainer.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (messagesContainer) {
				messagesContainer.removeEventListener('scroll', handleScroll);
			}
		};
	}, [messagesContainerRef, fetchNextPage, hasNextPage, handleScroll]);

	const sendPrivateMessage = (e: FormEvent) => {
		e.preventDefault();
		const messageContent = message.trim();
		if (messageContent && webSocketService) {
			const chatMessage: ChatMessage = {
				senderId: _id as string,
				senderName: username,
				receiverName: data?.username,
				content: messageContent,
				date: new Date().toISOString(),
				type: 'MESSAGE',
			};

			webSocketService.send(`/app/chat/${directMessagingId}/sendPrivateMessage`, {}, chatMessage);
			setMessage('');

			directMessagingId && mutateCreateDirectMessaging({ directMessagingId, chatMessages: chatMessage });
		}
	};

	const emojiMenuHandler = () => {
		setIsEmojiMenuOpen((prevState) => !prevState);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (emojiContainerRef.current && !emojiContainerRef.current.contains(event.target as Node)) {
			setIsEmojiMenuOpen(false);
		}
	};

	const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	return (
		<Box className={classes["chat-container"]}>
			<Box className={classes["messages-container"]} ref={messagesContainerRef}>
				{isLoading ? (
					<Box className={classes.loading}>
						<CustomCircularProgressBar />
					</Box>
				) : (
					oldMessages.map((msg, index) =>
						data ? (
							<Box key={index} className={classes['msg-content']}>
								{msg.senderId === _id ? (
									<Box className={classes.sent}>
										<Box className={classes['msg-sent']}>
											<Typography>{msg.content}</Typography>
										</Box>
										<CustomTooltip title={username} placement="top">
											<Avatar {...stringAvatar(username ?? '')} alt={username} src={avatarUrl} />
										</CustomTooltip>
									</Box>
								) : (
									<Box className={classes.received} key={index}>
										<CustomTooltip
											title={msg.date && new Date(msg.date).toLocaleString()}
											placement="top"
										>
											<Avatar
												{...stringAvatar(data?.username ?? '')}
												alt={data?.username}
												src={data?.avatarImageUrl}
											/>
										</CustomTooltip>
										<Box className={classes['msg-received']}>
											<Typography>{msg.content}</Typography>
										</Box>
									</Box>
								)}
							</Box>
						) : (
							<Typography key={index}>No messages</Typography>
						)
					)
				)}
			</Box>
			<form className={classes.form} onSubmit={sendPrivateMessage}>
				<Box className={classes['input-field']}>
					<CustomTextField
						type="text"
						label="Message"
						value={message}
						size="small"
						fullWidth
						variant="outlined"
						onChange={handleMessageChange}
					/>
				</Box>
				<Box className={classes.button} ref={emojiContainerRef}>
					<Box className={classes['emoji-container']}>
						{isEmojiMenuOpen && (
							<EmojiPicker
								width={350}
								height={400}
								onEmojiClick={(emojiObject) => setMessage(message + emojiObject.emoji)}
								theme={Theme.DARK}
								emojiStyle={EmojiStyle.NATIVE}
								lazyLoadEmojis={true}
							/>
						)}
					</Box>
					<IconButton onClick={emojiMenuHandler}>
						<EmojiEmotionsIcon className={classes['emoji-icon']} />
					</IconButton>
					<CustomButton type="submit">Send</CustomButton>
				</Box>
			</form>
		</Box>
	);
};

export default DirectMessage;

