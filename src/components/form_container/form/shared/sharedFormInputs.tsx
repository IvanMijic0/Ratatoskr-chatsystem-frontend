import CustomTextField from "../../../ui/CustomTextField.tsx";
import React from "react";

export const usernameTextField = ( props: { usernameChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; usernameBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; enteredUsername: unknown; } ) => (
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

export const errorUsernameTextField = ( props: { usernameChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; usernameBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; enteredUsername: unknown; } ) => (
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

export const emailTextField = ( props: { emailChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; emailBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; enteredEmail: unknown; } ) => (
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

export const errorEmailTextField = ( props: { emailChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; emailBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; enteredEmail: unknown; } ) => (
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

export const passwordTextField = ( props: { passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; passwordBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; enteredPassword: unknown; } ) => (
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

export const errorPasswordTextField = ( props: { passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; passwordBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; enteredPassword: unknown; } ) => (
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
