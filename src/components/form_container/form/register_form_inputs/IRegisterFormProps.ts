import { ChangeEventHandler, FocusEventHandler } from "react";

interface IRegisterFormProps {
	formIsValid: boolean;
	emailChangeHandler: ChangeEventHandler<HTMLInputElement> | undefined;
	emailBlurHandler: FocusEventHandler<HTMLInputElement> | undefined,
	enteredEmail: string | number | readonly string[] | undefined,
}

export default IRegisterFormProps;
