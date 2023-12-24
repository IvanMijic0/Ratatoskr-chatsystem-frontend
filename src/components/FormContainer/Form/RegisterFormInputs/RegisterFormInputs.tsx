import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

import { CustomButton, CustomTextField, CustomTooltip } from "../../../UI";
import {
	emailTextField,
	errorEmailTextField,
	errorPasswordTextField,
	errorUsernameTextField,
	passwordTextField,
	usernameTextField
} from "../Shared";
import { RegisterFormProps } from "../../../../Types";
import classes from "./RegisterFormInputs.module.css";

const RegisterFormInputs: FC<RegisterFormProps> = ( props ) => {

	const confirmPasswordTextField = <CustomTextField
		margin="normal"
		required
		name="password"
		label="Confirm Password"
		type="password"
		onChange={ props.confirmPasswordChangeHandler }
		onBlur={ props.confirmPasswordBlurHandler }
		value={ props.enteredConfirmPassword }
	/>;

	const errorConfirmPasswordTextField = <CustomTextField
		error
		label="Error: Confirm Password"
		type="password"
		helperText="Does not match password."
		onChange={ props.confirmPasswordChangeHandler }
		onBlur={ props.confirmPasswordBlurHandler }
		value={ props.enteredConfirmPassword }
		margin="normal"
	/>;

	return <>
		{ !props.usernameHasError ? usernameTextField(props) : errorUsernameTextField(props) }
		{ !props.emailHasError ? emailTextField(props) : errorEmailTextField(props) }
		{ !props.passwordHasError ? passwordTextField(props) : errorPasswordTextField(props) }
		{ !props.confirmPasswordHasError ? confirmPasswordTextField : errorConfirmPasswordTextField }
		{ props.isEmailVerificationTokenSent
			? <Typography className={ classes['email-verification'] } variant="h6">Email Verification Token Sent. Please
				check your email.</Typography>
			:
			<CustomTooltip title={ !props.formIsValid ? "Please fill out register Form." : "" }>
				<Box className={ classes.tooltip }>
					<CustomButton
						className={ classes['register-button'] }
						type="submit"
						variant="contained"
						centerRipple
						disabled={ !props.formIsValid || props.isLoading }
					>
						{ props.isLoading ? <CircularProgress/> : "Register" }
					</CustomButton>
				</Box>
			</CustomTooltip>
		}
	</>;
};

export default RegisterFormInputs;
