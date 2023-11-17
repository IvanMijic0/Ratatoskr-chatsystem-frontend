import React, { ReactNode } from 'react';
import { CircularProgress } from "@mui/material";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../store";

interface ReduxWrapperProps {
	children: ReactNode;
}

const ReduxWrapper: React.FC<ReduxWrapperProps> = ( { children } ) => (
	<Provider store={ store }>
		<PersistGate loading={ <CircularProgress/> } persistor={ persistor }>
			{ children }
		</PersistGate>
	</Provider>
);

export default ReduxWrapper;
