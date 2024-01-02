import { debounce, isEqual } from "lodash";
import { Box } from "@mui/material";
import { FC, useState } from "react";

import { CustomAutoComplete, FriendItem } from "../../UI";
import { useAppSelector, useSnackbar, useUsers } from "../../../hooks";
import { InputChangeHandler, UserInfo } from "../../../types";
import { selectUser } from "../../../store";
import { ActionType } from "../../../enums";
import classes from "./AddFriendContent.module.css";

const AddFriendContent: FC = () => {
	const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
	const [inputValue, setInputValue] = useState('');

	const { mutate: mutateFilterUsers } = useUsers();
	const { _id, username } = useAppSelector(selectUser);
	const { showSnackbar } = useSnackbar();

	const fetchUsers = async ( query: string ) => {
		mutateFilterUsers(query, {
			onSuccess: data => {
				if ( !isEqual(data, filteredUsers) ) {
					setFilteredUsers(data);
				}
			},
			onError: error => {
				error instanceof Error && showSnackbar(error.message, 'error');
			}
		});
	};

	const debouncedFetchUsers = debounce(async ( query: string ) => {
		await fetchUsers(query);
	}, 300);

	const handleInputChange: InputChangeHandler = async ( e ) => {
		const inputValue = e.target.value;

		setInputValue(inputValue);
		await debouncedFetchUsers(inputValue);
	};

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