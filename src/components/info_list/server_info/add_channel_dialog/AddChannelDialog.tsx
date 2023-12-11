import { Box, Button, CircularProgress, Container } from "@mui/material";

import classes from "./AddChannelDialog.module.css";
import useInput from "../../../../hooks/useInput.tsx";
import { channelNameRegex } from "../../../form_container/form/shared/validationRegex.ts";
import { channelTextField, errorChannelTextField } from "../form_inputs/ChannelFormInputs.tsx";
import CustomButton from "../../../ui/CustomButton.tsx";
import React, { useState } from "react";
import CustomDialog from "../../../ui/custom_dialog/CustomDialog.tsx";
import axiosInstance from "../../../../configuration/axios-instance.ts";
import { useAppSelector } from "../../../../hooks/redux-hooks.ts";
import { selectCurrentServerId } from "../../../../store/slice/server_slice/server-slice.ts";
import { selectCurrentChannelClusterId } from "../../../../store/slice/channelClusters_slice/channelClusters-slice.ts";

const AddChannelDialog = ( props: {
	open: boolean,
	onClose: () => void,
} ) => {
	const channelNameValidation = useInput(channelNameRegex);
	const currentServerId = useAppSelector(selectCurrentServerId);
	const currentChannelClusterId = useAppSelector(selectCurrentChannelClusterId);

	const [isLoading, setIsLoading] = useState(false);

	let dialogFormIsValid = false;

	if ( channelNameValidation.isValid ) {
		dialogFormIsValid = true;
	}

	const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			await axiosInstance.post('/server/channel', null, {
				params: {
					serverId: currentServerId,
					channelClusterId: currentChannelClusterId,
					channelName: channelNameValidation.value
				}
			});

			props.onClose();
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsLoading(false);
			channelNameValidation.reset();
		}
	};

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
			disabled={ !dialogFormIsValid || isLoading }
			type="submit"
			className={ classes['action-button'] }>
			{ isLoading ? <CircularProgress/> : "Add" }
		</CustomButton>
		<Button className={ classes['action-button'] } onClick={ props.onClose }>Cancel</Button>
	</Box>;

	return <CustomDialog
		open={ props.open }
		onClose={ props.onClose }
		title="Enter Channel data:"
		customActions={ channelClustersDialogActions }
		customContent={ channelClustersDialogContent }
		handleSubmit={ handleSubmit }
	/>;
};

export default AddChannelDialog;
