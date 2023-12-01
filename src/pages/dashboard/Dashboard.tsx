import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import classes from './Dashboard.module.css';
import Server from "../../components/server/Server.tsx";

// TODO: make this responsive, when you get time
const Dashboard = () => {
	// const { username, email, role }: IDashboardLoaderData = useLoaderData() as IDashboardLoaderData;
	// const navigation = useNavigation();

	return <Box>
		<Grid container direction="row">
			<Grid
				className={ classes.grid }
				item
				lg={ .8 }
				sm={ .8 }
				xs={ .8 /* For now */ }
				zeroMinWidth
				sx={ { backgroundColor: "#0A1717" } }
			>
				<Server/>
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
				<Typography>And we killed him</Typography>
			</Grid>
			<Grid
				className={ classes.grid }
				item
				lg={ 7.7 }
				sm={ 7.7 }
				xs={ 7.7 }
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


