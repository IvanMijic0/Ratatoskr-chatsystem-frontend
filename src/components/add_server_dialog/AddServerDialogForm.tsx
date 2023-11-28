import { Alert, Button, Container, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import CustomDialog from "../ui/custom_dialog/CustomDialog.tsx";
import CustomTextField from "../ui/CustomTextField.tsx";
import classes from "./AddServerDialogForm.module.css";
import CustomTooltip from "../ui/CustomTooltip.tsx";

interface IAddServerDialogForm {
	open: boolean;
	onClose: () => void;
}

const AddServerDialogForm: React.FC<IAddServerDialogForm> = ( { open, onClose } ) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [alertMessage, setAlertMessage] = useState<string | null>(null);
	const [openSnack, setOpenSnack] = useState(false);


	const allowedFormats = ['image/jpeg', 'image/png', 'image/svg'];
	const maxFileSize = 5 * 1024 * 1024; // 5 MB

	const handleFileChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
		const file = event.target.files?.[0] || null;

		if ( file && allowedFormats.includes(file.type) && file.size <= maxFileSize ) {
			setSelectedFile(file);
		} else {
			setSelectedFile(null);
			setAlertMessage(
				'Invalid file format or size. Please select a valid image file.'
			);
			setOpenSnack(true);
		}
	};

	const handleClose = ( _event?: React.SyntheticEvent | Event, reason?: string ) => {
		if ( reason === 'clickaway' ) {
			return;
		}
		setOpenSnack(false);
	};

	const serverDialogContent = <Container className={ classes['form-content'] }>
		<CustomTextField
			autoFocus
			margin="dense"
			label="Server Name"
			type="text"
			id="serverName"
		/>

		<CustomTooltip title="Add Server Avatar Icon" placement="bottom">
			<Button className={ classes['upload-button'] } component="label" variant="contained"
					startIcon={ <CloudUploadIcon/> }>
				Upload Avatar
				<input
					className={ classes['upload-input'] }
					type="file"
					accept="image/*"
					onChange={ handleFileChange }
				/>
			</Button>
		</CustomTooltip>
		{ selectedFile && (
			<Typography className={ classes['avatar-selected-text'] }>
				Selected: { selectedFile.name }
			</Typography>
		) }

	</Container>;

	const serverDialogActions = <>
		<Button className={ classes['action-button'] } onClick={ onClose }>Cancel</Button>
	</>;

	return <form>
		<CustomDialog
			open={ open }
			onClose={ onClose }
			title="Enter Server data:"
			customContent={ serverDialogContent }
			customActions={ serverDialogActions }
		/>
		{ alertMessage && (
			<Snackbar open={ openSnack } autoHideDuration={ 6000 } onClose={ handleClose }>
				<Alert severity="error" onClose={ () => {
					setAlertMessage(null);
					setOpenSnack(false);
				} }>
					{ alertMessage }
				</Alert>
			</Snackbar>
		) }
	</form>;
};

export default AddServerDialogForm;