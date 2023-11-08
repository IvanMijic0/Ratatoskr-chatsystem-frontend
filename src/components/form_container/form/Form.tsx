import { Box, Typography } from "@mui/material";
import React from "react";

import LoginFormInputs from "./login_form_inputs/LoginFormInputs.tsx";
import RegisterFormInputs from "./register_form_inputs/RegisterFormInputs.tsx";
import FormStatus from "./FormStatus.ts";
import classes from "./Form.module.css";
import useInput from "../../../hooks/useInput.tsx";
import { emailValidation, passwordValidation, usernameValidation } from "./shared/validationRegex.ts";

interface FormProps {
	isLogin: FormStatus;
}

const Form: React.FC<FormProps> = ( { isLogin } ) => {
	const loginUsernameValidation = useInput(usernameValidation);
	const registerUsernameValidation = useInput(usernameValidation);

	const loginEmailValidation = useInput(emailValidation);
	const registerEmailValidation = useInput(emailValidation);

	const loginPasswordValidation = useInput(passwordValidation);
	const registerPasswordValidation = useInput(passwordValidation);

	const registerConfirmPasswordValidation = useInput(
		value => value.match(registerPasswordValidation.value)
	);

	let loginFormIsValid: boolean = false;
	let registerFormIsValid: boolean = false;

	if ( loginUsernameValidation.isValid && loginEmailValidation.isValid && loginPasswordValidation.isValid ) {
		loginFormIsValid = true;
	}

	if ( registerUsernameValidation.isValid && registerEmailValidation.isValid && registerPasswordValidation.isValid ) {
		registerFormIsValid = true;
	}

	const formSubmissionHandler = () => {
		if ( ( !loginUsernameValidation.isValid && !loginEmailValidation.isValid && !loginPasswordValidation.isValid ) ||
			( !registerUsernameValidation.isValid && !registerEmailValidation.isValid && !registerPasswordValidation.isValid ) ) {
			return;
		}
	};

	return <>
		<Typography component="h1" variant="h5">
			{ isLogin === FormStatus.LOGIN ? "Login" : "Register" }
		</Typography>
		<Box className={ classes.form } component="form" sx={ { mt: 4 } } onSubmit={ formSubmissionHandler }>
			{
				isLogin === FormStatus.LOGIN
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
						usernameChangeHandler={ loginUsernameValidation.valueChangeHandler }
						usernameBlurHandler={ loginUsernameValidation.inputBlurHandler }
						enteredUsername={ loginUsernameValidation.value }
						usernameHasError={ loginUsernameValidation.hasError }
					/>
					: <RegisterFormInputs
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
					/>
			}
		</Box>
	</>;
};

export default Form;

