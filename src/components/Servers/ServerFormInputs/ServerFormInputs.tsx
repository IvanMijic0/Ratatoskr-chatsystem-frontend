import { ChangeEventHandler, FocusEventHandler } from "react";

import { CustomTextField } from "../../UI";

export const serverNameTextField = (
	serverNameChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	serverNameBlurHandler: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	enteredServerName: unknown,
) => <CustomTextField
	label="ServersList Name"
	required
	name="name"
	autoComplete="name"
	margin="normal"
	autoFocus
	onChange={ serverNameChangeHandler }
	onBlur={ serverNameBlurHandler }
	value={ enteredServerName }
/>;

export const errorServerNameTextField = (
	serverNameChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	serverNameBlurHandler: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	enteredServerName: unknown,
) => <CustomTextField
	error
	label="Error: ServersList Name"
	helperText="Enter a valid ServersList Name!"
	name="name"
	autoComplete="name"
	margin="normal"
	autoFocus
	onChange={ serverNameChangeHandler }
	onBlur={ serverNameBlurHandler }
	value={ enteredServerName }
/>;