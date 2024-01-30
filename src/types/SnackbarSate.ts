import { AlertColor } from "@mui/material";

type SnackbarState = {
	open: boolean;
	message: string;
	severity: AlertColor;
}

export default SnackbarState;