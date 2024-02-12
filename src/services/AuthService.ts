import { setIsAuthenticated, setTokens } from "../store";

import { axiosInstance } from "../configuration";
import { ThunkDispatch } from "redux-thunk";
import { RootState, UserInfo } from "../types";
import { AnyAction } from "redux";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

const validateToken = async () => {
	try {
		await axiosInstance.post('/auth/validateToken');
	} catch (error) {
		console.error('Authentication Error:', error);
		throw error;
	}
};

const setAuthData = async (
	loginData: UserInfo | undefined,
	googleLoginData: UserInfo | undefined,
	dispatch: ThunkDispatch<RootState, unknown, AnyAction>
) => {
	try {
		const {
			data: { token, refreshToken },
		} = await axios.post(
			`${import.meta.env.BASE_URL}/api/v1/auth/${loginData != undefined ? 'login' : 'loginWithGoogle'}`,
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

const metaMaskLogin = async (metaMaskAddress: string, dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
	try {
		const {
			data: { token, refreshToken },
		} = await axios.post(
			`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/auth/meta-mask-login/${metaMaskAddress}`,
		);

		dispatch(setTokens({ token, refreshToken }));

		triggerReload();
	} catch (error: any) {
		console.error('Authentication Error:', error);
		const errorMessage = error.response?.data?.statusText || 'Authentication failed.';
		throw new Error(errorMessage);
	}
};

const register = async (registerData: UserInfo) => {
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

const logout = async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, navigate: NavigateFunction) => {
	try {
		await axiosInstance.post('/auth/logout');
		dispatch(setTokens({ token: '', refreshToken: '' }));
		dispatch(setIsAuthenticated(false));
		navigate("/guest")
	} catch (error) {
		console.error('Logout Error:', error);
		throw error;
	}
}

const triggerReload = () => {
	window.location.reload();
};

export default { validateToken, setAuthData, register, logout, metaMaskLogin };