import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import classes from "./CustomDialog.module.css";

interface ICustomDialogProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	customContent?: React.ReactNode;
	customActions?: React.ReactNode;
	handleSubmit?: ( event: React.FormEvent<HTMLFormElement> ) => Promise<void>;
}

const CustomDialog: React.FC<ICustomDialogProps> =
	( { open, onClose, title, customContent, customActions, handleSubmit } ) => {
		return <Dialog open={ open } onClose={ onClose } sx={ { marginBottom: "25vh" } }>
			<DialogTitle className={ classes['form-text'] }>{ title }</DialogTitle>
			<DialogContent className={ classes['form-content'] }>
				{ customContent }
			</DialogContent>
			{ handleSubmit
				? <DialogActions className={ classes['form-action'] }>
					<form onSubmit={ handleSubmit }>{ customActions }</form>
				</DialogActions>
				: <DialogActions className={ classes['form-action'] }>{ customActions }</DialogActions>
			}
		</Dialog>;
	};

export default CustomDialog;
