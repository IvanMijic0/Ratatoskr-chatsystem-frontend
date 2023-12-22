import { useState } from "react";
import { Box } from "@mui/material";

import InputChangeHandler from "../../../Types/InputChangeHandler.ts";
import { CustomAutoComplete, FriendItem } from "../../UI";
import { UserInfo } from "../../../Types";
import classes from "./FriendContent.module.css";

export const FriendContent = () => {
	const [inputValue, setInputValue] = useState('');
	const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);

	const handleInputChange: InputChangeHandler = ( e ) => {
		setInputValue(e.target.value);
		//debouncedFetchUsers(e.target.value);
	};

	return <Box className={ classes["content-container"] }>
		<CustomAutoComplete
			className={ classes.search }
			options={ filteredUsers }
			label="Friends"
			value={ inputValue }
			onInputChange={ handleInputChange }
		/>
		<Box className={ classes["friend-list-container"] }>
			{ filteredUsers.map(filteredUser =>
				<FriendItem
					key={ filteredUser._id }
					friendId={ filteredUser._id }
					friendUsername={ filteredUser.username }
					friendAvatarIconUrl={ filteredUser.avatarUrl }
				/>
			) }
		</Box>
	</Box>;
};

export default FriendContent;