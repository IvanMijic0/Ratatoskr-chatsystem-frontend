import { Box, Typography } from "@mui/material";
import React from "react";

import LoginFormInputs from "./login_form_inputs/LoginFormInputs.tsx";
import RegisterFormInputs from "./register_form_inputs/RegisterFormInputs.tsx";
import FormStatus from "./FormStatus.ts";
import classes from "./Form.module.css";
import useInput from "../../../hooks/useInput.tsx";

interface FormProps {
	isLogin: FormStatus;
}

const Form: React.FC<FormProps> = ( { isLogin } ) => {
	const usernameValidation = useInput(value => value.match(
		/^[A-Za-z0-9]{3,20}$/
	));

	const emailValidation = useInput(value => value.match(
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/));

	const passwordValidation = useInput(value => value.match(
		/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
	));

	let formIsValid: boolean = false;

	if ( emailValidation.isValid && passwordValidation.isValid ) {
		formIsValid = true;
	}

	const formSubmissionHandler = () => {
		if ( !emailValidation.isValid && !passwordValidation.isValid ) {
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
						formIsValid={ formIsValid }
						emailChangeHandler={ emailValidation.valueChangeHandler }
						emailBlurHandler={ emailValidation.inputBlurHandler }
						enteredEmail={ emailValidation.value }
						emailHasError={ emailValidation.hasError }
						passwordChangeHandler={ passwordValidation.valueChangeHandler }
						passwordBlurHandler={ passwordValidation.inputBlurHandler }
						enteredPassword={ passwordValidation.value }
						passwordHasError={ passwordValidation.hasError }
						usernameChangeHandler={ usernameValidation.valueChangeHandler }
						usernameBlurHandler={ usernameValidation.inputBlurHandler }
						enteredUsername={ usernameValidation.value }
						usernameHasError={ usernameValidation.hasError }
					/>
					: <RegisterFormInputs formIsValid={ formIsValid }/> }
		</Box>
	</>;
};

export default Form;

