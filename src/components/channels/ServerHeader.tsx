import { Box, Button, CircularProgress, Container, ListItem, ListItemText, MenuItem } from "@mui/material";
import React, { useState } from "react";

import { channelClusterTextField, errorChannelClusterTextField } from "./form_inputs/ChannelClusterFormInputs.tsx";
import { channelClusterNameRegex } from "../form_container/form/shared/validationRegex.ts";
import { selectCurrentServerId } from "../../store/slice/server_slice/server-slice.ts";
import { useAppSelector } from "../../hooks/redux-hooks.ts";
import CustomDialog from "../ui/custom_dialog/CustomDialog.tsx";
import axiosInstance from "../../configuration/axios-instance.ts";
import useInput from "../../hooks/useInput.tsx";
import CustomButton from "../ui/CustomButton.tsx";
import classes from "./channel_clusters/ChannelsClusters.module.css";
import CustomMenu from "../ui/CustomMenu.tsx";

const ServerHeader = ( props: {
	primary: string,
	onClick: () => void,
	open: boolean,
	onClose: () => void,
} ) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const channelClusterNameValidation =
		useInput(channelClusterNameRegex);
	const currentServerId = useAppSelector(selectCurrentServerId);

	const [isLoading, setIsLoading] = useState(false);

	let dialogFormIsValid = false;

	if ( channelClusterNameValidation.isValid ) {
		dialogFormIsValid = true;
	}

	const handleClick = ( event: React.MouseEvent<HTMLButtonElement> ) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

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
		<Button
			className={ classes["server-header-button"] }
			id="basic-button"
			aria-controls={ open ? 'basic-menu' : undefined }
			aria-haspopup="true"
			aria-expanded={ open ? 'true' : undefined }
			onClick={ handleClick }
		>
			<ListItemText
				primary={ props.primary }
				primaryTypographyProps={ { left: 0, fontSize: "1rem", fontWeight: "bold", color: "whitesmoke" } }
			/>
		</Button>
		<CustomMenu
			id="basic-menu"
			anchorEl={ anchorEl }
			open={ open }
			onClose={ handleClose }
		>
			<MenuItem
				className={ classes["menu-item"] }
				onClick={ () => {
					props.onClick();
					handleClose();
				} }
			>
				Add Cluster
			</MenuItem>
			<MenuItem className={ classes["menu-item-del"] } onClick={ handleClose }>
				Delete Server
			</MenuItem>
		</CustomMenu>

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

export default ServerHeader;