import { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { useAppSelector, useFriends, useGetNotificationByUserIds } from "../../../hooks";
import { InputChangeHandler, UserInfo } from "../../../types";
import { CustomAutoComplete, FriendItem } from "../../UI";
import actionType from "../../../enums/ActionType";
import { UserStatus } from "../../../enums";
import classes from './OnlineFriendsContent.module.css';
import { selectFriendStatus, selectUser } from "../../../store";

const OnlineFriendsContent = () => {
	const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
	const [inputValue, setInputValue] = useState('');

	const { mutate } = useGetNotificationByUserIds();
	const friendStatus = useAppSelector(selectFriendStatus);
	const { _id, username } = useAppSelector(selectUser);
	const { data: friendsData } = useFriends();

	const updateFriendsData = useCallback((data: { [x: string]: any }) => {
		if (!friendsData || friendsData.length === 0) return [];

		const updatedFriendsData = friendsData.map(friend => {
			const userId = friend?._id;
			const userNotifications = data[userId!];

			if (userNotifications && userNotifications.length > 0) {
				return {
					...friend,
					status: userNotifications[0].content === UserStatus.ONLINE ? UserStatus.ONLINE : UserStatus.OFFLINE,
				};
			}

			return { ...friend, status: UserStatus.OFFLINE };
		});

		return updatedFriendsData.filter(friend => friend.status === UserStatus.ONLINE);
	}, [friendsData]);

	const fetchData = useCallback(async () => {
		const friendIds = friendsData?.map(friend => friend?._id);

		friendIds && mutate(friendIds as string[], {
			onSuccess: data => {
				const updatedFriendsData = updateFriendsData(data);
				setFilteredUsers(updatedFriendsData);
			}
		});

	}, [friendsData, mutate, updateFriendsData]);

	useEffect(() => {
		fetchData();
	}, [fetchData, friendStatus, friendsData]);

	const handleInputChange: InputChangeHandler = (e) => {
		const inputValue = e.target.value.toLowerCase();
		setInputValue(inputValue);
		const filtered =
			inputValue === ''
				? friendsData
				: friendsData?.filter(user =>
					user?.username?.toLowerCase().includes(inputValue)
				);
		setFilteredUsers(filtered ?? []);
	};

	return (
		<Box className={classes['content-container']}>
			<CustomAutoComplete
				className={classes.search}
				options={filteredUsers}
				label="Friends"
				value={inputValue}
				onInputChange={handleInputChange}
			/>
			<Box className={classes["friend-list-container"]}>
				<Typography className={classes['info-text']}>{`ONLINE - ${filteredUsers?.length ?? 0}`}</Typography>
				{filteredUsers && filteredUsers.length > 0 &&
					filteredUsers.map(filteredUser =>
						<FriendItem
							key={filteredUser._id}
							friendId={filteredUser._id}
							friendUsername={filteredUser.username}
							friendAvatarIconUrl={filteredUser.avatarImageUrl}
							actionType={actionType.START_CONVO}
							status={filteredUser.status}
							currentUserId={_id}
							currentUserUsername={username}
						/>
					)}
			</Box>
		</Box>
	);
};

export default OnlineFriendsContent;
