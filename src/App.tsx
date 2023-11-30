import { useEffect } from "react";
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from "react-router-dom";

import { validateTokenAsync } from "./store/action/auth-action.ts";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks.ts";
import { selectIsAuthenticated } from "./store/slice/auth-slice.ts";

import Dashboard from "./pages/dashboard/Dashboard.tsx";
import VerifyEmail from "./components/verify_email/VerifyEmail.tsx";
import Guest from "./pages/guest/Guest.tsx";
import GlobalError from "./pages/error/GlobalError.tsx";
import serverLoader from "./components/server/serverLoader.ts";
import Server from "./components/server/Server.tsx";

const App = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(validateTokenAsync());
	}, [dispatch]);

	const routerConfig: RouteObject[] = [
		{
			path: '/guest',
			element: isAuthenticated ? <Navigate to="/dashboard"/> : <Guest/>,
			index: true,
		},
		{
			path: '/dashboard',
			element: isAuthenticated ? <Dashboard/> : <Navigate to="/guest"/>,
			errorElement: <GlobalError/>,
			loader: serverLoader,
			children: [
				{
					loader: serverLoader,
					element: <Server/>,
				}
			]
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