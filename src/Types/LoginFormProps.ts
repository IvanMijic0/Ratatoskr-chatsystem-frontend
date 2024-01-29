import { ChangeEventHandler, FocusEventHandler } from "react";

type LoginFormProps = {
	formIsValid: boolean;
	emailChangeHandler: ChangeEventHandler<HTMLInputElement> | undefined;
	emailBlurHandler: FocusEventHandler<HTMLInputElement> | undefined,
	enteredEmail: string | number | readonly string[] | undefined,
	emailHasError: boolean
	passwordChangeHandler: ChangeEventHandler<HTMLInputElement> | undefined;
	passwordBlurHandler: FocusEventHandler<HTMLInputElement> | undefined,
	enteredPassword: string | number | readonly string[] | undefined,
	passwordHasError: boolean
	helperText: string;
	isLoading: boolean;
}

export default LoginFormProps;
