import { setIsAuthenticated, setTokens } from "../index.ts";
import { axiosInstance } from "../../configuration";
import { AppThunk, RootState, UserInfo } from "../../types";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "redux";
import axios from 'axios';

const validateTokenAsync = (): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			await axiosInstance.post('/auth/validateToken');
			dispatch(setIsAuthenticated(true));
		} catch (error) {
			dispatch(setIsAuthenticated(false));
		}
	};
};

const setAuthData = (
	loginData?: UserInfo | undefined,
	googleLoginData?: UserInfo | undefined
): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			const {
				data: { token, refreshToken },
			} = await axios.post(
				`http://localhost:8080/api/v1/auth/${ loginData != undefined ? 'login' : 'loginWithGoogle' }`,
				loginData != undefined ? loginData : googleLoginData
			);

			dispatch(setTokens({ token, refreshToken }));

			triggerReload();
		} catch (error: any) {
			console.error('Authentication Error:', error);
			const errorMessage = error.response?.data?.statusText || 'Authentication failed.';
			throw new Error(errorMessage);
		}
	};
};

const register = ( registerData: UserInfo ): AppThunk => {
	return async () => {
		try {
			await axiosInstance.post('/auth/register', {
				username: registerData.username,
				email: registerData.email,
				password: registerData.password
			});

			return Promise.resolve();
		} catch (error: any) {
			console.error('Registration Error:', error);
			const errorMessage = error.response?.data?.statusText || 'Registration failed.';
			return Promise.reject(errorMessage);
		}
	};
};

const triggerReload = () => {
	window.location.reload();
};

export default { validateTokenAsync, setAuthData, register };