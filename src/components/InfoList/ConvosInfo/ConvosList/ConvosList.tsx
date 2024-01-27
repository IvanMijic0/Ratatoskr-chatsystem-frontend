import { Box, Button, Divider, List } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAppSelector, useDirectMessagings } from "../../../../hooks";
import { CustomCircularProgressBar, FriendItem } from "../../../UI";
import { selectUser } from "../../../../store";
import { ConvoSearch } from "../ConvoSearch";
import classes from "./ConvosList.module.css";

const ConvosList = () => {

	const { data: convoData, isLoading } = useDirectMessagings();
	const navigate = useNavigate();

	const { username: currentUserUsername } = useAppSelector(selectUser);

	const friendsButtonHandler = () => {
		navigate('/home/online-friends');
	};

	useEffect(() => {
		console.log(convoData);
	}, [convoData]);

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
		{ isLoading
			? <Box>
				<CustomCircularProgressBar/>
			</Box>
			: <Box>
				{
					convoData?.map(( convo, index ) => (
						<Box key={ index }>
							<Button className={ classes['direct-message'] }>
								{ <FriendItem
								/>
								}
							</Button>
						</Box>
					))
				}

			</Box>
		}
	</List>;
};

export default ConvosList;