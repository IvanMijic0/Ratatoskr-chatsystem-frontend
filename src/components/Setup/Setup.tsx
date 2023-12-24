import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUserSpecific, selectIsAuthenticated, selectUser, validateTokenAsync } from "../../store";
import { useEffect } from "react";
import WSNotifications from "../WSAbstractions/WSNotifications.tsx";

export const Setup = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(validateTokenAsync());
		dispatch(fetchUserSpecific());

	}, [dispatch]);

	return isAuthenticated && user && <WSNotifications/>;
};

export default Setup;