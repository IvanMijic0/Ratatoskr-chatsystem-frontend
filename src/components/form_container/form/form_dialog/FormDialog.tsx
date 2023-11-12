import React, { useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import CustomButton from "../../../ui/CustomButton.tsx";
import CustomTextField from "../../../ui/CustomTextField.tsx";
import classes from "./FormDialog.module.css";
import { errorPasswordTextField, passwordTextField } from "../shared/sharedFormInputs.tsx";
import CustomTooltip from "../../../ui/CustomTooltip.tsx";
import IFormDialogProps from "./IFormDialog.ts";
import { axiosInstanceWithCredentials } from "../../../../configuration/axios-instance.ts";

const FormDialog: React.FC<IFormDialogProps> = ( props ) => {
	const [isRegistered, setIsRegistered] = useState(false);
	const [seconds, setSeconds] = useState(5);

	const confirmPasswordTextField = <CustomTextField
		margin="normal"
		required
		name="password"
		label="Confirm Password"
		type="password"
		onChange={ props.confirmPasswordChangeHandler }
		onBlur={ props.confirmPasswordBlurHandler }
		value={ props.enteredConfirmPassword }
	/>;

	const errorConfirmPasswordTextField = <CustomTextField
		error
		label="Error: Confirm Password"
		type="password"
		helperText="Does not match password."
		onChange={ props.confirmPasswordChangeHandler }
		onBlur={ props.confirmPasswordBlurHandler }
		value={ props.enteredConfirmPassword }
		margin="normal"
	/>;

	const handleDialogFormClose = () => {
		props.setOpen(false);
	};

	const registerWithGoogleHandler = async () => {
		const googleRegisterResponse = await axiosInstanceWithCredentials.post(`/auth/registerWithGoogle`, {
			email: props.userData?.email,
			firstName: props.userData?.given_name,
			lastName: props.userData?.family_name,
			googleId: props.userData?.id,
			avatarImageUrl: props.userData?.picture,
			password: props.enteredConfirmPassword
		});
		if ( googleRegisterResponse.status === 200 ) {
			setIsRegistered(true);
			setInterval(() => {
				setSeconds(( prevSeconds ) => prevSeconds - 1);
			}, 1000);
			setTimeout(() => {
				window.location.reload();
			}, 5000);
		}
	};

	return <>
		{ isRegistered
			? <Dialog open={ props.open } onClose={ handleDialogFormClose }>
				<DialogTitle className={ classes['form-text'] }>Ratatoskr Register Service</DialogTitle>
				<DialogContent className={ classes['form-container'] }>
					<DialogContentText className={ classes['form-text'] }>
						You have successfully registered to the Ratatoskr Chating System.
						Please login manually or with google account again in order to enter the application.
					</DialogContentText>
					<DialogContentText className={ classes['form-text'] }>
						Refreshing page in { seconds }
					</DialogContentText>
				</DialogContent>
			</Dialog>

			: <Dialog open={ props.open } onClose={ handleDialogFormClose }>
				<DialogTitle className={ classes['form-text'] }>Ratatoskr Register Service</DialogTitle>
				<DialogContent className={ classes['form-container'] }>
					<DialogContentText className={ classes['form-text'] }>
						We have noticed that you are not registered to this website.
						To continue logging in via Google, please enter your registration password.
					</DialogContentText>
					{ !props.passwordHasError ? passwordTextField(props) : errorPasswordTextField(props) }
					{ !props.confirmPasswordHasError ? confirmPasswordTextField : errorConfirmPasswordTextField }
				</DialogContent>
				<DialogActions className={ classes['form-action'] }>
					<CustomTooltip
						title={ !props.formIsValid ? "Please fill out password fields." : "" }
						placement="top"
					>
						<Box className={ classes.tooltip }>
							<CustomButton
								className={ classes['register-button'] }
								type="submit"
								variant="contained"
								centerRipple
								disabled={ !props.formIsValid }
								onClick={ registerWithGoogleHandler }
							>
								Register
							</CustomButton>
						</Box>
					</CustomTooltip>
				</DialogActions>
			</Dialog>
		}
	</>;
};

export default FormDialog;

