import CustomAutoComplete from "../../ui/custom_autocomplete/CustomAutoComplete.tsx";

import classes from "./FriendContent.module.css";
import { Box } from "@mui/material";
import FriendButton from "../../ui/friend_button/FriendButton.tsx";

export const FriendContent = () => {
	const friendsData = [
		{ label: 'Jahne Doe' },
		{ label: 'Rob Gayson' },
		{ label: 'Roadee McGee' },
		{ label: 'Satan Bosanac' },
	];

	return <Box className={ classes["content-container"] }>
		<CustomAutoComplete
			className={ classes.search }
			options={ friendsData }
			label="Friends"
		/>
		<Box className={ classes["friend-list-container"] }>
			{ friendsData.map(( friend, index ) =>
				<FriendButton
					key={ index }
					friendId={ friend.label }
					friendAvatarIconUrl=""
					friendUsername={ friend.label }/>)
			}
		</Box>
	</Box>;
};

export default FriendContent;
