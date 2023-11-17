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
		{/* Will keep circular progress bar, The data I am storing right know wont be visible, but who knows what I will store later... */ }
		<PersistGate loading={ <CircularProgress/> } persistor={ persistor }>
			{ children }
		</PersistGate>
	</Provider>
);

export default ReduxWrapper;
