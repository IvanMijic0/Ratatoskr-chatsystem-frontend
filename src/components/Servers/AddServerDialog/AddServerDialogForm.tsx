import { Alert, Box, Button, Container, Snackbar, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ChangeEvent, FC, FormEvent, SyntheticEvent, useState } from "react";

import { CustomButton, CustomCircularProgressBar, CustomDialog, CustomTooltip } from "../../UI";
import axiosInstance from "../../../Configuration/axios-instance.ts";
import { errorServerNameTextField, serverNameTextField } from "../ServerFormInputs";
import { AddServerDialogFormProps } from "../../../Types";
import { serverNameRegex } from "../../../Regex";
import { useInput } from "../../../hooks";
import classes from "./AddServerDialogForm.module.css";

const AddServerDialogForm: FC<AddServerDialogFormProps> = ( { open, onClose } ) => {
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


	const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
		const file = event.target.files?.[0] || null;

		if ( file && allowedFormats.includes(file.type) && file.size <= maxFileSize ) {
			if ( file.name.includes(' ') ) {
				setAlertMessage('Invalid file name. Please make sure the file name does not contain spaces.');
				setOpenSnack(true);
				setSelectedFile(null);
			} else {
				setSelectedFile(file);
			}
		} else {
			setSelectedFile(null);
			setAlertMessage(
				'Invalid file format or size. Please select a valid image file.'
			);
			setOpenSnack(true);
		}
	};


	const handleClose = ( _event?: SyntheticEvent | Event, reason?: string ) => {
		if ( reason === 'clickable' ) {
			return;
		}
		setOpenSnack(false);
	};

	const handleSubmit = async ( event: FormEvent<HTMLFormElement> ) => {
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
		} catch (error) {
			console.error('Error:', error);
		} finally {
			serverNameValidation.reset();
			setSelectedFile(null);
			setIsLoading(false);
		}
	};

	const serverDialogContent = <Container className={ classes['Form-content'] }>
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
		<CustomTooltip title="Add ServersList Avatar Icon" placement="bottom">
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
			{ isLoading ? <CustomCircularProgressBar/> : "Submit" }
		</CustomButton>
		<Button className={ classes['action-button'] } onClick={ onClose }>Cancel</Button>
	</Box>;

	return <>
		<CustomDialog
			open={ open }
			onClose={ onClose }
			title="Enter ServersList data:"
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