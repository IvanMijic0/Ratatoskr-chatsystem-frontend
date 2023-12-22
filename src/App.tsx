import { useEffect } from "react";
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchUserSpecific, selectIsAuthenticated, selectUser, validateTokenAsync } from "./Store";

import { VerifyEmail } from "./components/VerifyEmail";
import { ChannelContent } from "./components/MainContent/ChannelContent";
import { AddFriendContent } from "./components/MainContent/AddFriendContent";
import { FriendContent } from "./components/MainContent/FriendContent";
import { DirectMessage } from "./components/MainContent/DirectMessagingContent";
import WSNotifications from "./components/WSAbstractions/WSNotifications.tsx";
import { GlobalError, Guest, HomeDashboard, ServerDashboard } from "./pages";

const App = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(validateTokenAsync());
		dispatch(fetchUserSpecific());

	}, [dispatch]);

	const routerConfig: RouteObject[] = [
		{
			path: '/Guest',
			element: isAuthenticated ? <Navigate to="/home"/> : <Guest/>,
			index: true,
		},
		{
			path: '/home',
			element: isAuthenticated ? <HomeDashboard/> : <Navigate to="/guest"/>,
			errorElement: <GlobalError/>,
			children: [
				{
					path: 'all-friends',
					element: <FriendContent/>
				},
				{
					path: 'add-friend',
					element: <AddFriendContent/>
				},
				{
					path: 'direct-messaging',
					element: <DirectMessage/>
				}
			]
		},
		{
			path: '/ServersList/:serverId',
			element: isAuthenticated ? <ServerDashboard/> : <Navigate to="/guest"/>,
			errorElement: <GlobalError/>,
			children: [
				{
					path: ':clusterId/:channelId',
					element: <ChannelContent id=""/>
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

	return <>
		<RouterProvider router={ router }/>
		{ isAuthenticated && user && <WSNotifications/> }
	</>;
};

export default App;