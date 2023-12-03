import { Box, Button, Container, IconButton } from "@mui/material";
import CustomTooltip from "../../ui/CustomTooltip.tsx";
import AddIcon from "@mui/icons-material/Add";

import classes from "./AddChannelButton.module.css";
import useInput from "../../../hooks/useInput.tsx";
import { channelNameRegex } from "../../form_container/form/shared/validationRegex.ts";
import { channelTextField, errorChannelTextField } from "../form_inputs/ChannelFormInputs.tsx";
import CustomButton from "../../ui/CustomButton.tsx";
import React from "react";
import CustomDialog from "../../ui/custom_dialog/CustomDialog.tsx";

const AddChannelButton = ( props: {
	onClick: () => void,
	open: boolean,
	onClose: () => void,
	handleSubmit: ( event: React.FormEvent<HTMLFormElement> ) => Promise<void>
} ) => {
	const channelNameValidation = useInput(channelNameRegex);

	let dialogFormIsValid = false;

	if ( channelNameValidation.isValid ) {
		dialogFormIsValid = true;
	}

	const channelClustersDialogContent = <Container className={ classes['form-content'] }>
		{ !channelNameValidation.hasError
			? channelTextField(
				channelNameValidation.valueChangeHandler,
				channelNameValidation.inputBlurHandler,
				channelNameValidation.value)
			: errorChannelTextField(
				channelNameValidation.valueChangeHandler,
				channelNameValidation.inputBlurHandler,
				channelNameValidation.value
			)
		}
	</Container>;

	const channelClustersDialogActions = <Box className={ classes['action-button-container'] }>
		<CustomButton
			disabled={ !dialogFormIsValid }
			type="submit"
			className={ classes['action-button'] }>
			Add
		</CustomButton>
		<Button className={ classes['action-button'] } onClick={ props.onClose }>Cancel</Button>
	</Box>;

	return <>
		<CustomTooltip title="Add Channel" placement="right-start">
			<IconButton className={ classes["add-channel-button"] } size="small" onClick={ props.onClick }>
				<AddIcon className={ classes["channel-icon"] }/>
			</IconButton>
		</CustomTooltip>
		<CustomDialog
			open={ props.open }
			onClose={ props.onClose }
			title="Enter Channel data:"
			customActions={ channelClustersDialogActions }
			customContent={ channelClustersDialogContent }
			handleSubmit={ props.handleSubmit }
		/>
	</>;
};

export default AddChannelButton;