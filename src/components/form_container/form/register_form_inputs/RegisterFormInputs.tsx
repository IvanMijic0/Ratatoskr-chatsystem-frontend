import CustomButton from "../../../ui/CustomButton.tsx";
import CustomTextField from "../../../ui/CustomTextField.tsx";
import classes from "./RegisterFormInputs.module.css";
import React from "react";

interface RegisterFormProps {
	formIsValid: boolean;
}

const RegisterFormInputs: React.FC<RegisterFormProps> = ( { formIsValid } ) => {
	return <>
		<CustomTextField
			label="Username"
			required
			id="username"
			name="username"
			autoComplete="username"
			margin="normal"
			autoFocus
		/>
		<CustomTextField
			label="Email Address"
			required
			id="email"
			name="email"
			autoComplete="email"
			margin="normal"
		/>
		<CustomTextField
			margin="normal"
			required
			name="password"
			label="Password"
			type="password"
			id="password"
			autoComplete="new-password"
		/>
		<CustomTextField
			required
			name="confirmPassword"
			label="Confirm Password"
			type="password"
			id="confirmPassword"
			autoComplete="new-password"
			margin="normal"
		/>
		<CustomButton
			className={ classes['register-button'] }
			type="submit"
			variant="contained"
			centerRipple
			disabled={ !formIsValid }
		>
			Register
		</CustomButton>
	</>;
};

export default RegisterFormInputs;