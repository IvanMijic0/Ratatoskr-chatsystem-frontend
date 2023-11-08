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

const LoginFormInputs: React.FC<ILoginFormProps> = ( props ) => {
	return (
		<>
			{ !props.usernameHasError ? usernameTextField(props) : errorUsernameTextField(props) }
			{ !props.emailHasError ? emailTextField(props) : errorEmailTextField(props) }
			{ !props.passwordHasError ? passwordTextField(props) : errorPasswordTextField(props) }
			<CustomButton
				className={ classes['login-button'] }
				type="submit"
				variant="contained"
				centerRipple
				disabled={ !props.formIsValid }
			>
				Login
			</CustomButton>
		</>
	);
};

export default LoginFormInputs;
