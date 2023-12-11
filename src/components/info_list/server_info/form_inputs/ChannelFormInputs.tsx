import React from "react";
import CustomTextField from "../../../ui/CustomTextField.tsx";

export const channelTextField = (
	channelNameChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	channelNameBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	enteredClusterName: unknown,
) => (
	<CustomTextField
		label="Channel Name"
		required
		name="channel-name"
		autoComplete="name"
		margin="normal"
		autoFocus
		onChange={ channelNameChangeHandler }
		onBlur={ channelNameBlurHandler }
		value={ enteredClusterName }
	/>
);

export const errorChannelTextField = (
	channelNameChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	channelNameBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	enteredClusterName: unknown,
) => (
	<CustomTextField
		error
		label="Error: Channel Name"
		helperText="Enter a valid Channel Name!"
		name="chanel-name-error"
		autoComplete="name"
		margin="normal"
		autoFocus
		onChange={ channelNameChangeHandler }
		onBlur={ channelNameBlurHandler }
		value={ enteredClusterName }
	/>
);