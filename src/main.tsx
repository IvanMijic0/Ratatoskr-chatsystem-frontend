import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { StyledEngineProvider } from "@mui/material";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";


ReactDOM.createRoot(document.getElementById('root')!).render(
	<StyledEngineProvider injectFirst>
		<DevSupport ComponentPreviews={ ComponentPreviews }
					useInitialHook={ useInitial }
		>
			<App/>
		</DevSupport>
	</StyledEngineProvider>
);
