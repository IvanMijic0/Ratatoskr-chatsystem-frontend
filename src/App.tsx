import { Routes } from "./routes";
import { Setup } from "./components/Setup";
import { useSnackBar } from "./hooks";

const App = () => {
	const { SnackbarComponent } = useSnackBar();

	return <>
		{ SnackbarComponent }
		<Setup/>
		<Routes/>
	</>;
};

export default App;