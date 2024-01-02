import { Alert, Snackbar } from "@mui/material";
import { createPortal } from "react-dom";
import { SnackbarContext } from "../context";
import { useContext } from "react";

const useSnackbar = () => {
	const context = useContext(SnackbarContext);

	if ( !context ) throw new Error("SnackbarContext is not provided.");

	const { snackbarState, showSnackbar, handleClose } = context;
	const { open, message, severity } = snackbarState;

	const SnackbarComponent = createPortal(
		<Snackbar open={ open } onClose={ handleClose } autoHideDuration={ 4000 }>
			<Alert onClose={ handleClose } severity={ severity } sx={ { width: '100%' } }>
				{ message }
			</Alert>
		</Snackbar>,
		document.getElementById('snackbar')!
	);

	return { open, message, severity, showSnackbar, SnackbarComponent };
};

export default useSnackbar;
