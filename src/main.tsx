import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from './App.tsx';
import './index.css';
import { ReduxWrapper, StyleWrapper } from "./components/Wrappers";

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ReduxWrapper>
		<StyleWrapper>
			<GoogleOAuthProvider clientId={ import.meta.env.VITE_REACT_APP_GOOGLE_OAUTH_PROVIDER_CLIENT_ID }>
				<App/>
			</GoogleOAuthProvider>
		</StyleWrapper>
	</ReduxWrapper>
);
