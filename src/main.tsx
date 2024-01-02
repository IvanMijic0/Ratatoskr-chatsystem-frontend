import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from './App.tsx';
import './index.css';
import { ReduxWrapper, StyleWrapper } from "./components/Wrappers";
import ReactQueryWrapper from "./components/Wrappers/ReactQueryWrapper.tsx";
import { SnackBarProvider } from "./context";

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ReactQueryWrapper>
		<SnackBarProvider>
			<ReduxWrapper>
				<StyleWrapper>
					<GoogleOAuthProvider
						clientId={ import.meta.env.VITE_REACT_APP_GOOGLE_OAUTH_PROVIDER_CLIENT_ID }>
						<App/>
					</GoogleOAuthProvider>
				</StyleWrapper>
			</ReduxWrapper>
		</SnackBarProvider>
	</ReactQueryWrapper>
);
