import { ChangeEventHandler, FocusEventHandler } from "react";

import { CustomTextField } from "../../../UI";

export const channelTextField = (
	channelNameChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	channelNameBlurHandler: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	enteredClusterName: unknown,
) => <CustomTextField
	label="Channel Name"
	required
	name="channel-name"
	autoComplete="name"
	margin="normal"
	autoFocus
	onChange={ channelNameChangeHandler }
	onBlur={ channelNameBlurHandler }
	value={ enteredClusterName }
/>;

export const errorChannelTextField = (
	channelNameChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	channelNameBlurHandler: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	enteredClusterName: unknown,
) => <CustomTextField
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
/>;