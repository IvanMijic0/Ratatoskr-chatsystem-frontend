import { useEffect } from "react";

import { AuthAction, NotificationAction, selectIsAuthenticated, selectUser, UserAction, } from "../../store";
import { useAppDispatch, useAppSelector, useSnackbar } from "../../hooks";
import { WSNotifications } from "../WSAbstractions";
import { UnloadConfig } from "../../configuration";

export const Setup = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const { SnackbarComponent } = useSnackbar();
	const user = useAppSelector(selectUser);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(AuthAction.validateTokenAsync());
		dispatch(UserAction.fetchUserSpecific());
		dispatch(NotificationAction.fetchNotificationData());
	}, [dispatch]);

	return <>
		{ SnackbarComponent }
		{ isAuthenticated && user && <WSNotifications/> }
		{ isAuthenticated && user && <UnloadConfig/> }
	</>;
};

export default Setup;