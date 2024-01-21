import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from "@react-oauth/google";

import { ReactQueryWrapper, ReduxWrapper, StyleWrapper } from "./components/Wrappers";
import { SnackBarProvider } from "./context";
import App from './App.tsx';
import './index.css';

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
