import React, { ReactComponentElement } from 'react';
import { StyledEngineProvider } from "@mui/material";
import { ComponentPreviews, useInitial } from "../../dev";
import { DevSupport } from "@react-buddy/ide-toolbox";

interface StyleWrapperProps {
	children: ReactComponentElement<any>;
}

const StyleWrapper: React.FC<StyleWrapperProps> = ( { children } ) => (
	<StyledEngineProvider injectFirst>
		<DevSupport
			ComponentPreviews={ ComponentPreviews }
			useInitialHook={ useInitial }
		>
			{ children }
		</DevSupport>
	</StyledEngineProvider>
);

export default StyleWrapper;
