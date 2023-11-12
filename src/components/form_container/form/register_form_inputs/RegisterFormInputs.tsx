import { Box, Typography } from "@mui/material";
import CustomTooltip from "../../../ui/CustomTooltip.tsx";
import React from "react";

import CustomButton from "../../../ui/CustomButton.tsx";
import CustomTextField from "../../../ui/CustomTextField.tsx";
import IRegisterFormProps from "./IRegisterFormProps.ts";
import {
	emailTextField,
	errorEmailTextField,
	errorPasswordTextField,
	errorUsernameTextField,
	passwordTextField,
	usernameTextField
} from "../shared/sharedFormInputs.tsx";
import classes from "./RegisterFormInputs.module.css";

const RegisterFormInputs: React.FC<IRegisterFormProps> = ( props ) => {

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
			<CustomTooltip title={ !props.formIsValid ? "Please fill out register form." : "" }>
				<Box className={ classes.tooltip }>
					<CustomButton
						className={ classes['register-button'] }
						type="submit"
						variant="contained"
						centerRipple
						disabled={ !props.formIsValid }
					>
						Register
					</CustomButton>
				</Box>
			</CustomTooltip>
		}
	</>;
};

export default RegisterFormInputs;
