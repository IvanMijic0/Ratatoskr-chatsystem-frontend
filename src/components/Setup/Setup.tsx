import { useEffect } from "react";

import { useAppDispatch, useAppSelector, useSnackbar } from "../../hooks";
import { AuthAction, NotificationAction, selectIsAuthenticated, selectUser, UserAction, } from "../../store";
import { WSNotifications } from "../WSAbstractions";

export const Setup = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const user = useAppSelector(selectUser);
	const { SnackbarComponent } = useSnackbar();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(AuthAction.validateTokenAsync());
		dispatch(UserAction.fetchUserSpecific());
		dispatch(NotificationAction.fetchNotificationData());
	}, [dispatch]);

	return <>
		{ SnackbarComponent }
		{ isAuthenticated && user && <WSNotifications/> }
	</>;
};

export default Setup;