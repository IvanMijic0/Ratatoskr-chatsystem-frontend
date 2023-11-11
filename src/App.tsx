import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home/Home.tsx";
import VerifyEmail from "./components/verify_email/VerifyEmail.tsx";
import homeLoader from "./pages/home/homeLoader.ts";
import Guest from "./pages/guest/Guest.tsx";
import { validateTokenAsync } from "./store/action/auth-action.ts";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks.ts";
import { selectIsAuthenticated } from "./store/slice/auth-slice.ts";

const App = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(validateTokenAsync());
	}, [dispatch, isAuthenticated]);

	const routerConfig: RouteObject[] = [
		{
			path: '/guest',
			element: isAuthenticated ? <Navigate to="/home"/> : <Guest/>,
			index: true,
		},
		{
			path: '/home',
			element: isAuthenticated ? <Home/> : <Navigate to="/guest"/>,
			loader: homeLoader
		},
		{
			path: '/verify-email-token',
			element: <VerifyEmail/>,
		},
		{
			path: '',
			element: <Navigate to="/guest"/>,
		},
	];

	const router = createBrowserRouter(routerConfig);

	return <RouterProvider router={ router }/>;
};

export default App;
