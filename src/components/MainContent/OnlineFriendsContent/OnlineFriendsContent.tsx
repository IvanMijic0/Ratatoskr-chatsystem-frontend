import { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { useAppDispatch, useFriends, useGetNotificationByUserIds } from "../../../hooks";
import { InputChangeHandler, UserInfo } from "../../../types";
import { CustomAutoComplete, FriendItem } from "../../UI";
import actionType from "../../../enums/ActionType.ts";
import { webSocketService } from "../../../services";
import { setFriendStatus } from "../../../store";
import { UserStatus } from "../../../enums";
import classes from './OnlineFriendsContent.module.css';

const OnlineFriendsContent = () => {
	const [filteredUsers, setFilteredUsers] = useState<UserInfo[] | undefined>([]);
	const [inputValue, setInputValue] = useState('');

	const { data: friendsData } = useFriends();
	const { mutate } = useGetNotificationByUserIds();

	const dispatch = useAppDispatch();

	const updateFriendsData = useCallback(( data: { [x: string]: any } ) => {
		const updatedFriendsData = ( friendsData || [] ).map(( friend ) => {
			const userId = friend?._id;
			const userNotifications = data[userId!];

			if ( userNotifications && userNotifications.length > 0 ) {
				const latestNotification = userNotifications[0];
				return {
					...friend,
					status: latestNotification.content === UserStatus.ONLINE ? UserStatus.ONLINE : UserStatus.OFFLINE,
				};
			}
			return { ...friend, status: UserStatus.OFFLINE };
		});

		return updatedFriendsData.filter(friend => friend.status === UserStatus.ONLINE);
	}, [friendsData]);

	const fetchData = useCallback(async () => {
		const friendIds = friendsData?.map(friend => friend?._id);
		friendIds && mutate(friendIds as string[], { onSuccess: data => setFilteredUsers(updateFriendsData(data)) });
	}, [friendsData, mutate, updateFriendsData]);

	const onUserOnlineStatusChange = useCallback(async ( data: { body: string } ) => {
		const body = JSON.parse(data.body);

		await fetchData();

		const [id, friendUsername, status]: string = body.split(':');
		dispatch(setFriendStatus({ id, username: friendUsername, status }));

	}, [dispatch, fetchData]);


	useEffect(() => {
		fetchData().then(() => {
		});

		webSocketService.subscribe('/notifications/onlineStatus', onUserOnlineStatusChange);

	}, [fetchData, friendsData, mutate, onUserOnlineStatusChange, updateFriendsData]);

	const handleInputChange: InputChangeHandler = ( e ) => {
		const inputValue = e.target.value.toLowerCase();
		setInputValue(inputValue);

		const filtered =
			inputValue === ''
				? friendsData
				: friendsData?.filter(user =>
					user?.username?.toLowerCase().includes(inputValue)
				);

		setFilteredUsers(filtered!);
	};

	return <Box className={ classes['content-container'] }>
		<CustomAutoComplete
			className={ classes.search }
			options={ filteredUsers ?? [] }
			label="Friends"
			value={ inputValue }
			onInputChange={ handleInputChange }
		/>
		<Box className={ classes["friend-list-container"] }>
			<Box className={ classes["friend-list-container"] }>
				<Typography className={ classes['info-text'] }>{ `ONLINE - ${ filteredUsers?.length }` }</Typography>
			</Box>
			{ friendsData && friendsData?.length > 0 && filteredUsers?.map(filteredUser =>
				<FriendItem
					key={ filteredUser._id }
					friendId={ filteredUser._id }
					friendUsername={ filteredUser.username }
					friendAvatarIconUrl={ filteredUser.avatarImageUrl }
					actionType={ actionType.START_CONVO }
				/>
			) }
		</Box>
	</Box>;
};

export default OnlineFriendsContent;