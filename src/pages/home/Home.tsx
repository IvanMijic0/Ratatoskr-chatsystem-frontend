import Grid from '@mui/material/Unstable_Grid2';

import BottomNavigationBar from "../../components/bottom_navigation/BottomNavigationBar.tsx";
import ratatoskrImage from "../../assets/ratatoskr.png";
import classes from "./Home.module.css";

const Home = () => {
	return <Grid container spacing={ 12 }>
		<img className={ classes.background } src={ ratatoskrImage } alt="Ratatoskr image"/>
		<BottomNavigationBar/>
	</Grid>;
};

export default Home;
