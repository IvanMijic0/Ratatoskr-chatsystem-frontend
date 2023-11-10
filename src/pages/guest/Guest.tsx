import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";

import classes from './Guest.module.css';
import FormContainer from "../../components/form_container/FormContainer.tsx";

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
