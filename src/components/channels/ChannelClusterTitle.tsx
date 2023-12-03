import { Box, Button, Container, IconButton, ListItem, ListItemText } from "@mui/material";
import classes from "./channel_clusters/ChannelsClusters.module.css";
import { channelClusterTextField, errorChannelClusterTextField } from "./form_inputs/ChannelClusterFormInputs.tsx";
import CustomButton from "../ui/CustomButton.tsx";
import React from "react";
import useInput from "../../hooks/useInput.tsx";
import { channelClusterNameRegex } from "../form_container/form/shared/validationRegex.ts";
import CustomDialog from "../ui/custom_dialog/CustomDialog.tsx";
import AddIcon from "@mui/icons-material/Add";
import CustomTooltip from "../ui/CustomTooltip.tsx";

const ChannelClusterTitle = ( props: {
	primary: string,
	onClick: () => void,
	open: boolean,
	onClose: () => void,
	handleSubmit: ( event: React.FormEvent<HTMLFormElement> ) => Promise<void>
} ) => {
	const channelClusterNameValidation = useInput(channelClusterNameRegex);

	let dialogFormIsValid = false;

	if ( channelClusterNameValidation.isValid ) {
		dialogFormIsValid = true;
	}

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
			disabled={ !dialogFormIsValid }
			type="submit"
			className={ classes['action-button'] }>
			Add
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
			handleSubmit={ props.handleSubmit }
		/>
	</ListItem>;
};

export default ChannelClusterTitle;