import { Button, Divider, List } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import FriendsSearch from "../friends_search/FriendsSearch.tsx";
import classes from "./FriendsList.module.css";

const FriendsList = () => {
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
			startIcon={ <PersonAddIcon className={ classes["add-friend-icon"] }/> }>
			Friends
		</Button>
		<Divider className={ classes.divider } variant="middle" flexItem/>
	</List>;
};

export default FriendsList;