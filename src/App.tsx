import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Main from "./pages/main/Main.tsx";

function App() {
	return <BrowserRouter>
		<Routes>
			<Route path="/home" element={ <Home/> } index={ true }/>
			<Route path="" element={ <Navigate to="/home"/> }/>
			<Route path="/main" element={ <Main/> }/>
		</Routes>
	</BrowserRouter>;
}

export default App;
