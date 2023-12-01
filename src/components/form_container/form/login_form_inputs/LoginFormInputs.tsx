import React from "react";
import CustomButton from "../../../ui/CustomButton.tsx";
import classes from "./LoginFormInputs.module.css";
import ILoginFormProps from "./ILoginFormProps.ts";
import {
	emailTextField,
	errorEmailTextField,
	errorPasswordTextField,
	passwordTextField
} from "../shared/sharedFormInputs.tsx";
import { Box, CircularProgress } from "@mui/material";
import CustomTooltip from "../../../ui/CustomTooltip.tsx";
import GoogleLoginButton from "../google_button/GoogleLoginButton.tsx";

const LoginFormInputs: React.FC<ILoginFormProps> = ( props ) => {
	return <>
		{ !props.emailHasError ? emailTextField(props) : errorEmailTextField(props) }
		{ !props.passwordHasError ? passwordTextField(props) : errorPasswordTextField(props) }
		<CustomTooltip title={ !props.formIsValid ? "Please fill out Login form." : "" }>
			<Box className={ classes.tooltip }>
				<CustomButton
					className={ classes['login-button'] }
					type="submit"
					variant="contained"
					centerRipple
					disabled={ !props.formIsValid || props.isLoading }
				>
					{ props.isLoading ? <CircularProgress/> : "Login" }
				</CustomButton>
			</Box>
		</CustomTooltip>
		<Box className={ classes['google-button'] }>
			<GoogleLoginButton/>
		</Box>
	</>;
};

export default LoginFormInputs;
