import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import classes from './Dashboard.module.css';
import Servers from "../../components/servers/servers_/Servers.tsx";
import ChannelClusters from "../../components/channels/channel_clusters/ChannelClusters.tsx";

// TODO: make this responsive, when you get time
const Dashboard = () => {
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
				className={ classes.grid }
				item
				lg={ 1.5 }
				sm={ 1.5 }
				xs={ 1.5 }
				zeroMinWidth
				sx={ { backgroundColor: "#252A2E" } }
			>
				<ChannelClusters/>
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
				<Typography>so said</Typography>
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
				<Typography>Nietzsche</Typography>
			</Grid>
		</Grid>
	</Box>;
};

export default Dashboard;


