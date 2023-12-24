import { Box, Button, CircularProgress, Container, ListItem, ListItemText, MenuItem } from "@mui/material";
import React, { useState } from "react";

import { channelClusterTextField, errorChannelClusterTextField } from "../FormInputs";
import { fetchServerInfoDataAction, selectCurrentServerId } from "../../../../Store";
import { useAppDispatch, useAppSelector, useInput } from "../../../../hooks";
import axiosInstance from "../../../../Configuration/axios-instance.ts";
import { CustomButton, CustomDialog, CustomMenu } from "../../../UI";
import { channelClusterNameRegex } from "../../../../Regex";
import classes from "../ChannelClusters/ChannelsClusters.module.css";

const ServerHeader = ( props: {
	primary: string,
	onClick: () => void,
	open: boolean,
	onClose: () => void,
} ) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const dispatch = useAppDispatch();

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

	const handleDeleteServer = async () => {
		try {
			await axiosInstance.delete(`/server/${ currentServerId }`);
			console.log('Server deleted successfully');
			handleClose();
			dispatch(fetchServerInfoDataAction());
		} catch (error) {
			console.error('Error deleting server:', error);
		}
	};

	const channelClustersDialogContent = <Container className={ classes['Form-content'] }>
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
			<MenuItem className={ classes["menu-item-del"] } onClick={ handleDeleteServer }>
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