import { useEffect } from "react";

import { useAppDispatch, useAppSelector, useSnackbar } from "../../hooks";
import {
	fetchNotificationData,
	fetchUserSpecific,
	selectIsAuthenticated,
	selectUser,
	validateTokenAsync
} from "../../store";
import { WSNotifications } from "../WSAbstractions";

export const Setup = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const user = useAppSelector(selectUser);
	const { SnackbarComponent } = useSnackbar();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(validateTokenAsync());
		dispatch(fetchUserSpecific());
		dispatch(fetchNotificationData());
	}, [dispatch]);

	return <>
		{ SnackbarComponent }
		{ isAuthenticated && user && <WSNotifications/> }
	</>;
};

export default Setup;