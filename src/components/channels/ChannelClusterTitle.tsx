import { Box, Button, CircularProgress, Container, IconButton, ListItem, ListItemText } from "@mui/material";
import classes from "./channel_clusters/ChannelsClusters.module.css";
import { channelClusterTextField, errorChannelClusterTextField } from "./form_inputs/ChannelClusterFormInputs.tsx";
import CustomButton from "../ui/CustomButton.tsx";
import React, { useState } from "react";
import useInput from "../../hooks/useInput.tsx";
import { channelClusterNameRegex } from "../form_container/form/shared/validationRegex.ts";
import CustomDialog from "../ui/custom_dialog/CustomDialog.tsx";
import AddIcon from "@mui/icons-material/Add";
import CustomTooltip from "../ui/CustomTooltip.tsx";
import axiosInstance from "../../configuration/axios-instance.ts";
import { useAppSelector } from "../../hooks/redux-hooks.ts";
import { selectCurrentServerId } from "../../store/slice/server_slice/server-slice.ts";

const ChannelClusterTitle = ( props: {
	primary: string,
	onClick: () => void,
	open: boolean,
	onClose: () => void,
} ) => {
	const channelClusterNameValidation = useInput(channelClusterNameRegex);
	const currentServerId = useAppSelector(selectCurrentServerId);

	const [isLoading, setIsLoading] = useState(false);

	let dialogFormIsValid = false;

	if ( channelClusterNameValidation.isValid ) {
		dialogFormIsValid = true;
	}

	const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			await axiosInstance.post('/server/channelCluster', null, {
				params: {
					serverId: currentServerId,
					channelClusterName: channelClusterNameValidation.value
				}
			});

			props.onClose();
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const channelClustersDialogContent = <Container className={ classes['form-content'] }>
		{ !channelClusterNameValidation.hasError
			? channelClusterTextField(
				channelClusterNameValidation.valueChangeHandler,
				channelClusterNameValidation.inputBlurHandler,
				channelClusterNameValidation.value)
			: errorChannelClusterTextField(
				channelClusterNameValidation.valueChangeHandler,
				channelClusterNameValidation.inputBlurHandler,
				channelClusterNameValidation.value
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

	return <ListItem>
		<ListItemText
			primary={ props.primary }
			primaryTypographyProps={ { marginLeft: ".5rem", fontSize: "1rem", fontWeight: "bold" } }
		/>
		<CustomTooltip title="Add Channel Cluster" placement="right-start">
			<IconButton
				className={ classes["add-channel-button"] }
				size="small"
				onClick={ props.onClick }
			>
				<AddIcon className={ classes["channel-icon"] }/>
			</IconButton>
		</CustomTooltip>
		<CustomDialog
			open={ props.open }
			onClose={ props.onClose }
			title="Enter Channel Cluster data:"
			customActions={ channelClustersDialogActions }
			customContent={ channelClustersDialogContent }
			handleSubmit={ handleSubmit }
		/>
	</ListItem>;
};

export default ChannelClusterTitle;