import { Box, Paper } from "@mui/material";
import LoginForm from "../login_form/LoginForm.tsx";
import runeTitle from "../../assets/runes.svg";
import classes from "./FormContainer.module.css";

const FormContainer = () => {
	return <Paper className={ classes['form-container'] } variant="outlined">
		<Box className={ classes['rune-title-container'] }>
			<img className={ classes['rune-title'] } src={ runeTitle } alt="Rune title"/>
		</Box>
		<LoginForm/>
	</Paper>;
};

export default FormContainer;
