import { Button, Divider, List, Typography } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';

import { ConvoSearch } from "../ConvoSearch";
import classes from "./ConvosList.module.css";
import { useNavigate } from "react-router-dom";

const ConvosList = () => {
	const friendData = [];
	const navigate = useNavigate();

	const friendsButtonHandler = () => {
		navigate('/home/online-friends');
	};

	return <List
		className={ classes["friends-list"] }
		aria-labelledby="nested-list-subheader"
		dense>
		<ConvoSearch/>
		<Button
			className={ classes["add-friend-button"] }
			variant="text"
			sx={ { textTransform: "none" } }
			startIcon={ <PeopleIcon className={ classes["add-friend-icon"] }/> }
			onClick={ friendsButtonHandler }>
			Friends
		</Button>
		<Divider className={ classes.divider } variant="middle" flexItem/>
		{ friendData.length === 0
			? <Typography className={ classes.description }>No direct convos yet...</Typography>
			: <Typography>friends</Typography> }
	</List>;
};

export default ConvosList;