import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";

import { FormContainer } from "../../components/FormContainer";
import classes from './Guest.module.css';

const Guest = () => {
	return <Box className={ classes['grid-content'] }>
		<Grid container direction="row">
			<Grid item lg={ 6 } sm={ 3 } zeroMinWidth>
			</Grid>
			<Grid className={ classes.grid } item lg={ 6 } sm={ 9 } zeroMinWidth>
				<FormContainer/>
			</Grid>
		</Grid>
	</Box>;
};

export default Guest;
