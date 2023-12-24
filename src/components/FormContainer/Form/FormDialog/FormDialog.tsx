import { FC, useState } from "react";
import axios from "axios";
import { Box, DialogContentText } from "@mui/material";

import { errorPasswordTextField, passwordTextField } from "../Shared";
import { CustomButton, CustomDialog, CustomTextField, CustomTooltip } from "../../../UI";
import { FormDialogProps } from "../../../../Types";
import classes from "./FormDialog.module.css";

const FormDialog: FC<FormDialogProps> = ( props ) => {
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
		const googleRegisterResponse = await axios.post(`http://localhost:8080/api/v1/auth/registerWithGoogle`, {
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

	const registerContent = <>
		<DialogContentText className={ classes['Form-text'] }>
			You have successfully registered to the Ratatoskr Chating System.
			Please login manually or with google account again in order to enter the application.
		</DialogContentText>
		<DialogContentText className={ classes['Form-text'] }>
			Refreshing page in { seconds }
		</DialogContentText>
	</>;

	const loginContent = <>
		<DialogContentText className={ classes['Form-text'] }>
			We have noticed that you are not registered to this website.
			To continue logging in via Google, please enter your registration password.
		</DialogContentText>
		{ !props.passwordHasError ? passwordTextField(props) : errorPasswordTextField(props) }
		{ !props.confirmPasswordHasError ? confirmPasswordTextField : errorConfirmPasswordTextField }
	</>;

	const loginActions = <CustomTooltip
		title={ !props.formIsValid ? "Please fill out password fields." : "" }
		placement="top"
	>
		<Box className={ classes.tooltip }>
			<CustomButton
				className={ classes['register-button'] }
				type="submit" variant="contained"
				centerRipple
				disabled={ !props.formIsValid }
				onClick={ registerWithGoogleHandler }>
				Register
			</CustomButton>
		</Box>
	</CustomTooltip>;

	return isRegistered
		? <CustomDialog
			open={ props.open }
			onClose={ handleDialogFormClose }
			title="Ratatoskr Register Service"
			customContent={ registerContent }
		/>
		: <CustomDialog
			open={ props.open }
			onClose={ handleDialogFormClose }
			title="Ratatoskr Register Service"
			customContent={ loginContent }
			customActions={ loginActions }
		/>;
};

export default FormDialog;