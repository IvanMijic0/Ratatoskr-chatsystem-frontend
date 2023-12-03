import { Alert, Box, Button, CircularProgress, Container, Snackbar, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useState } from "react";

import CustomDialog from "../ui/custom_dialog/CustomDialog.tsx";
import classes from "./AddServerDialogForm.module.css";
import CustomTooltip from "../ui/CustomTooltip.tsx";
import CustomButton from "../ui/CustomButton.tsx";
import axiosInstance from "../../configuration/axios-instance.ts";
import useInput from "../../hooks/useInput.tsx";
import { serverNameRegex } from "../form_container/form/shared/validationRegex.ts";
import { errorServerNameTextField, serverNameTextField } from "../servers/ServerFormInputs.tsx";

interface IAddServerDialogForm {
	open: boolean;
	onClose: () => void;
}

const AddServerDialogForm: React.FC<IAddServerDialogForm> = ( { open, onClose } ) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [alertMessage, setAlertMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [openSnack, setOpenSnack] = useState(false);

	const serverNameValidation = useInput(serverNameRegex);

	let dialogFormIsValid = false;

	if ( serverNameValidation.isValid && selectedFile ) {
		dialogFormIsValid = true;
	}
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

	const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
		event.preventDefault();
		setIsLoading(true);

		if ( !dialogFormIsValid ) {
			return;
		}

		const formData = new FormData();
		formData.append('serverName', serverNameValidation.value);
		if ( selectedFile ) {
			formData.append('avatarIcon', selectedFile);
		}

		try {
			await axiosInstance.post('/server', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			onClose();
			setIsLoading(false);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const serverDialogContent = <Container className={ classes['form-content'] }>
		{ !serverNameValidation.hasError
			? serverNameTextField(
				serverNameValidation.valueChangeHandler,
				serverNameValidation.inputBlurHandler,
				serverNameValidation.value)
			: errorServerNameTextField(
				serverNameValidation.valueChangeHandler,
				serverNameValidation.inputBlurHandler,
				serverNameValidation.value
			)
		}
		<CustomTooltip title="Add Servers Avatar Icon" placement="bottom">
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

	const serverDialogActions = <Box className={ classes['action-button-container'] }>
		<CustomButton
			disabled={ !dialogFormIsValid || isLoading }
			type="submit"
			className={ classes['action-button'] }>
			{ isLoading ? <CircularProgress/> : "Submit" }
		</CustomButton>
		<Button className={ classes['action-button'] } onClick={ onClose }>Cancel</Button>
	</Box>;

	return <>
		<CustomDialog
			open={ open }
			onClose={ onClose }
			title="Enter Servers data:"
			customContent={ serverDialogContent }
			customActions={ serverDialogActions }
			handleSubmit={ handleSubmit }
		/>
		{ alertMessage && <Snackbar open={ openSnack } autoHideDuration={ 6000 } onClose={ handleClose }>
          <Alert
            severity="error"
            onClose={ () => {
				setAlertMessage(null);
				setOpenSnack(false);
			} }
          >{ alertMessage }
          </Alert>
        </Snackbar>
		}
	</>;
};

export default AddServerDialogForm;