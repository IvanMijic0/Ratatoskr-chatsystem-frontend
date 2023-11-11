import { Box, Paper } from "@mui/material";
import { LockOpen, PersonAdd } from "@mui/icons-material";
import { useState } from "react";

import Form from "./form/Form.tsx";
import runeTitle from "../../assets/runes.svg";
import classes from "./FormContainer.module.css";
import CustomButton from "../ui/CustomButton.tsx";
import FormStatus from "./form/FormStatus.ts";

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
			<CustomButton
				className={ classes['bottom-action-button'] }
				showTooltip
				tooltipTitle="Login"
				onClick={ loginButtonHandler }
			>
				<LockOpen className={ classes['bottom-action-logo'] }/>
			</CustomButton>
			<CustomButton
				className={ classes['bottom-action-button'] }
				showTooltip
				tooltipTitle="Register"
				onClick={ registerButtonHandler }
			>
				<PersonAdd className={ classes['bottom-action-logo'] }/>
			</CustomButton>
		</Box>
	</Paper>;
};

export default FormContainer;
