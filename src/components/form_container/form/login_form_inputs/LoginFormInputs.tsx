import React from "react";
import CustomButton from "../../../ui/CustomButton.tsx";
import CustomTextField from "../../../ui/CustomTextField.tsx";
import classes from "./LoginFormInputs.module.css";
import ILoginFormProps from "./ILoginFormProps.ts";

const LoginFormInputs: React.FC<ILoginFormProps> = ( props ) => {
	const usernameTextField = (
		<CustomTextField
			label="Username"
			required
			id="username"
			name="username"
			autoComplete="username"
			margin="normal"
			autoFocus
			onChange={ props.usernameChangeHandler }
			onBlur={ props.usernameBlurHandler }
			value={ props.enteredUsername }
		/>
	);

	const errorUsernameTextField = (
		<CustomTextField
			error
			id="filled-error-helper-text"
			label="Error"
			helperText="Please enter a valid username."
			autoComplete="username"
			autoFocus
			onChange={ props.usernameChangeHandler }
			onBlur={ props.usernameBlurHandler }
			value={ props.enteredUsername }
			margin="normal"
		/>
	);

	const emailTextField = (
		<CustomTextField
			label="Email Address"
			margin="normal"
			required
			id="email"
			name="email"
			autoComplete="email"
			onChange={ props.emailChangeHandler }
			onBlur={ props.emailBlurHandler }
			value={ props.enteredEmail }
		/>
	);

	const errorEmailTextField = (
		<CustomTextField
			error
			id="filled-error-helper-text"
			label="Error"
			helperText="Please enter a valid email."
			autoComplete="email"
			onChange={ props.emailChangeHandler }
			onBlur={ props.emailBlurHandler }
			value={ props.enteredEmail }
			margin="normal"
		/>
	);

	const passwordTextField = (
		<CustomTextField
			margin="normal"
			required
			name="password"
			label="Password"
			type="password"
			id="password"
			autoComplete="current-password"
			onChange={ props.passwordChangeHandler }
			onBlur={ props.passwordBlurHandler }
			value={ props.enteredPassword }
		/>
	);

	const errorPasswordTextField = (
		<CustomTextField
			error
			autoComplete="current-password"
			id="filled-error-helper-text"
			label="Error"
			type="password"
			helperText="8 characters, 1 number and 1 letter"
			onChange={ props.passwordChangeHandler }
			onBlur={ props.passwordBlurHandler }
			value={ props.enteredPassword }
			margin="normal"
		/>
	);

	return (
		<>
			{ !props.usernameHasError ? usernameTextField : errorUsernameTextField }
			{ !props.emailHasError ? emailTextField : errorEmailTextField }
			{ !props.passwordHasError ? passwordTextField : errorPasswordTextField }
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
