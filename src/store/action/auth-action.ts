import { clearToken } from '../slice/auth-slice.ts';
import { Dispatch } from "redux";
import Credentials from "./ICredentials.ts";
import { AxiosInstance } from 'axios';
import store from '../index.ts';
import axiosInstance from "../../configuration/axios-instance.ts";


export const login = async ( credentials: Credentials ) => {
	try {
		await axiosInstance.post(`/login`, credentials);

		return Promise.resolve();
	} catch (error: any) {
		console.error('Authentication error:', error);
		const errorMessage = error.response?.data?.statusText || 'Authentication failed.';
		return Promise.reject(errorMessage);
	}
};

export const verifyUser = async ( dispatch: Dispatch, axiosInstance: AxiosInstance ) => {
	const token = store.getState().auth.token;
	if ( token ) {
		try {
			const response = await axiosInstance.post(`/verifyUser`);
			if ( !response ) {
				console.error('Token verification failed. Logging out.');
				logout(dispatch);
			}
			return true;
		} catch (error) {
			console.error('Verification failed:', error);
			logout(dispatch);
		}
	}
};

export const logout = ( dispatch: Dispatch ) => {
	// TODO -> end a request to your backend to invalidate the token
	dispatch(clearToken());
};
