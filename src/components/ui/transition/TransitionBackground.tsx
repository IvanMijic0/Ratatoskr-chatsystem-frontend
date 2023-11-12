import { Box } from "@mui/material";
import classes from "./TransitionBackground.module.css";
import React from "react";

interface TransitionBackgroundProps {
	children: React.ReactNode;
}

const TransitionBackground: React.FC<TransitionBackgroundProps> = ( { children } ) => {
	return <Box className={ classes.background }>
		{ children }
	</Box>;
};

export default TransitionBackground;
