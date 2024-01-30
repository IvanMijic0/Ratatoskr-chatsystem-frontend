import { FC } from "react";

import { emailTextField, errorEmailTextField, errorPasswordTextField, passwordTextField } from "../Shared";
import { Box, CircularProgress } from "@mui/material";
import CustomTooltip from "../../../UI/CustomTooltip.tsx";
import { LoginFormProps } from "../../../../types";
import { CustomButton } from "../../../UI";
import { GoogleLoginButton } from "../GoogleButton";
import { MetaButton } from "../MetaButton";
import classes from "./LoginFormInputs.module.css";

const LoginFormInputs: FC<LoginFormProps> = ( props ) => {
	return <>
		{ !props.emailHasError ? emailTextField(props) : errorEmailTextField(props) }
		{ !props.passwordHasError ? passwordTextField(props) : errorPasswordTextField(props) }
		<CustomTooltip title={ !props.formIsValid ? "Please fill out Login Form." : "" }>
			<Box className={ classes.tooltip }>
				<CustomButton
					className={ classes['login-button'] }
					type="submit"
					variant="contained"
					centerRipple
					disabled={ !props.formIsValid || props.isLoading }
				>
					{ props.isLoading ? <CircularProgress/> : "Login" }
				</CustomButton>
			</Box>
		</CustomTooltip>
		<Box className={ classes['auth-buttons'] }>
			<GoogleLoginButton/>
			<MetaButton/>
		</Box>
	</>;
};

export default LoginFormInputs;
