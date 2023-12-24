import { Box } from "@mui/material";
import { FC } from "react";
import { TransitionBackgroundProps } from "../../../types";

import classes from "./TransitionBackground.module.css";

const TransitionBackground: FC<TransitionBackgroundProps> = ( { children } ) => {
	return <Box className={ classes.background }>
		{ children }
	</Box>;
};

export default TransitionBackground;
