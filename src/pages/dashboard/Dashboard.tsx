import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import classes from './Dashboard.module.css';
import Servers from "../../components/servers/servers_/Servers.tsx";
import ChannelClusters from "../../components/info_list/server_info/channel_clusters/ChannelClusters.tsx";
import UserPanel from "../../components/info_list/user_panel/UserPanel.tsx";
import { useAppSelector } from "../../hooks/redux-hooks.ts";
import { selectCurrentServerId } from "../../store/slice/server_slice/server-slice.ts";
import FriendsList from "../../components/info_list/friends_info/friends_list/FriendsList.tsx";
import { selectCurrentFriendId } from "../../store/slice/friend_slice/friend-slice.ts";
import FriendContent from "../../components/main_content/friend_content/FriendContent.tsx";
import DirectChatContent from "../../components/main_content/direct_chat_content/DirectChatContent.tsx";

// TODO: make this responsive, when you get time
const Dashboard = () => {
	const isHomeServer = useAppSelector(selectCurrentServerId) === "0000-0000";
	const isFriendsContent = useAppSelector(selectCurrentFriendId) === "0000-0000";

	return <Box>
		<Grid container direction="row">
			<Grid
				className={ classes.grid }
				item
				lg={ .7 }
				sm={ .7 }
				xs={ .7 /* For now */ }
				zeroMinWidth
				sx={ { backgroundColor: "#0A1717" } }
			>
				<Servers/>
			</Grid>
			<Grid
				className={ classes["grid-info"] }
				item
				lg={ 1.5 }
				sm={ 1.5 }
				xs={ 1.5 }
				zeroMinWidth
				sx={ { backgroundColor: "#252A2E" } }
			>
				{ isHomeServer ? <FriendsList/> : <ChannelClusters/> }
				<UserPanel/>
			</Grid>
			<Grid
				className={ classes.grid }
				item
				lg={ 7.8 }
				sm={ 7.8 }
				xs={ 7.8 }
				zeroMinWidth
				sx={ { backgroundColor: "#0A1717" } }
			>
				{ isFriendsContent ? <FriendContent/> : <DirectChatContent/> }
			</Grid>
			<Grid
				className={ classes.grid }
				item
				lg={ 2 }
				sm={ 2 }
				xs={ 2 }
				zeroMinWidth
				sx={ { backgroundColor: "#252A2E" } }
			>
				Details
			</Grid>
		</Grid>
	</Box>;
};

export default Dashboard;


