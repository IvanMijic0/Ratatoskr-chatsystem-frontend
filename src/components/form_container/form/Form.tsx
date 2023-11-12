import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IFormProps from "./IFormProps.ts";

import LoginFormInputs from "./login_form_inputs/LoginFormInputs.tsx";
import RegisterFormInputs from "./register_form_inputs/RegisterFormInputs.tsx";
import FormStatus from "./FormStatus.ts";
import classes from "./Form.module.css";
import useInput from "../../../hooks/useInput.tsx";
import {
	emailValidation,
	passwordValidation,
	usernameOrEmailValidation,
	usernameValidation
} from "./shared/validationRegex.ts";
import {
	axiosInstanceWithCredentials,
	axiosInstanceWithoutCredentials
} from "../../../configuration/axios-instance.ts";
import { useAppDispatch } from "../../../hooks/redux-hooks.ts";
import { validateTokenAsync } from "../../../store/action/auth-action.ts";

const Form: React.FC<IFormProps> = ( { isLogin } ) => {
	const [isEmailVerificationSent, setIsEmailVerificationSent] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const registerUsernameValidation = useInput(usernameValidation);
	const loginEmailValidation = useInput(usernameOrEmailValidation);

	const registerEmailValidation = useInput(emailValidation);
	const loginPasswordValidation = useInput(passwordValidation);
	const registerPasswordValidation = useInput(passwordValidation);

	const registerConfirmPasswordValidation = useInput(
		value => value.match(registerPasswordValidation.value)
	);

	let loginFormIsValid: boolean = false;
	let registerFormIsValid: boolean = false;

	if ( loginEmailValidation.isValid && loginPasswordValidation.isValid ) {
		loginFormIsValid = true;
	}

	if ( registerUsernameValidation.isValid &&
		registerEmailValidation.isValid &&
		registerPasswordValidation.isValid &&
		registerConfirmPasswordValidation.isValid ) {
		registerFormIsValid = true;
	}

	const loginHandler = async () => {
		try {
			await axiosInstanceWithCredentials.post(`/auth/login`, {
				usernameOrEmail: loginEmailValidation.value,
				password: loginPasswordValidation.value
			});
			dispatch(validateTokenAsync());

			navigate("/home");
			return Promise.resolve();
		} catch (error: any) {
			console.error('Authentication error:', error);
			const errorMessage = error.response?.data?.statusText || 'Authentication failed.';
			return Promise.reject(errorMessage);

		}
	};

	const registerHandler = async () => {
		try {
			await axiosInstanceWithoutCredentials.post(`auth/register`, {
				username: registerUsernameValidation.value,
				email: registerEmailValidation.value,
				password: registerPasswordValidation.value
			});

			setIsEmailVerificationSent(true);
			return Promise.resolve();
		} catch (error: any) {
			console.error('Registration error:', error);
			const errorMessage = error.response?.data?.statusText || 'Registration failed.';
			return Promise.reject(errorMessage);

		}
	};

	const formSubmissionHandler = async ( event: {
		preventDefault: () => void;
	} ) => {
		event.preventDefault();

		const isLoginNotValid
			= !loginEmailValidation.isValid
			&& !loginPasswordValidation.isValid;

		const isRegisterNotValid
			= !registerUsernameValidation.isValid
			&& !registerEmailValidation.isValid
			&& !registerPasswordValidation.isValid
			&& !registerConfirmPasswordValidation.isValid;

		if ( isLogin === FormStatus.LOGIN ) {
			if ( isLoginNotValid ) return;
			await loginHandler();
		} else if ( isLogin === FormStatus.REGISTER ) {
			if ( isRegisterNotValid ) return;
			await registerHandler();
		}
	};

	return <>
		<Typography component="h1" variant="h5">
			{ isLogin === FormStatus.LOGIN ? "Login" : "Register" }
		</Typography>
		<Box className={ classes.form } component="form" sx={ { mt: 4 } } onSubmit={ formSubmissionHandler }>
			{ isLogin === FormStatus.LOGIN
				? <LoginFormInputs
					formIsValid={ loginFormIsValid }
					emailChangeHandler={ loginEmailValidation.valueChangeHandler }
					emailBlurHandler={ loginEmailValidation.inputBlurHandler }
					enteredEmail={ loginEmailValidation.value }
					emailHasError={ loginEmailValidation.hasError }
					passwordChangeHandler={ loginPasswordValidation.valueChangeHandler }
					passwordBlurHandler={ loginPasswordValidation.inputBlurHandler }
					enteredPassword={ loginPasswordValidation.value }
					passwordHasError={ loginPasswordValidation.hasError }
					helperText="Please enter valid username or email."
				/>
				: <RegisterFormInputs
					isEmailVerificationTokenSent={ isEmailVerificationSent }
					formIsValid={ registerFormIsValid }
					usernameChangeHandler={ registerUsernameValidation.valueChangeHandler }
					usernameBlurHandler={ registerUsernameValidation.inputBlurHandler }
					enteredUsername={ registerUsernameValidation.value }
					usernameHasError={ registerUsernameValidation.hasError }
					emailChangeHandler={ registerEmailValidation.valueChangeHandler }
					emailBlurHandler={ registerEmailValidation.inputBlurHandler }
					enteredEmail={ registerEmailValidation.value }
					emailHasError={ registerEmailValidation.hasError }
					passwordChangeHandler={ registerPasswordValidation.valueChangeHandler }
					passwordBlurHandler={ registerPasswordValidation.inputBlurHandler }
					enteredPassword={ registerPasswordValidation.value }
					passwordHasError={ registerPasswordValidation.hasError }
					confirmPasswordChangeHandler={ registerConfirmPasswordValidation.valueChangeHandler }
					confirmPasswordBlurHandler={ registerConfirmPasswordValidation.inputBlurHandler }
					enteredConfirmPassword={ registerConfirmPasswordValidation.value }
					confirmPasswordHasError={ registerConfirmPasswordValidation.hasError }
					helperText="Please enter valid email."
				/>
			}
		</Box>
	</>;
};

export default Form;

