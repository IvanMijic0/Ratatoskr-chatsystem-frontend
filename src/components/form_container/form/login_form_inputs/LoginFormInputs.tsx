import React from "react";
import CustomButton from "../../../ui/CustomButton.tsx";
import classes from "./LoginFormInputs.module.css";
import ILoginFormProps from "./ILoginFormProps.ts";
import {
	emailTextField,
	errorEmailTextField,
	errorPasswordTextField,
	errorUsernameTextField,
	passwordTextField,
	usernameTextField
} from "../shared/sharedFormInputs.tsx";
import { Box } from "@mui/material";
import CustomTooltip from "../../../ui/CustomTooltip.tsx";

const LoginFormInputs: React.FC<ILoginFormProps> = ( props ) => {
	return (
		<>
			{ !props.usernameHasError ? usernameTextField(props) : errorUsernameTextField(props) }
			{ !props.emailHasError ? emailTextField(props) : errorEmailTextField(props) }
			{ !props.passwordHasError ? passwordTextField(props) : errorPasswordTextField(props) }
			<CustomTooltip title="Fill out Login form.">
				<Box className={ classes.tooltip }>
					<CustomButton
						className={ classes['login-button'] }
						type="submit"
						variant="contained"
						centerRipple
						disabled={ !props.formIsValid }
					>
						Login
					</CustomButton>
				</Box>
			</CustomTooltip>
		</>
	);
};

export default LoginFormInputs;
