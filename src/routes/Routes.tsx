import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from "react-router-dom";

import { GlobalError, Guest, HomeDashboard, ServerDashboard } from "../pages";
import { AllFriendContent } from "../components/MainContent/AllFriendsContent";
import { AddFriendContent } from "../components/MainContent/AddFriendContent";
import { DirectMessage } from "../components/MainContent/DirectMessagingContent";
import { ChannelContent } from "../components/MainContent/ChannelContent";
import { VerifyEmail } from "../components/VerifyEmail";
import { OnlineFriendsContent } from "../components/MainContent/OnlineFriendsContent";
import { PendingFriendRequests } from "../components/MainContent/PendingFriendRequests";
import ProtectedRoute from "./ProtectedRoute";
import { useAppSelector } from "../hooks";
import { selectIsAuthenticated } from "../store";

const Routes = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated)

	const routerConfig: RouteObject[] = [
		{
			path: '/guest',
			element: isAuthenticated ? <Navigate to="/home/all-friends" /> : <Guest />,
			index: true,
		},
		{
			path: '/home',
			element: <ProtectedRoute component={HomeDashboard} />,
			errorElement: <GlobalError />,
			children: [
				{
					path: 'add-server',
					element: null
				},
				{
					path: 'online-friends',
					element: <OnlineFriendsContent />
				},
				{
					path: 'all-friends',
					element: <AllFriendContent />
				},
				{
					path: 'pending-requests',
					element: <PendingFriendRequests />
				},
				{
					path: 'add-friend',
					element: <AddFriendContent />
				},
				{
					path: 'direct-messaging/:directMessagingId/:friendId',
					element: <DirectMessage />
				}
			]
		},
		{
			path: '/servers/:serverId',
			element: <ProtectedRoute component={ServerDashboard} />,
			errorElement: <GlobalError />,
			children: [
				{
					path: ':clusterId/:channelId',
					element: <ChannelContent id="" />
				}
			]
		},
		{
			path: '/verify-email-token',
			element: <VerifyEmail />,
		},
		{
			path: '/',
			element: <Navigate to="/guest" />,
		},
		{
			path: '*',
			element: <Navigate to="/guest" />,
		}
	];

	const router = createBrowserRouter(routerConfig);

	return <RouterProvider router={router} />;
};

export default Routes;
