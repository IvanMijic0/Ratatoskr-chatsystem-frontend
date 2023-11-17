import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from './App.tsx';
import './index.css';
import ReduxWrapper from "./components/wrappers/ReduxWrapper.tsx";
import StyleWrapper from "./components/wrappers/StyleWrapper.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ReduxWrapper>
		<StyleWrapper>
			<GoogleOAuthProvider clientId={ import.meta.env.VITE_REACT_APP_GOOGLE_OAUTH_PROVIDER_CLIENT_ID }>
				<App/>
			</GoogleOAuthProvider>
		</StyleWrapper>
	</ReduxWrapper>
);
