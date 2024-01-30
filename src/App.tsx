import { Routes } from "./routes";
import { Setup } from "./components/Setup";
import { useSnackbar } from "./hooks";

const App = () => {
	const { SnackbarComponent } = useSnackbar();

	return <>
		{ SnackbarComponent }
		<Setup/>
		<Routes/>
	</>;
};

export default App;