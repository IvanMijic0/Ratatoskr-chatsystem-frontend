import { Box, Button, CircularProgress, Container } from "@mui/material";
import { FormEvent, useState } from "react";

import { selectCurrentChannelClusterId, selectCurrentServerId } from "../../../../store";
import { channelTextField, errorChannelTextField } from "../FormInputs";
import { axiosInstance } from "../../../../configuration";
import { useAppSelector, useInput } from "../../../../hooks";
import { CustomButton, CustomDialog } from "../../../UI";
import { channelNameRegex } from "../../../../regex";
import classes from "./AddChannelDialog.module.css";

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

	const handleSubmit = async ( event: FormEvent<HTMLFormElement> ) => {
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
