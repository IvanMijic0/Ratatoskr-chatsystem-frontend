import { useEffect } from "react";

import { AuthAction, NotificationAction, selectIsAuthenticated, selectUser, UserAction, } from "../../store";
import { useAppDispatch, useAppSelector, useSnackbar } from "../../hooks";
import { WSNotifications } from "../WSAbstractions";
import { UnloadConfig } from "../../configuration";
import { CheckMetaMask } from "../CheckMetaMask";

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
		{ isAuthenticated && user && <UnloadConfig/> }
		{ isAuthenticated && user && <CheckMetaMask/> }
	</>;
};

export default Setup;