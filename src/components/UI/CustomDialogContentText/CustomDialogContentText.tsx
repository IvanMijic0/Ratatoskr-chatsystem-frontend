import { DialogContentText } from "@mui/material";
import { FC } from "react";

import { CustomDialogContentText } from "../../../types";
import classes from "./CustomDialogContentText.module.css";

const CustomDialogContentText: FC<CustomDialogContentText> = ( props ) => {
	return <DialogContentText className={ classes['Form-text'] }>
		{ props.children }
	</DialogContentText>;
};

export default CustomDialogContentText;