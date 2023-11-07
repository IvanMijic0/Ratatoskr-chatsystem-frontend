import { LockOpen, PersonAdd } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import CustomTextField from "../ui/CustomTextField.tsx";
import CustomButton from "../ui/CustomButton.tsx";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
	return <>
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
	</>;
};

export default LoginForm;
