import CustomAutoComplete from "../../ui/custom_autocomplete/CustomAutoComplete";

import classes from "./AddFriendContent.module.css";
import { Box } from "@mui/material";

const AddFriendContent = () => {
	const friendsData = [
		{ label: 'Jahne Doe' },
		{ label: 'Rob Gayson' },
		{ label: 'Roadee McGee' },
		{ label: 'Satan Bosanac' },
	];

	return <Box className={ classes["add-friend-container"] }>
		<CustomAutoComplete
			className={ classes.search }
			options={ friendsData }
			label="Add Friend"
		/>
	</Box>;
};

export default AddFriendContent;