import { createContext, FC, useState } from "react";
import { AlertColor } from "@mui/material";

import { SnackbarContextProps, SnackbarProviderWrapperProps, SnackbarState } from "../types";

export const SnackbarContext = createContext<SnackbarContextProps | undefined>({
	snackbarState: {
		open: false,
		message: "",
		severity: "success",
	},
	showSnackbar: () => {
	},
	handleClose: () => {
	},
});

const SnackbarProvider: FC<SnackbarProviderWrapperProps> = ( { children } ) => {
	const [snackbarState, setSnackbarState] = useState<SnackbarState>({
		open: false,
		message: "",
		severity: "success",
	});

	const showSnackbar = ( newMessage: string, newSeverity: AlertColor = "success" ) => {
		setSnackbarState({
			open: true,
			message: newMessage,
			severity: newSeverity,
		});
	};

	const handleClose = () => {
		setSnackbarState(( prev ) => ( {
			...prev,
			open: false,
		} ));
	};

	const value: SnackbarContextProps = {
		snackbarState,
		showSnackbar,
		handleClose,
	};

	return <SnackbarContext.Provider value={ value }>{ children }</SnackbarContext.Provider>;
};

export default SnackbarProvider;