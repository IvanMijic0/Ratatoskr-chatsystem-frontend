import IGoogleUserData from "../google_button/IGoogleUserData.ts";
import { ChangeEventHandler, FocusEventHandler } from "react";

interface IFormDialogProps {
	open: boolean;
	setOpen: ( value: boolean | ( ( prevVar: boolean ) => boolean ) ) => void;
	userData: IGoogleUserData | null;
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

export default IFormDialogProps;