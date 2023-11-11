import { axiosInstanceWithCredentials } from "../../configuration/axios-instance.ts";
import { setIsAuthenticated } from "../slice/auth-slice.ts";
import { Dispatch } from "redux";

export const validateTokenAsync = () => {
	return async ( dispatch: Dispatch ) => {
		try {
			await axiosInstanceWithCredentials.post('/auth/validateToken');

			dispatch(setIsAuthenticated(true));
		} catch (error) {
			dispatch(setIsAuthenticated(false));
		}
	};
};