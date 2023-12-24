import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { selectIsAuthenticated } from "../store";
import { GlobalError, Guest, HomeDashboard, ServerDashboard } from "../pages";
import { FriendContent } from "../components/MainContent/FriendContent";
import { AddFriendContent } from "../components/MainContent/AddFriendContent";
import { DirectMessage } from "../components/MainContent/DirectMessagingContent";
import { ChannelContent } from "../components/MainContent/ChannelContent";
import { VerifyEmail } from "../components/VerifyEmail";

const Routes = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

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

export default Routes;
