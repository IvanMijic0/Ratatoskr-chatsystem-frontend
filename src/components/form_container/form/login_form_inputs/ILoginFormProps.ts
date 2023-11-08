import { ChangeEventHandler, FocusEventHandler } from "react";

interface ILoginFormProps {
	formIsValid: boolean;
	usernameChangeHandler: ChangeEventHandler<HTMLInputElement> | undefined;
	usernameBlurHandler: FocusEventHandler<HTMLInputElement> | undefined,
	enteredUsername: string | number | readonly string[] | undefined,
	usernameHasError: boolean
	emailChangeHandler: ChangeEventHandler<HTMLInputElement> | undefined;
	emailBlurHandler: FocusEventHandler<HTMLInputElement> | undefined,
	enteredEmail: string | number | readonly string[] | undefined,
	emailHasError: boolean
	passwordChangeHandler: ChangeEventHandler<HTMLInputElement> | undefined;
	passwordBlurHandler: FocusEventHandler<HTMLInputElement> | undefined,
	enteredPassword: string | number | readonly string[] | undefined,
	passwordHasError: boolean
}

export default ILoginFormProps;
