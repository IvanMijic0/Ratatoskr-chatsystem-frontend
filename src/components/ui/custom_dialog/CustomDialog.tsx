import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import classes from "./CustomDialog.module.css";

interface ICustomDialogProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	customContent?: React.ReactNode;
	customActions?: React.ReactNode;
}

const CustomDialog: React.FC<ICustomDialogProps> = ( { open, onClose, title, customContent, customActions } ) => {
	return <Dialog open={ open } onClose={ onClose } sx={ { marginBottom: "25vh" } }>
		<DialogTitle className={ classes['form-text'] }>{ title }</DialogTitle>
		<DialogContent className={ classes['form-content'] }>
			{ customContent }
		</DialogContent>
		<DialogActions className={ classes['form-action'] }>
			{ customActions }
		</DialogActions>
	</Dialog>;
};

export default CustomDialog;
