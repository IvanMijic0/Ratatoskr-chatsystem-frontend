import React from "react";
import CustomTextField from "../../ui/CustomTextField.tsx";

export const channelClusterTextField = (
	channelClusterNameChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	channelClusterNameBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	enteredChannelClusterName: unknown,
) => (
	<CustomTextField
		label="Channel Cluster Name"
		required
		name="channel-cluster-name"
		autoComplete="name"
		margin="normal"
		autoFocus
		onChange={ channelClusterNameChangeHandler }
		onBlur={ channelClusterNameBlurHandler }
		value={ enteredChannelClusterName }
	/>
);

export const errorChannelClusterTextField = (
	channelClusterNameChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	channelClusterNameBlurHandler: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
	enteredChannelClusterName: unknown,
) => (
	<CustomTextField
		error
		label="Error: Channel Cluster Name"
		helperText="Enter a valid Channel Cluster Name!"
		name="chanel-cluster-name-error"
		autoComplete="name"
		margin="normal"
		autoFocus
		onChange={ channelClusterNameChangeHandler }
		onBlur={ channelClusterNameBlurHandler }
		value={ enteredChannelClusterName }
	/>
);