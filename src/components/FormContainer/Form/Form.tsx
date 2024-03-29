import { Box, Typography } from "@mui/material";
import { FC, useState } from "react";

import { emailRegex, passwordRegex, usernameOrEmailRegex, usernameRegex } from "../../../regex";
import { RegisterFormInputs } from "./RegisterFormInputs";
import { LoginFormInputs } from "./LoginFormInputs";
import { useAppDispatch, useInput } from "../../../hooks";
import { FormProps } from "../../../types";
import { FormStatus } from "../../../enums";
import classes from "./Form.module.css";
import { AuthAction } from "../../../store";

const Form: FC<FormProps> = ({ isLogin }) => {
	const [isEmailVerificationSent, setIsEmailVerificationSent] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useAppDispatch();

	const registerUsernameValidation = useInput(usernameRegex);
	const loginEmailValidation = useInput(usernameOrEmailRegex);

	const registerEmailValidation = useInput(emailRegex);
	const loginPasswordValidation = useInput(passwordRegex);
	const registerPasswordValidation = useInput(passwordRegex);

	const registerConfirmPasswordValidation = useInput(
		value => value.match(registerPasswordValidation.value)
	);

	let loginFormIsValid: boolean = false;
	let registerFormIsValid: boolean = false;

	if (loginEmailValidation.isValid && loginPasswordValidation.isValid) loginFormIsValid = true;

	if (registerUsernameValidation.isValid &&
		registerEmailValidation.isValid &&
		registerPasswordValidation.isValid &&
		registerConfirmPasswordValidation.isValid) registerFormIsValid = true;

	const loginHandler = async () => {
		try {
			dispatch(AuthAction.setAuthData({
				usernameOrEmail: loginEmailValidation?.value,
				password: loginPasswordValidation?.value
			}, undefined))

			return Promise.resolve();
		} catch (error: any) {
			console.error('Authentication Error:', error);
			const errorMessage = error.response?.data?.statusText || 'Authentication failed.';
			return Promise.reject(errorMessage);
		}
	};

	const registerHandler = async () => {
		try {
			dispatch(AuthAction.register({
				username: registerUsernameValidation.value,
				email: registerEmailValidation.value,
				password: registerPasswordValidation.value
			}));

			setIsEmailVerificationSent(true);
			return Promise.resolve();
		} catch (error: any) {
			console.error('Registration Error:', error);
			const errorMessage = error.response?.data?.statusText || 'Registration failed.';
			return Promise.reject(errorMessage);
		}
	};

	const formSubmissionHandler = async (event: {
		preventDefault: () => void;
	}) => {
		event.preventDefault();
		setIsLoading(true);

		const isLoginNotValid
			= !loginEmailValidation.isValid
			&& !loginPasswordValidation.isValid;

		const isRegisterNotValid
			= !registerUsernameValidation.isValid
			&& !registerEmailValidation.isValid
			&& !registerPasswordValidation.isValid
			&& !registerConfirmPasswordValidation.isValid;

		if (isLogin === FormStatus.LOGIN) {
			if (isLoginNotValid) return;
			await loginHandler();
		} else if (isLogin === FormStatus.REGISTER) {
			if (isRegisterNotValid) return;
			await registerHandler();
		}
		setIsLoading(false);
	};

	return <>
		<Typography component="h1" variant="h5">
			{isLogin === FormStatus.LOGIN ? "Login" : "Register"}
		</Typography>
		<Box className={classes.form} component="form" sx={{ mt: 4 }} onSubmit={formSubmissionHandler}>
			{isLogin === FormStatus.LOGIN
				? <LoginFormInputs
					formIsValid={loginFormIsValid}
					emailChangeHandler={loginEmailValidation.valueChangeHandler}
					emailBlurHandler={loginEmailValidation.inputBlurHandler}
					enteredEmail={loginEmailValidation.value}
					emailHasError={loginEmailValidation.hasError}
					passwordChangeHandler={loginPasswordValidation.valueChangeHandler}
					passwordBlurHandler={loginPasswordValidation.inputBlurHandler}
					enteredPassword={loginPasswordValidation.value}
					passwordHasError={loginPasswordValidation.hasError}
					helperText="Please enter valid username or email."
					isLoading={isLoading}
				/>
				: <RegisterFormInputs
					isEmailVerificationTokenSent={isEmailVerificationSent}
					formIsValid={registerFormIsValid}
					usernameChangeHandler={registerUsernameValidation.valueChangeHandler}
					usernameBlurHandler={registerUsernameValidation.inputBlurHandler}
					enteredUsername={registerUsernameValidation.value}
					usernameHasError={registerUsernameValidation.hasError}
					emailChangeHandler={registerEmailValidation.valueChangeHandler}
					emailBlurHandler={registerEmailValidation.inputBlurHandler}
					enteredEmail={registerEmailValidation.value}
					emailHasError={registerEmailValidation.hasError}
					passwordChangeHandler={registerPasswordValidation.valueChangeHandler}
					passwordBlurHandler={registerPasswordValidation.inputBlurHandler}
					enteredPassword={registerPasswordValidation.value}
					passwordHasError={registerPasswordValidation.hasError}
					confirmPasswordChangeHandler={registerConfirmPasswordValidation.valueChangeHandler}
					confirmPasswordBlurHandler={registerConfirmPasswordValidation.inputBlurHandler}
					enteredConfirmPassword={registerConfirmPasswordValidation.value}
					confirmPasswordHasError={registerConfirmPasswordValidation.hasError}
					helperText="Please enter valid email."
					isLoading={isLoading}
				/>
			}
		</Box>
	</>;
};

export default Form;

