import { Button, Divider, List, Typography } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';

import { ConvoSearch } from "../ConvoSearch";
import { useAppSelector } from "../../../../hooks";
import { selectFriendInfoData } from "../../../../Store";
import classes from "./ConvosList.module.css";

const ConvosList = () => {
	const friendData = useAppSelector(selectFriendInfoData);

	console.log(friendData);

	return <List
		className={ classes["friends-list"] }
		aria-labelledby="nested-list-subheader"
		dense
	>
		<ConvoSearch/>
		<Button
			className={ classes["add-friend-button"] }
			variant="text"
			sx={ { textTransform: "none" } }
			startIcon={ <PeopleIcon className={ classes["add-friend-icon"] }/> }>
			Friends
		</Button>
		<Divider className={ classes.divider } variant="middle" flexItem/>
		{ friendData.length === 0
			? <Typography className={ classes.description }>No direct convos yet...</Typography>
			: <Typography>fren</Typography> }
	</List>;
};

export default ConvosList;