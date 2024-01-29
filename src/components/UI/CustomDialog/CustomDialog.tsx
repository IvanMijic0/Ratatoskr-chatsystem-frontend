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
		return <Dialog
			open={ open }
			onClose={ onClose }
			sx={ {
				marginBottom: "25vh"
			} }
			PaperProps={ { sx: { borderRadius: "5%", backgroundColor: "#3F5461FF" } } }>
			<DialogTitle className={ classes['Form-text'] }>{ title }</DialogTitle>
			<DialogContent className={ classes['Form-content'] }>
				{ customContent }
			</DialogContent>
			{ handleSubmit
				? <DialogActions className={ classes['Form-action'] }>
					<form method="post" onSubmit={ handleSubmit }>{ customActions }</form>
				</DialogActions>
				: <DialogActions className={ classes['Form-action'] }>{ customActions }</DialogActions>
			}
		</Dialog>;
	};

export default CustomDialog;
