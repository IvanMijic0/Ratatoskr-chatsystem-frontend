import { Box, Button, CircularProgress, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { FormEvent } from "react";

import { useCreateChannel, useInput, useSnackbar } from "../../../../hooks";
import { channelTextField, errorChannelTextField } from "../FormInputs";
import { AddChannelDialogProps } from "../../../../types";
import { CustomButton, CustomDialog } from "../../../UI";
import { channelNameRegex } from "../../../../regex";
import classes from "./AddChannelDialog.module.css";

const AddChannelDialog = ( { clusterId, open, onClose }: AddChannelDialogProps ) => {
	const { mutate: mutateCreateChannel, isLoading } = useCreateChannel();
	const channelNameValidation = useInput(channelNameRegex);
	const { showSnackbar } = useSnackbar();
	const { serverId } = useParams();

	let dialogFormIsValid = false;

	if ( channelNameValidation.isValid ) dialogFormIsValid = true;

	const handleSubmit = async ( event: FormEvent<HTMLFormElement> ) => {
		event.preventDefault();

		mutateCreateChannel({
			serverId: serverId ?? '',
			channelClusterId: clusterId,
			channelName: channelNameValidation.value
		}, {
			onSuccess: () => {
				showSnackbar('Channel created successfully.', 'success');
			},
			onError: ( error ) => {
				error instanceof Error && showSnackbar(error.message, 'error');
			},
			onSettled: () => {
				onClose();
				channelNameValidation.reset();
			}
		});
	};

	const channelClustersDialogContent = <Container className={ classes['Form-content'] }>
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
			disabled={ !dialogFormIsValid || isLoading }
			type="submit"
			className={ classes['action-button'] }>
			{ isLoading ? <CircularProgress/> : "Add" }
		</CustomButton>
		<Button className={ classes['action-button'] } onClick={ onClose }>Cancel</Button>
	</Box>;

	return <CustomDialog
		open={ open }
		onClose={ onClose }
		title="Enter Channel data:"
		customActions={ channelClustersDialogActions }
		customContent={ channelClustersDialogContent }
		handleSubmit={ handleSubmit }
	/>;
};

export default AddChannelDialog;
