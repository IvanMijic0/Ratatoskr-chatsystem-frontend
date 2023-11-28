import { DialogContentText } from "@mui/material";
import React from "react";

import classes from "./CustomDialogContentText.module.css";

interface ICustomDialogContentText {
	children: React.ReactNode;
}

const CustomDialogContentText: React.FC<ICustomDialogContentText> = ( props ) => {
	return <DialogContentText className={ classes['form-text'] }>
		{ props.children }
	</DialogContentText>;
};

export default CustomDialogContentText;