import { DialogContentText } from "@mui/material";
import React from "react";

import classes from "./CustomDialogContentText.module.css";

const CustomDialogContentText: React.FC<CustomDialogContentText> = ( props ) => {
	return <DialogContentText className={ classes['Form-text'] }>
		{ props.children }
	</DialogContentText>;
};

export default CustomDialogContentText;