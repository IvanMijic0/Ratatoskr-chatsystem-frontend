import { ChangeEvent, FC, useEffect, useState } from "react";

import _debounce from 'lodash.debounce';
import { Box } from "@mui/material";
import CustomAutoComplete from "../../ui/custom_autocomplete/CustomAutoComplete";
import classes from "./AddFriendContent.module.css";
import axiosInstance from "../../../configuration/axios-instance.ts";
import FriendButton from "../../ui/friend_button/FriendButton.tsx";
import IUserInfo from "../friend_content/IUserInfo.ts";

type InputChangeHandler = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void;

const AddFriendContent: FC = () => {
	const [filteredUsers, setFilteredUsers] = useState<IUserInfo[]>([]);
	const [inputValue, setInputValue] = useState('');

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

	return (
		<Box className={ classes["add-friend-container"] }>
			<CustomAutoComplete
				placeHolder="Search all users..."
				className={ classes.search }
				options={ filteredUsers }
				label="Add Friend"
				value={ inputValue }
				onInputChange={ handleInputChange }
			/>
			<Box className={ classes["add-friend-list"] }>
				{ filteredUsers.map(filteredUser => (
					<FriendButton
						key={ filteredUser._id }
						friendId={ filteredUser._id }
						friendUsername={ filteredUser.username }
						friendAvatarIconUrl={ filteredUser.avatarUrl }/>
				)) }
			</Box>
		</Box>
	);
};

export default AddFriendContent;
