import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { CustomAutoComplete, FriendItem } from "../../UI";
import { InputChangeHandler, UserInfo } from "../../../types";
import { axiosInstance } from "../../../configuration";
import classes from './AllFriendsContent.module.css';

export const AllFriendsContent = () => {
	const [inputValue, setInputValue] = useState('');
	const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);

	const fetchUsers = useCallback(async () => {
		try {
			const { data } = await axiosInstance.get('/user/friends');
			setAllUsers(data);
			setFilteredUsers(data);
		} catch (error) {
			console.error("Error fetching users:", error);
			return [];
		}
	}, []);

	const handleInputChange: InputChangeHandler = ( e ) => {
		const inputValue = e.target.value.toLowerCase();
		setInputValue(inputValue);

		const filtered =
			inputValue === ''
				? allUsers
				: allUsers.filter(( user ) =>
					user.username.toLowerCase().includes(inputValue)
				);

		setFilteredUsers(filtered);
	};

	useEffect(() => {
		try {
			fetchUsers();
		} catch (error) {
			console.log("Could not fetch users: " + error);
			throw error;
		}
	}, [fetchUsers]);

	return (
		<Box className={ classes["content-container"] }>
			<CustomAutoComplete
				className={ classes.search }
				options={ filteredUsers }
				label="Friends"
				value={ inputValue }
				onInputChange={ handleInputChange }
			/>
			<Box className={ classes["friend-list-container"] }>
				{ filteredUsers.map(( filteredUser ) => (
					<FriendItem
						key={ filteredUser._id }
						friendId={ filteredUser._id }
						friendUsername={ filteredUser.username }
						friendAvatarIconUrl={ filteredUser.avatarUrl }
					/>
				)) }
			</Box>
		</Box>
	);
};

export default AllFriendsContent;