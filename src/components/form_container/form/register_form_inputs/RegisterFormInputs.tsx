import CustomButton from "../../../ui/CustomButton.tsx";
import CustomTextField from "../../../ui/CustomTextField.tsx";
import classes from "./RegisterFormInputs.module.css";
import React from "react";
import IRegisterFormProps from "./IRegisterFormProps.ts";
import {
	emailTextField,
	errorEmailTextField,
	errorPasswordTextField,
	errorUsernameTextField,
	passwordTextField,
	usernameTextField
} from "../shared/sharedFormInputs.tsx";

const RegisterFormInputs: React.FC<IRegisterFormProps> = ( props ) => {

	const confirmPasswordTextField = (
		<CustomTextField
			margin="normal"
			required
			name="password"
			label="Confirm Password"
			type="password"
			autoComplete="current-password"
			onChange={ props.confirmPasswordChangeHandler }
			onBlur={ props.confirmPasswordBlurHandler }
			value={ props.enteredConfirmPassword }
		/>
	);

	const errorConfirmPasswordTextField = (
		<CustomTextField
			error
			autoComplete="current-password"
			label="Error"
			type="password"
			helperText="8 characters, 1 number and 1 letter"
			onChange={ props.confirmPasswordChangeHandler }
			onBlur={ props.confirmPasswordBlurHandler }
			value={ props.enteredConfirmPassword }
			margin="normal"
		/>
	);

	return (
		<>
			{ !props.usernameHasError ? usernameTextField(props) : errorUsernameTextField(props) }
			{ !props.emailHasError ? emailTextField(props) : errorEmailTextField(props) }
			{ !props.passwordHasError ? passwordTextField(props) : errorPasswordTextField(props) }
			{ !props.confirmPasswordHasError ? confirmPasswordTextField : errorConfirmPasswordTextField }
			<CustomButton
				className={ classes['register-button'] }
				type="submit"
				variant="contained"
				centerRipple
				disabled={ !props.formIsValid }
			>
				Register
			</CustomButton>
		</>
	);
};

export default RegisterFormInputs;