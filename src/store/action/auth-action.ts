import axiosInstance from "../../configuration/axios-instance.ts";
import { setIsAuthenticated, setTokens } from "../slice/auth-slice.ts";
import { Dispatch } from "redux";
import axios from "axios";

export const validateTokenAsync = () => {
	return async ( dispatch: Dispatch ) => {
		try {
			await axiosInstance.post('/auth/validateToken');

			dispatch(setIsAuthenticated(true));
		} catch (error) {
			dispatch(setIsAuthenticated(false));
		}
	};
};

export const setAuthData = (
	loginData?: { usernameOrEmail: string | null, password: string | null },
	googleLoginData?: {
		email: string
		firstName: string,
		lastName: string,
		googleId: string,
		avatarImageUrl: string,
	}
) => {
	return async ( dispatch: Dispatch ) => {
		try {
			const {
				data: {
					token,
					refreshToken
				}
			} = await axios.post(
				`http://localhost:8080/api/v1/auth/${ loginData != undefined ? 'login' : 'loginWithGoogle' }`,
				loginData != undefined ? loginData : googleLoginData
			);

			// localStorage.setItem('jwt', token);
			// localStorage.setItem('jwtRefresh', refreshToken);

			dispatch(setTokens({ token, refreshToken }));

			triggerReload();
		} catch (error: any) {
			console.error('Authentication error:', error);
			const errorMessage = error.response?.data?.statusText || 'Authentication failed.';
			throw new Error(errorMessage);
		}
	};
};

const triggerReload = () => {
	window.location.reload();
};