import { FC, useEffect, useState } from "react";

import _debounce from 'lodash.debounce';
import { Box } from "@mui/material";
import axiosInstance from "../../../configuration/axios-instance.ts";
import { useAppSelector } from "../../../hooks";
import { selectUser } from "../../../store";
import { InputChangeHandler, UserInfo } from "../../../types";
import { CustomAutoComplete, FriendItem } from "../../UI";
import classes from "./AddFriendContent.module.css";

const AddFriendContent: FC = () => {
	const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
	const [inputValue, setInputValue] = useState('');

	const { _id } = useAppSelector(selectUser);

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
			label="Add Friend"
			value={ inputValue }
			onInputChange={ handleInputChange }
		/>
		<Box className={ classes["add-friend-list"] }>
			{ filteredUsers.map(filteredUser =>
				<FriendItem
					key={ filteredUser._id }
					friendId={ filteredUser._id }
					friendUsername={ filteredUser.username }
					friendAvatarIconUrl={ filteredUser.avatarUrl }
					currentUserId={ _id }
					hasAction
				/>
			) }
		</Box>
	</Box>;
};

export default AddFriendContent;
