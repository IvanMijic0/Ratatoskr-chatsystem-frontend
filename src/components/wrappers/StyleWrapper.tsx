import React, { ReactComponentElement } from 'react';
import { StyledEngineProvider, ThemeProvider } from "@mui/material";

import theme from '../ui/theme/theme.ts';

interface StyleWrapperProps {
	children: ReactComponentElement<any>;
}

const StyleWrapper: React.FC<StyleWrapperProps> = ( { children } ) => (
	<StyledEngineProvider injectFirst>
		<ThemeProvider theme={ theme }>
			{ children }
		</ThemeProvider>
	</StyledEngineProvider>
);

export default StyleWrapper;
