import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from "@mui/material";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import App from './App.tsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
	<GoogleOAuthProvider clientId={ import.meta.env.VITE_REACT_APP_GOOGLE_OAUTH_PROVIDER_CLIENT_ID }>
		<Provider store={ store }>
			<PersistGate loading={ null } persistor={ persistor }>
				<StyledEngineProvider injectFirst>
					<DevSupport
						ComponentPreviews={ ComponentPreviews }
						useInitialHook={ useInitial }
					>
						<App/>
					</DevSupport>
				</StyledEngineProvider>
			</PersistGate>
		</Provider>
	</GoogleOAuthProvider>
);
