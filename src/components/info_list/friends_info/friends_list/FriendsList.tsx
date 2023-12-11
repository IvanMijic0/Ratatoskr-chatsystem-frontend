import { Button, Divider, List, Typography } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';

import FriendsSearch from "../friends_search/FriendsSearch.tsx";
import classes from "./FriendsList.module.css";
import { useAppSelector } from "../../../../hooks/redux-hooks.ts";
import { selectFriendInfoData } from "../../../../store/slice/friend_slice/friend-slice.ts";

const FriendsList = () => {
	const friendData = useAppSelector(selectFriendInfoData);

	console.log(friendData);

	return <List
		className={ classes["friends-list"] }
		component="nav"
		aria-labelledby="nested-list-subheader"
		dense
	>
		<FriendsSearch/>
		<Button
			className={ classes["add-friend-button"] }
			variant="text"
			sx={ { textTransform: "none" } }
			startIcon={ <PeopleIcon className={ classes["add-friend-icon"] }/> }>
			Friends
		</Button>
		<Divider className={ classes.divider } variant="middle" flexItem/>
		{ friendData.length === 0
			? <Typography className={ classes.description }>No friends yet...</Typography>
			: <Typography>fren</Typography> }
	</List>;
};

export default FriendsList;