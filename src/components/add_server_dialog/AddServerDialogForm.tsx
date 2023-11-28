import { Button, Container, Input } from "@mui/material";
import React from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import CustomDialog from "../ui/custom_dialog/CustomDialog.tsx";
import CustomTextField from "../ui/CustomTextField.tsx";
import classes from "./AddServerDialogForm.module.css";
import CustomTooltip from "../ui/CustomTooltip.tsx";

interface IAddServerDialogForm {
	open: boolean;
	onClose: () => void;
}

const AddServerDialogForm: React.FC<IAddServerDialogForm> = ( { open, onClose } ) => {
	const serverDialogContent = <Container className={ classes['form-content'] }>
		<CustomTextField
			autoFocus
			margin="dense"
			label="Server Name"
			type="text"
			id="serverName"
		/>

		<CustomTooltip title="Add Server Avatar Icon" placement="bottom">
			<Button className={ classes['upload-button'] } component="label" variant="contained"
					startIcon={ <CloudUploadIcon/> }>
				Upload Avatar
				<Input className={ classes['upload-input'] } type="file"/>
			</Button>
		</CustomTooltip>
	</Container>;

	const serverDialogActions = <>
		<Button className={ classes['action-button'] } onClick={ onClose }>Cancel</Button>
	</>;

	return <CustomDialog
		open={ open }
		onClose={ onClose }
		title="Enter Server data."
		customContent={ serverDialogContent }
		customActions={ serverDialogActions }
	/>;
};

export default AddServerDialogForm;