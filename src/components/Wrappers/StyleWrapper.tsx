import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { FC } from "react";

import { StyleWrapperProps } from "../../Types";
import { theme } from "../UI";

const StyleWrapper: FC<StyleWrapperProps> = ( { children } ) => (
	<StyledEngineProvider injectFirst>
		<ThemeProvider theme={ theme }>
			{ children }
		</ThemeProvider>
	</StyledEngineProvider>
);

export default StyleWrapper;