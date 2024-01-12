import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

import { ServersList } from "../../components/Servers/ServersList";
import { UserPanel } from "../../components/InfoList/UserPanel";
import { ChannelContent } from "../../components/MainContent/ChannelContent";
import { ChannelClusters } from "../../components/InfoList/ServerInfo/ChannelClusters";
import classes from "./Dashboard.module.css";
import { DescriptionPane } from "../../components/DescriptionPane";

const ServerDashboard = () => {
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
				sx={ { backgroundColor: "#0A1717" } }>
				<ServersList/>
			</Grid>
			<Grid
				className={ classes["grid-info"] }
				item
				lg={ 1.5 }
				sm={ 1.5 }
				xs={ 1.5 }
				zeroMinWidth
				sx={ { backgroundColor: "#252A2E" } }>
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
				sx={ { backgroundColor: "#0A1717" } }>
				{ channelId && <ChannelContent id={ channelId }/> }
			</Grid>
			<Grid
				className={ classes.grid }
				item
				lg={ 2 }
				sm={ 2 }
				xs={ 2 }
				zeroMinWidth
				sx={ { backgroundColor: "#252A2E" } }>
				<DescriptionPane/>
			</Grid>
		</Grid>
	</Box>;
};

export default ServerDashboard;