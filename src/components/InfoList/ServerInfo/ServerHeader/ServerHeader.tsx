import { Box, Button, CircularProgress, Container, ListItem, ListItemText, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, MouseEvent, useState } from "react";

import { useCreateChannelCluster, useDeleteServer, useInput, useSnackbar } from "../../../../hooks";
import { channelClusterTextField, errorChannelClusterTextField } from "../FormInputs";
import { CustomButton, CustomDialog, CustomMenu } from "../../../UI";
import { channelClusterNameRegex } from "../../../../regex";
import { ServerHeaderProps } from "../../../../types";
import classes from "../ChannelClusters/ChannelsClusters.module.css";

const ServerHeader = ( { onClose, primary, open, onClick }: ServerHeaderProps ) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const { mutate: mutateCreateChannelCluster, isLoading } = useCreateChannelCluster();
	const { mutate: mutateDeleteServer } = useDeleteServer();
	const channelClusterNameValidation = useInput(channelClusterNameRegex);
	const { showSnackbar } = useSnackbar();

	const { serverId } = useParams();
	const navigate = useNavigate();

	const openMenu = Boolean(anchorEl);
	let dialogFormIsValid = false;

	if ( channelClusterNameValidation.isValid ) dialogFormIsValid = true;

	const handleClick = ( event: MouseEvent<HTMLButtonElement> ) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		channelClusterNameValidation.reset();
	};

	const handleSubmit = async ( event: FormEvent<HTMLFormElement> ) => {
		event.preventDefault();

		mutateCreateChannelCluster({
			serverId: serverId ?? '',
			channelClusterName: channelClusterNameValidation.value
		}, {
			onSuccess: () => {
				showSnackbar('Channel cluster created successfully.', 'success');
			},
			onError: ( error ) => {
				error instanceof Error && showSnackbar(error.message, 'error');
			},
			onSettled: () => {
				onClose();
			}
		});
	};

	const handleDeleteServer = async () => {
		serverId && mutateDeleteServer(serverId, {
			onSuccess: () => {
				showSnackbar('Server deleted successfully.', 'success');
				navigate('/home');
			},
			onError: ( error ) => {
				error instanceof Error && showSnackbar(error.message, 'error');
			},
			onSettled: () => {
				onClose();
				handleClose();
			}
		});
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
		<Button className={ classes['action-button'] } onClick={ onClose }>Cancel</Button>
	</Box>;

	return <ListItem>
		<Button
			className={ classes["server-header-button"] }
			id="basic-button"
			aria-controls={ openMenu ? 'basic-menu' : undefined }
			aria-haspopup="true"
			aria-expanded={ openMenu ? 'true' : undefined }
			onClick={ handleClick }
		>
			<ListItemText
				primary={ primary }
				primaryTypographyProps={ { left: 0, fontSize: "1rem", fontWeight: "bold", color: "whitesmoke" } }
			/>
		</Button>
		<CustomMenu
			id="basic-menu"
			anchorEl={ anchorEl }
			open={ openMenu }
			onClose={ handleClose }>
			<MenuItem
				className={ classes["menu-item"] }
				onClick={ () => {
					onClick();
					handleClose();
				} }>
				Add Cluster
			</MenuItem>
			<MenuItem className={ classes["menu-item-del"] } onClick={ handleDeleteServer }>
				Delete Server
			</MenuItem>
		</CustomMenu>

		<CustomDialog
			open={ open }
			onClose={ onClose }
			title="Enter Channel Cluster data:"
			customActions={ channelClustersDialogActions }
			customContent={ channelClustersDialogContent }
			handleSubmit={ handleSubmit }
		/>
	</ListItem>;
};

export default ServerHeader;