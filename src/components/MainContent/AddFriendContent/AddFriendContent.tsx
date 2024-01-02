import { FC, useEffect, useState } from "react";

import _debounce from 'lodash.debounce';
import { Box } from "@mui/material";
import { axiosInstance } from "../../../configuration";
import { useAppSelector, useUsers } from "../../../hooks";
import { selectUser } from "../../../store";
import { InputChangeHandler, UserInfo } from "../../../types";
import { CustomAutoComplete, FriendItem } from "../../UI";
import classes from "./AddFriendContent.module.css";
import { ActionType } from "../../../enums";

const AddFriendContent: FC = () => {
	const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
	const [inputValue, setInputValue] = useState('');

	const { data: filteredUsersData } = useUsers('');
	const { _id, username } = useAppSelector(selectUser);

	const fetchUsers = async ( query: string ) => {
		try {
			const response = await axiosInstance.get(`/user/search?username=${ query }`);
			return response.data;
		} catch (error) {
			console.error("Error fetching users:", error);
			return [];
		}
	};

	const debouncedFetchUsers = _debounce(async ( query: string ) => {
		const users = await fetchUsers(query);
		setFilteredUsers(users);
	}, 300);

	const handleInputChange: InputChangeHandler = ( e ) => {
		setInputValue(e.target.value);
		debouncedFetchUsers(e.target.value);
	};

	useEffect(() => {
		return () => {
			debouncedFetchUsers.cancel();
		};
	}, []);

	return <Box className={ classes["add-friend-container"] }>
		<CustomAutoComplete
			placeHolder="Search all users..."
			className={ classes.search }
			options={ filteredUsers }
			label="Search all users..."
			value={ inputValue }
			onInputChange={ handleInputChange }
		/>
		<Box className={ classes["add-friend-list"] }>
			{ filteredUsers.map(filteredUser =>
				<FriendItem
					key={ filteredUser._id }
					friendId={ filteredUser._id }
					friendUsername={ filteredUser.username }
					friendAvatarIconUrl={ filteredUser.avatarImageUrl }
					currentUserId={ _id }
					currentUserUsername={ username }
					actionType={ ActionType.ADD_FRIEND }
				/>
			) }
		</Box>
	</Box>;
};

export default AddFriendContent;
