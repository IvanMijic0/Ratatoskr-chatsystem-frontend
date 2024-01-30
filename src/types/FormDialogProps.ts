import GoogleUserData from "./GoogleUserData.ts";
import { ChangeEventHandler, FocusEventHandler } from "react";

type FormDialogProps = {
	open: boolean;
	setOpen: ( value: boolean | ( ( prevVar: boolean ) => boolean ) ) => void;
	userData: GoogleUserData | null;
	formIsValid: boolean;
	passwordChangeHandler: ChangeEventHandler<HTMLInputElement> | undefined;
	passwordBlurHandler: FocusEventHandler<HTMLInputElement> | undefined,
	enteredPassword: string | number | readonly string[] | undefined,
	passwordHasError: boolean
	confirmPasswordChangeHandler: ChangeEventHandler<HTMLInputElement> | undefined;
	confirmPasswordBlurHandler: FocusEventHandler<HTMLInputElement> | undefined,
	enteredConfirmPassword: string | number | readonly string[] | undefined,
	confirmPasswordHasError: boolean
}

export default FormDialogProps;