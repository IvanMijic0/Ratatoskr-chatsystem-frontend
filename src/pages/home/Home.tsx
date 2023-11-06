import Grid from '@mui/material/Unstable_Grid2';

import BottomNavigationBar from "../../components/bottom_navigation/BottomNavigationBar.tsx";
import ratatoskrImage from "../../assets/ratatoskr.png";
import runeTitle from "../../assets/runes.svg";
import classes from "./Home.module.css";
import { Box } from "@mui/material";

const Home = () => {
	return <Box sx={ { flexGrow: 1 } }>
		<Grid container spacing={ 72 } columns={ { xs: 4, sm: 8, md: 12 } }>
			<Grid xs>
				<img className={ classes.background } src={ ratatoskrImage } alt="Ratatoskr image"/>
			</Grid>
			<Grid xs>
				<img className={ classes.runeTitle } src={ runeTitle } alt="Rune title"/>
			</Grid>
		</Grid>;
		<BottomNavigationBar/>
	</Box>;
};

export default Home;
