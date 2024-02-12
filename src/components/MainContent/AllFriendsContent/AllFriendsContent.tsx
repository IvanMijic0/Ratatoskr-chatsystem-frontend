import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { CustomAutoComplete, FriendItem } from "../../UI";
import { InputChangeHandler, UserInfo } from "../../../types";
import actionType from "../../../enums/ActionType.ts";
import { useAppSelector, useFriends } from "../../../hooks";
import { selectUser } from "../../../store";
import classes from './AllFriendsContent.module.css';

export const AllFriendsContent = () => {
	const { data: friendsData } = useFriends();

	const [inputValue, setInputValue] = useState('');
	const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);

	const { _id, username } = useAppSelector(selectUser);

	useEffect(() => {
		friendsData && setFilteredUsers(friendsData);
	}, [friendsData]);

	const handleInputChange: InputChangeHandler = (e) => {
		const inputValue = e.target.value.toLowerCase();
		setInputValue(inputValue);

		const filtered =
			inputValue === ''
				? friendsData
				: friendsData?.filter((user) =>
					user?.username?.toLowerCase().includes(inputValue)
				);

		setFilteredUsers(filtered ?? []);
	};

	return (
		<Box className={classes["content-container"]}>
			{friendsData && friendsData.length > 0 && (
				<CustomAutoComplete
					className={classes.search}
					options={filteredUsers}
					label="Friends"
					value={inputValue}
					onInputChange={handleInputChange}
				/>
			)}
			{friendsData && friendsData.length === 0 && (
				<Typography className={classes.text} variant="body1" color="textSecondary">
					No friends found.
				</Typography>
			)}
			<Box className={classes["friend-list-container"]}>
				{filteredUsers.map((filteredUser) => (
					<FriendItem
						key={filteredUser._id}
						friendId={filteredUser._id}
						friendUsername={filteredUser.username}
						friendAvatarIconUrl={filteredUser.avatarImageUrl}
						actionType={actionType.START_CONVO}
						currentUserUsername={username!}
						currentUserId={_id!}
						status={filteredUser.status}
					/>
				))}
			</Box>
		</Box>
	);
};

export default AllFriendsContent;
