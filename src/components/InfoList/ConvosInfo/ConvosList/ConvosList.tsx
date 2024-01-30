import { Box, Button, Divider, List } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

import { useAppSelector, useDirectMessagingsSummary, useFriends } from "../../../../hooks";
import { CustomCircularProgressBar, FriendItem } from "../../../UI";
import { selectUser } from "../../../../store";
import classes from "./ConvosList.module.css";

const ConvosList = () => {
	const { data: convoData, isLoading } = useDirectMessagingsSummary();
	const queryClient = useQueryClient();
	const { data: friendsData } = useFriends();

	const navigate = useNavigate();

	const { _id } = useAppSelector(selectUser);

	const filteredConvoData = convoData?.filter(convo =>
		friendsData?.some(friend => friend._id === ( convo.receiverId === _id ? convo.senderId : convo.receiverId ))
	);

	const friendsButtonHandler = () => {
		navigate('/home/online-friends');
	};

	const convoButtonHandler = async ( convoId: string, friendId: string ) => {
		navigate(`/home/direct-messaging/${ convoId }/${ friendId }`);
		await queryClient.invalidateQueries(['directMessagingsById', convoId]);
	};

	const friendItems = filteredConvoData?.map(convo => {
		const friendId = convo.receiverId === _id ? convo.senderId : convo.receiverId;
		const friend = friendsData && friendsData.find(friend => friend._id === friendId);

		if ( !friend ) {
			return null;
		}

		return <Button key={ convo._id } onClick={ () => convoButtonHandler(convo._id, friendId) }>
			<FriendItem
				currentUserId={ _id }
				friendId={ friendId }
				friendUsername={ friend.username }
				friendAvatarIconUrl={ friend.avatarImageUrl }
				status={ friend.status }
			/>
		</Button>;
	});


	return <List className={ classes["friends-list"] } aria-labelledby="nested-list-subheader" dense>
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
				{ friendItems && friendItems.length > 0
					? friendItems
					: <p>No direct-messages</p>
				}
			</Box>
		}
	</List>;
};

export default ConvosList;