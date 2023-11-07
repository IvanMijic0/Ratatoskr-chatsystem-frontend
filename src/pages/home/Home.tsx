import Grid from '@mui/material/Grid';
import { Box, Paper, Typography } from "@mui/material";

import runeTitle from "../../assets/runes.svg";
import classes from './Home.module.css';
import CustomTextField from "../../components/ui/CustomTextField.tsx";
import CustomButton from "../../components/ui/CustomButton.tsx";
import { LockOpen, PersonAdd } from "@mui/icons-material";

const Home = () => {
	return <Box className={ classes['grid-content'] }>
		<Grid container direction="row">
			<Grid item lg={ 6 } sm={ 3 } zeroMinWidth>
			</Grid>
			<Grid className={ classes.grid } item lg={ 6 } sm={ 9 } zeroMinWidth>
				<Paper className={ classes['form-container'] } variant="outlined">
					<Box className={ classes['rune-title-container'] }>
						<img className={ classes['rune-title'] } src={ runeTitle } alt="Rune title"/>
					</Box>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box className={ classes.form } component="form" sx={ { mt: 4 } }>
						<CustomTextField
							label="Email Address"
							required
							id="email"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<CustomTextField
							margin="normal"
							required
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<CustomButton
							type="submit"
							variant="contained"
							centerRipple
						>
							Sign In
						</CustomButton>
						<Box className={ classes['bottom-actions-container'] }>
							<CustomButton className={ classes['bottom-action-button'] }>
								<LockOpen className={ classes['bottom-action-logo'] }/>
							</CustomButton>
							<CustomButton className={ classes['bottom-action-button'] }>
								<PersonAdd className={ classes['bottom-action-logo'] }/>
							</CustomButton>
						</Box>
					</Box>
				</Paper>
			</Grid>
		</Grid>
	</Box>;
};

export default Home;
