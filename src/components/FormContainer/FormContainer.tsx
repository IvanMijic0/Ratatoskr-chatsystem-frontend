import { Box, Paper } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";

import { Form } from "./Form";
import runeTitle from "../../assets/runes.svg";
import { FormStatus } from "../../enums";
import { CustomCircularButton } from "../UI";
import classes from "./FormContainer.module.css";

const FormContainer = () => {
	const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.LOGIN);

	const loginButtonHandler = () => {
		setFormStatus(FormStatus.LOGIN);
	};

	const registerButtonHandler = () => {
		setFormStatus(FormStatus.REGISTER);
	};

	return <Paper className={ classes['form-container'] } variant="outlined">
		<Box className={ classes['rune-title-container'] }>
			<img className={ classes['rune-title'] } src={ runeTitle } alt="Rune title"/>
		</Box>
		<Form isLogin={ formStatus }/>
		<Box className={ classes['bottom-actions-container'] }>
			<CustomCircularButton
				className={ classes['bottom-action-button'] }
				showTooltip
				tooltipTitle="Login"
				onClick={ loginButtonHandler }>
				<LoginIcon className={ classes['bottom-action-logo'] }/>
			</CustomCircularButton>
			<CustomCircularButton
				className={ classes['bottom-action-button'] }
				showTooltip
				tooltipTitle="Register"
				onClick={ registerButtonHandler }>
				<PersonAdd className={ classes['bottom-action-logo'] }/>
			</CustomCircularButton>
		</Box>
	</Paper>;
};

export default FormContainer;
