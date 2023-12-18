import { useEffect } from "react";
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks.ts";
import { selectIsAuthenticated } from "./store/slice/auth_slice/auth-slice.ts";

import VerifyEmail from "./components/verify_email/VerifyEmail.tsx";
import Guest from "./pages/guest/Guest.tsx";
import GlobalError from "./pages/error/GlobalError.tsx";
import { fetchUserSpecific } from "./store/action/user-action.ts";
import { validateTokenAsync } from "./store/action/auth-action.ts";
import ServerDashboard from "./pages/dashboard/ServerDashboard.tsx";
import ChannelContent from "./components/main_content/channel_content/ChannelContent.tsx";
import AddFriendContent from "./components/main_content/add_friend_content/AddFriendContent.tsx";
import FriendContent from "./components/main_content/friend_content/FriendContent.tsx";
import HomeDashboard from "./pages/dashboard/HomeDashboard.tsx";
import DirectMessage from "./components/main_content/direct_messaging_content/DirectMessage.tsx";

const App = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(validateTokenAsync());
		dispatch(fetchUserSpecific());
	}, [dispatch]);

	const routerConfig: RouteObject[] = [
		{
			path: '/guest',
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
			path: '/servers/:serverId',
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

	return <RouterProvider router={ router }/>;
};

export default App;