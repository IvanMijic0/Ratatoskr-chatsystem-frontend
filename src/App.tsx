import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Guest from "./pages/guest/Guest.tsx";
import Home from "./pages/home/Home.tsx";
import axiosInstance from "./configuration/axios-instance.ts";
import VerifyEmail from "./components/verify_email/VerifyEmail.tsx";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		axiosInstance.post('/validateToken')
			.then(() => setIsAuthenticated(true)).catch(() => setIsAuthenticated(false));
	}, []);

	return <BrowserRouter>
		<Routes>
			<Route
				path="/guest"
				element={ isAuthenticated ? <Navigate to="/home"/> : <Guest/> }
				index={ true }
			/>
			<Route
				path="/home"
				element={ isAuthenticated ? <Home/> : <Navigate to="/guest"/> }
			/>
			<Route
				path="/verify-email-token"
				element={ <VerifyEmail/> }
			/>
			<Route
				path=""
				element={ isAuthenticated ? <Navigate to="/home"/> : <Navigate to="/guest"/> }
			/>
		</Routes>

	</BrowserRouter>;
}

export default App;
