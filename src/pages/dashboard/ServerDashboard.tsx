import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import Servers from "../../components/servers/servers_/Servers.tsx";
import ChannelClusters from "../../components/info_list/server_info/channel_clusters/ChannelClusters.tsx";
import UserPanel from "../../components/info_list/user_panel/UserPanel.tsx";
import classes from "./Dashboard.module.css";
import ChannelContent from "../../components/main_content/channel_content/ChannelContent.tsx";

const ServerDashboard = () => {
	// const isHomeServer = useAppSelector(selectCurrentServerId) === "0000-0000";
	// const isFriendsContent = useAppSelector(selectCurrentFriendId) === "0000-0000";
	// let content;
	const { channelId } = useParams();

	return <Box>
		<Grid container direction="row">
			<Grid
				className={ classes.grid }
				item
				lg={ .7 }
				sm={ .7 }
				xs={ .7 }
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
				<ChannelClusters/>
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
				{ channelId && <ChannelContent id={ channelId }/> }
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
				Server Details
			</Grid>
		</Grid>
	</Box>;
};

export default ServerDashboard;