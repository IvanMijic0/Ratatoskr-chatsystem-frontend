import React from "react";
import CustomTextField from "../ui/CustomTextField.tsx";

export const serverNameTextField = (
	serverNameChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	serverNameBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	enteredServerName: unknown,
) => (
	<CustomTextField
		label="Server Name"
		required
		name="name"
		autoComplete="name"
		margin="normal"
		autoFocus
		onChange={ serverNameChangeHandler }
		onBlur={ serverNameBlurHandler }
		value={ enteredServerName }
	/>
);

export const errorServerNameTextField = (
	serverNameChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	serverNameBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	enteredServerName: unknown,
) => (
	<CustomTextField
		error
		label="Error: Server Name"
		helperText="Enter a valid Server Name!"
		name="name"
		autoComplete="name"
		margin="normal"
		autoFocus
		onChange={ serverNameChangeHandler }
		onBlur={ serverNameBlurHandler }
		value={ enteredServerName }
	/>
);