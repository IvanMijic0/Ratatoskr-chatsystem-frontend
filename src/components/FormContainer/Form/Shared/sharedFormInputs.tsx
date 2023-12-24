import { ChangeEventHandler, FocusEventHandler } from "react";

import { CustomTextField } from "../../../UI";

export const usernameTextField = ( props: {
	usernameChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	usernameBlurHandler: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	enteredUsername: unknown;
} ) => <CustomTextField
	label="Username"
	required
	name="username"
	autoComplete="username"
	margin="normal"
	autoFocus
	onChange={ props.usernameChangeHandler }
	onBlur={ props.usernameBlurHandler }
	value={ props.enteredUsername }
/>;

export const errorUsernameTextField = ( props: {
	usernameChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	usernameBlurHandler: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	enteredUsername: unknown;
} ) => <CustomTextField
	error
	label="Error: Username"
	helperText="Please enter a valid username."
	autoComplete="username"
	autoFocus
	onChange={ props.usernameChangeHandler }
	onBlur={ props.usernameBlurHandler }
	value={ props.enteredUsername }
	margin="normal"
/>;

export const emailTextField = ( props: {
	emailChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	emailBlurHandler: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	enteredEmail: unknown;
} ) => <CustomTextField
	label="Email or Username"
	margin="normal"
	required
	name="email"
	autoComplete="email"
	onChange={ props.emailChangeHandler }
	onBlur={ props.emailBlurHandler }
	value={ props.enteredEmail }
/>;

export const errorEmailTextField = ( props: {
	emailChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	emailBlurHandler: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	helperText: string;
	enteredEmail: unknown;
} ) => <CustomTextField
	error
	label="Error: Email or Username"
	helperText={ props.helperText }
	autoComplete="email"
	onChange={ props.emailChangeHandler }
	onBlur={ props.emailBlurHandler }
	value={ props.enteredEmail }
	margin="normal"
/>;

export const passwordTextField = ( props: {
	passwordChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	passwordBlurHandler: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	enteredPassword: unknown;
} ) => <CustomTextField
	margin="normal"
	required
	name="password"
	label="Password"
	type="password"
	autoComplete="current-password"
	onChange={ props.passwordChangeHandler }
	onBlur={ props.passwordBlurHandler }
	value={ props.enteredPassword }
/>;

export const errorPasswordTextField = ( props: {
	passwordChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	passwordBlurHandler: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	enteredPassword: unknown;
} ) => <CustomTextField
	error
	autoComplete="current-password"
	label="Error: Password"
	type="password"
	helperText="valid: 8 characters, 1 number and 1 letter"
	onChange={ props.passwordChangeHandler }
	onBlur={ props.passwordBlurHandler }
	value={ props.enteredPassword }
	margin="normal"
/>;