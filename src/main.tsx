import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { StyledEngineProvider } from "@mui/material";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { Provider } from 'react-redux';
import store from './store';
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById('root')!).render(
	<GoogleOAuthProvider clientId={ import.meta.env.VITE_REACT_APP_GOOGLE_OAUTH_PROVIDER_CLIENT_ID }>
		<Provider store={ store }>
			<StyledEngineProvider injectFirst>
				<DevSupport
					ComponentPreviews={ ComponentPreviews }
					useInitialHook={ useInitial }
				>
					<App/>
				</DevSupport>
			</StyledEngineProvider>
		</Provider>
	</GoogleOAuthProvider>
);
